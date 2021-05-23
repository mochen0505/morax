const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const WebpackBar = require('webpackbar')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { PROJECT_PATH, SPEAR_PATH, isDev } = require('../constants')

const getCssLoaders = (importLoaders) => [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
        loader: 'css-loader',
        options: {
            modules: false,
            sourceMap: isDev,
            importLoaders,
        },
    },
    {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: [
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                    autoprefixer: {
                        grid: true,
                        flexbox: 'no-2009',
                    },
                    stage: 3,
                }),
                require('postcss-normalize'),
            ],
            sourceMap: isDev,
        },
    },
]

module.exports = {
    entry: {
        app: resolve(PROJECT_PATH, './src/index.js'),
    },
    output: {
        filename: `js/[name]${isDev ? '' : '.[hash:8]'}.js`,
        path: resolve(PROJECT_PATH, './dist'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
            Src: resolve(PROJECT_PATH, './src'),
            Components: resolve(PROJECT_PATH, './src/components'),
            Utils: resolve(PROJECT_PATH, './src/utils'),
        },
    },
    resolveLoader: {
        modules: [resolve(SPEAR_PATH, 'node_modules')],
    },
    module: {
        rules: [
            {
                test: /\.(tsx?|js)$/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    // 无法写在.babelrc里
                    presets: [
                        [
                            `${SPEAR_PATH}/node_modules/@babel/preset-env`,
                            {
                                modules: false,
                            },
                        ],
                        `${SPEAR_PATH}/node_modules/@babel/preset-react`,
                        `${SPEAR_PATH}/node_modules/@babel/preset-typescript`,
                    ],
                    plugins: [
                        [
                            `${SPEAR_PATH}/node_modules/@babel/plugin-transform-runtime`,
                            {
                                corejs: {
                                    version: 3,
                                    proposals: true,
                                },
                                useESModules: true,
                            },
                        ],
                    ],
                },
                include: [
                    resolve(PROJECT_PATH, './src'),
                    resolve(PROJECT_PATH, './node_modules/@morax')
                ],
            },
            {
                test: /\.css$/,
                use: getCssLoaders(1),
            },
            {
                test: /\.less$/,
                use: [
                    ...getCssLoaders(2),
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: isDev,
                        },
                    },
                ],
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10 * 1024,
                            name: '[name].[contenthash:8].[ext]',
                            outputPath: 'assets/images',
                        },
                    },
                ],
            },
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[contenthash:8].[ext]',
                            outputPath: 'assets/fonts',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve(PROJECT_PATH, './public/index.html'),
            filename: 'index.html',
            cache: false,
            minify: isDev
                ? false
                : {
                      removeAttributeQuotes: true,
                      collapseWhitespace: true,
                      removeComments: true,
                      collapseBooleanAttributes: true,
                      collapseInlineTagWhitespace: true,
                      removeRedundantAttributes: true,
                      removeScriptTypeAttributes: true,
                      removeStyleLinkTypeAttributes: true,
                      minifyCSS: true,
                      minifyJS: true,
                      minifyURLs: true,
                      useShortDoctype: true,
                  },
        }),
        new CopyPlugin({
            patterns: [
                {
                    context: resolve(PROJECT_PATH, './public'),
                    from: '*',
                    to: resolve(PROJECT_PATH, './dist'),
                    toType: 'dir',
                },
            ],
        }),
        new WebpackBar({
            name: isDev ? '正在启动...' : '正在打包...',
            color: '#45bf39',
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: resolve(SPEAR_PATH, './tsconfig.json'),
            },
        }),
        new HardSourceWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        !isDev &&
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
                ignoreOrder: false,
            }),
        new webpack.BannerPlugin({
            raw: true,
            banner: '/** @preserve banner comment demo */',
        }),
    ].filter(Boolean),
    externals: {},
    optimization: {
        minimize: !isDev,
        minimizer: [
            !isDev &&
                new TerserPlugin({
                    extractComments: false,
                    terserOptions: {
                        compress: { pure_funcs: ['console.log'] },
                    },
                }),
            !isDev && new OptimizeCssAssetsPlugin(),
        ].filter(Boolean),
        splitChunks: {
            chunks: 'all',
            name: true,
        },
    },
}
