#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const path = require('path')
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { SERVER_HOST, SERVER_PORT, PROJECT_PATH } = require('../scripts/constants');
const proxySetting = require(path.resolve(`${PROJECT_PATH}/setProxy.js`));

process.env.NODE_ENV = 'development';
const webpackConfig = require('../scripts/config/webpack.dev');

program
    .usage('[options]')
    .option('-p --port <port>', 'set dev server port')

program.on('--help', () => {
    console.log(chalk.yellow('# run dev server with default port'));
    console.log(chalk.white('# moo dev'));
    console.log(chalk.yellow('# run dev server with custom port'));
    console.log(chalk.white('# moo dev -p <port>'));
})

const args = require('minimist')(process.argv.slice(2));

if (args.h || args.help) {
    program.help()
}

const port = args.p || args.port || SERVER_PORT;

const compiler = webpack(webpackConfig);
const devServerOptions = Object.assign({}, webpackConfig.devServer, {
    host: SERVER_HOST,
    port: port,
    stats: 'errors-only',
    clientLogLevel: 'silent',
    compress: true,
    open: true,
    hot: true,
    proxy: { ...proxySetting }
});

const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(port, SERVER_HOST, () => {
    console.log('Starting server on http://' + SERVER_HOST + ':' + port);
});
