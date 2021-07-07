const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const common = require('./webpack.common.js')
const { resolve } = require('path')
const glob = require('glob')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const { PROJECT_PATH } = require('../constants')

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
        new PurgeCSSPlugin({
            paths: glob.sync(`${resolve(PROJECT_PATH, './src')}/**/*.{tsx,less,css}`, { nodir: true }),
            whitelist: ['html', 'body']
        }),
    ],
})
