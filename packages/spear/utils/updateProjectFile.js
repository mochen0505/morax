const { exec } = require('shelljs')
const chalk = require('chalk')

function installDependencies(projectPath) {
  if (exec(`cd ${projectPath} && npm install`).code !== 0) {
    console.log(chalk.red('Dependencies installing failed'));
    process.exit(-1)
  }
}

module.exports.installDependencies = installDependencies
