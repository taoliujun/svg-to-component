import path from 'path';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import chalk from 'chalk';
import CssMiniPlugin from 'css-minimizer-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import type { Configuration, WebpackOptionsNormalized } from 'webpack';
import type webpack from 'webpack';
import NoopWebpackPlugin from 'webpack-plugin-noop-ts';
import { getCssLoaders } from './utils/cssLoader';
import { getEntryFile, getNpmNameWithPath, nodeModules } from './utils/utils';

// 源码目录
const SourcePath = path.resolve(`src`);

// 需要split chunk的包
const splitChunks: [
    /** 打包后的文件名 */
    string,
    /** 包含哪些包，如果不传说明它有特殊的包含包的逻辑 */
    string[],
][] = [
    ['polyfill', ['core-js']],
    ['react', ['react', 'react-dom', 'react-router', 'react-router-dom']],
    ['lodash', ['lodash']],
];

const webpackConfig = (): Configuration & {
    devServer?: WebpackOptionsNormalized['devServer'];
} => {
    // 环境
    const mode: Exclude<Configuration['mode'], undefined> =
        (process.env.NODE_ENV as Exclude<Configuration['mode'], undefined>) || 'production';

    // 开发模式
    const isWebpackDev = mode === 'development';

    console.log(chalk.gray('运行环境', process.env.NODE_ENV));

    // 入口的配置
    const entryFile = getEntryFile();

    // html相对输出目录
    const configDistPath = entryFile?.config?.distPath || '';

    // 资源部署目录
    const configPublicPath = entryFile?.config?.publicPath || 'static';

    // html输出目录
    const distPath = path.resolve('dist', configDistPath);

    // 资源部署目录
    const publicPath = configPublicPath;

    // 自适应大小
    const autoSizeUnit = entryFile?.config?.autoSizeUnit || 0;

    // 代理
    const devServer = entryFile?.config?.devServer || {};

    console.log(chalk.green('入口文件'), entryFile);

    console.log(chalk.green('部署配置'), {
        distPath,
        publicPath,
        autoSizeUnit,
    });

    return {
        mode,
        // 上下文基础目录
        context: path.resolve(__dirname, '../'),
        entry: {
            [entryFile.chunk]: entryFile.entry,
        },
        output: {
            clean: true,
            path: distPath,
            publicPath: configDistPath ? `/${configDistPath}/` : '/',
            filename: isWebpackDev ? '[name].bundle.js' : `${publicPath}/js/[name].[contenthash:8].js`,
            chunkFilename: isWebpackDev ? '[name].bundle.js' : `${publicPath}/js/[name].[chunkhash:8].js`,
            assetModuleFilename: `${publicPath}/assets/[name].[contenthash:8][ext][query]`,
        },
        resolve: {
            extensions: ['.js', '.ts', '.tsx'],
            alias: {
                '@': SourcePath,
            },
        },
        devServer: {
            ...devServer,
            open: true,
        },
        devtool: isWebpackDev ? 'eval-source-map' : false,
        module: {
            rules: [
                {
                    test: /\.(jpe?g|png|gif|webp)/i,
                    type: 'asset/resource',
                    parser: {
                        dataUrlCondition: {
                            maxSize: 1024,
                        },
                    },
                    include: [SourcePath],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                    include: [SourcePath],
                },
                {
                    test: /\.(md)$/i,
                    type: 'asset/source',
                    include: [SourcePath],
                },
                {
                    test: /\.css$/i,
                    oneOf: [
                        {
                            resourceQuery: /modules/,
                            use: getCssLoaders({
                                isModule: true,
                                isDev: isWebpackDev,
                                autoSizeUnit,
                            }),
                        },
                        {
                            include: [path.resolve(`src`)],
                            use: getCssLoaders({
                                isDev: isWebpackDev,
                                autoSizeUnit,
                            }),
                        },
                    ],
                },
                {
                    test: /\.less$/i,
                    oneOf: [
                        {
                            resourceQuery: /modules/,
                            use: getCssLoaders({
                                isModule: true,
                                isDev: isWebpackDev,
                                autoSizeUnit,
                                isLess: true,
                            }),
                        },
                        {
                            use: getCssLoaders({
                                isDev: isWebpackDev,
                                autoSizeUnit,
                                isLess: true,
                            }),
                        },
                    ],
                },
                {
                    test: /\.tsx?$/i,
                    use: {
                        loader: 'babel-loader?cacheDirectory=true&cacheCompression=true',
                        options: {
                            plugins: [isWebpackDev && require.resolve('react-refresh/babel')].filter(Boolean),
                        },
                    },
                    include: [SourcePath],
                },
            ],
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    ...Object.fromEntries(
                        splitChunks.map(([chunkName, packages]) => {
                            return [
                                chunkName,
                                {
                                    chunks: 'all',
                                    test: (module: webpack.NormalModule) => {
                                        const mName = getNpmNameWithPath(module.resource);

                                        return packages.includes(mName);
                                    },
                                    name: `vendor.${chunkName}`,
                                    enforce: true,
                                    reuseExistingChunk: true,
                                },
                            ];
                        }),
                    ),
                    vendorCommon: {
                        chunks: 'all',
                        test: (module: webpack.NormalModule) => {
                            return (
                                module.resource?.includes(nodeModules) ||
                                (module.resource?.includes('/src/') && !module.resource?.includes('/src/pages/'))
                            );
                        },
                        name: 'vendor.common',
                        minChunks: 2,
                        minSize: 10,
                        priority: 10,
                        reuseExistingChunk: true,
                    },
                },
            },
            minimizer: [
                new CssMiniPlugin(),
                new TerserPlugin({
                    // no comment
                    extractComments: false,
                }),
            ],
        },
        plugins: [
            isWebpackDev
                ? new ReactRefreshWebpackPlugin({
                      overlay: false,
                  })
                : NoopWebpackPlugin(),
            new MiniCssPlugin({
                filename: `${publicPath}/css/[name].[contenthash:8].css`,
            }),
            new HtmlWebpackPlugin({
                template: entryFile.template,
                filename: entryFile.filename,
                chunks: [entryFile.chunk],
                showErrors: isWebpackDev,
                title: entryFile.config?.title || '',
                templateParameters: entryFile.config?.templateParameters || {},
            }),
        ],
    };
};

// eslint-disable-next-line import/no-default-export,import/no-unused-modules
export default webpackConfig;
