const path = require('path')
const fs = require('fs-extra')
const ora = require('ora')
const chalk = require('chalk')
const { SPEAR_PATH, PROJECT_PATH } = require('../scripts/constants');
const appendFiles = require('./appendFiles');
const installDependencies = require('./installDependencies');

function templateInit(projectName, templateName) {

    const spinner = ora({
        color: 'yellow',
        text: chalk.yellow(`Spawning ${projectName}...`),
    })

    const src = path.resolve(SPEAR_PATH, './template');
    const dest = path.resolve(PROJECT_PATH, `./${projectName}`);

    spinner.start()
    fs.copy(src, dest).then(() => {
        spinner.succeed()
        spinner.text = chalk.yellow(`Initializing ${projectName}...`)

        spinner.start()
        appendFiles(projectName);
        spinner.succeed()

        installDependencies(dest);

    }).catch(err => {
        console.log(chalk.red(err))
        process.exit(-1)
    });
}

module.exports = templateInit
