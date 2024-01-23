const DotenvWebpackPlugin = require('dotenv-webpack');
const { WebpackConfiguration } = require('webpack-dev-server');
const { resolve } = require('./utils/resolve');
const { generate } = require('./webpack.base');

const base = generate(false);
const basePlugins = base.plugins;

/**
 * @type {WebpackConfiguration}
 */
const config = {
    ...base,
    devServer: {
        static: {
            directory: resolve('lib'),
        },
        compress: true,
        open: true,
        hot: true,
        historyApiFallback: true,
        port: 9000,
    },
    plugins: [...basePlugins, new DotenvWebpackPlugin({ path: resolve('.env') })],
};

module.exports = config;
