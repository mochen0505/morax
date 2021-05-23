#!/usr/bin/env node

const inquirer = require('inquirer')
const program = require('commander')
const chalk = require('chalk')
const templateInit = require('../utils/templateInit')

const promptList = [

    {
        type: 'input',
        name: 'projectName',
        prefix: "#",
        message: chalk.yellow('What\'s your project name?'),
        validate: function(val) {
            if(!/[a-zA-Z0-9_-]/.test(val)) {
                return 'Enter a legal name';
            }
            return true;
        }
    },
    // TODO: 选择高阶组件
    // {
    //     type: 'checkbox',
    //     message: `${chalk.yellow('select HOCs you want to use:')}`,
    //     name: 'hoc',
    //     choices: []
    // },
]

program
    .usage('[options]')
    .option('[options]', 'Project name')

program.on('--help', () => {
    console.log(chalk.yellow('# Create your app by step'));
    console.log(chalk.white('# moo init'));
    console.log(chalk.yellow('# Create your app with a project name'));
    console.log(chalk.white('# moo init [projectName]'));
})

const args = require('minimist')(process.argv.slice(2));

if (args.h || args.help) {
    program.help()
}

const projectName = args._[0]

if (projectName === undefined) {
    inquirer
        .prompt(promptList)
        .then(({ projectName }) => {
            templateInit(projectName)
        }).catch(err => {
            console.log(chalk.red(err))
            process.exit(-1)
        })
} else {
    inquirer
        .prompt(promptList.slice(1))
        .then(() => {
            templateInit(projectName)
        }).catch(err => {
        console.log(chalk.red(err))
        process.exit(-1)
    })
}

