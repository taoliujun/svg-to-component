import MiniCssPlugin from 'mini-css-extract-plugin';
import type { RuleSetRule } from 'webpack';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const postcssConfig = require('../../.postcss');

/** css loader通用处理 */
export function getCssLoaders(opt: {
    /** 是否开发环境 */
    isDev: boolean;
    /** 是否是模块化css */
    isModule?: boolean;
    /** 自适应大小的基准宽度 */
    autoSizeUnit?: number;
    isLess?: boolean;
}): RuleSetRule['use'] {
    const { isDev = false, isModule = false, autoSizeUnit = 0, isLess = false } = opt;

    // css importLoaders
    let importLoaders = 1;

    // loaders
    const loaders: RuleSetRule['use'] = [];

    if (isLess) {
        importLoaders += 1;
    }

    loaders.push(isDev ? 'style-loader' : MiniCssPlugin.loader);

    loaders.push({
        loader: 'css-loader',
        options: {
            importLoaders,
            modules: isModule
                ? {
                      localIdentName: '[name]_[local]-[hash:8]',
                  }
                : false,
        },
    });

    loaders.push({
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: [
                    ...postcssConfig.plugins,
                    autoSizeUnit
                        ? [
                              'postcss-px-to-viewport',
                              {
                                  viewportWidth: autoSizeUnit,
                              },
                          ]
                        : null,
                ],
            },
        },
    });

    if (isLess) {
        loaders.push('less-loader');
    }

    return loaders;
}
