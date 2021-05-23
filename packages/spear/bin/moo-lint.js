#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk');
const { exec } = require('shelljs')

program
    .usage('[options]')
    .option('-e, --eslint', 'only eslint')
    .option('-s, --stylelint', 'only stylelint')

program.on('--help', () => {
    console.log(chalk.yellow('# run eslint and stylelint'));
    console.log(chalk.white('# moo lint'));
    console.log(chalk.yellow('# run eslint only'));
    console.log(chalk.white('# moo lint -e'));
    console.log(chalk.yellow('# run stylelint only'));
    console.log(chalk.white('# moo lint -s'));
})

const args = require('minimist')(process.argv.slice(2))

if (args.h || args.help) {
    program.help()
}

if (args.e || args.eslint) {
    exec('eslint -c .eslintrc.js --ext .ts,.tsx,.js src')
} else if (args.s || args.stylelint) {
    exec('stylelint --config .stylelintrc.js src/**/*.{less,css,scss}')
} else {
    exec('eslint -c .eslintrc.js --ext .ts,.tsx,.js src')
    exec('stylelint --config .stylelintrc.js src/**/*.{less,css,scss}')
}
