const DotenvWebpackPlugin = require('dotenv-webpack');
const { WebpackConfiguration } = require('webpack-dev-server');
const { resolve } = require('./utils/resolve');
const { generate } = require('./webpack.base');

const base = generate(true);
const basePlugins = base.plugins;

/**
 *
 * @type {WebpackConfiguration}
 */
const config = {
    ...base,
    plugins: [...basePlugins, new DotenvWebpackPlugin({ path: resolve('.env.prod') })],
};

module.exports = config;
