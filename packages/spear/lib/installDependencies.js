const { exec, cd } = require('shelljs')
const ora = require('ora')
const chalk = require('chalk')

function installDependencies(dest) {

    const spinner = ora({
        color: 'yellow',
        text: chalk.yellow(`Installing dependencies...`),
    })
    spinner.start()

    cd(dest)
    exec('npm install', () => {
        spinner.succeed()
    })
}

module.exports = installDependencies
