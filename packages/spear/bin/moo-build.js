#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

process.env.NODE_ENV = 'production';
const webpackConfig = require('../scripts/config/webpack.prod');

program
    .usage('[options]')
    .option('-a, --analyze', 'enable bundle analyze mode')

program.on('--help', () => {
    console.log(chalk.yellow('# Build the app'));
    console.log(chalk.white('# moo build'));
    console.log(chalk.yellow('# enable bundle analyze mode'));
    console.log(chalk.white('# moo build -a'));
})

const args = require('minimist')(process.argv.slice(2));

if (args.h || args.help) {
    program.help()
}

if (args.a || args.analyze) {
    webpackConfig.plugins.push(
        new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerHost: '127.0.0.1',
            analyzerPort: 8889,
        })
    );
}

webpack(webpackConfig, (err, stats) => {
    if (err) {
        return err
    }

    return stats
});
