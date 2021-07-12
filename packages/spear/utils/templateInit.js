const path = require('path')
const fs = require('fs')
const async = require('async')
const mkdirp = require('mkdirp')
const del = require('del')
const ora = require('ora')
const chalk = require('chalk')
const { PROJECT_PATH } = require('../scripts/constants');
const downloadTemplate = require('../utils/downloadTemplate');
const { installDependencies } = require('../utils/updateProjectFile')

function getProjectPath(projectName) {
  return path.join(PROJECT_PATH , path.sep, projectName)
}

function directoryExist(folderPath) {
  try {
    fs.statSync(folderPath)
  } catch (e) {
    return false
  }
  return true
}

function getTemplateFiles(files) {
  const arr = []

  files.forEach(file => {
    const isFile = file.type === 'file'

    if (isFile) {
      arr.push(file)
    }
  })
  return arr
}

function replaceProjectName(file, projectName, callback) {
  if (file.data.toString().includes('${PROJECT_NAME}')) {
    const content = file.data.toString()
    const reg = /\${PROJECT_NAME}/gm
    file.data = Buffer.from(content.replace(reg, projectName))
  }

  callback(null, file, projectName)
}

function resolveFilename(file, projectName, callback) {
  const index = file.path.indexOf('/') + 1
  const fileName = file.path.substring(index)

  file.path = path.join(getProjectPath(projectName), fileName)

  callback(null, file)
}

function generateTemplateFile(file, callback) {
  const getDirName = path.dirname

  mkdirp(getDirName(file.path), err => {
    if (err) {
      return callback(err)
    }

    fs.writeFile(file.path, file.data, callback)
  })
}

function asyncJobWaterfall(projectName) {
  return (file, callback) => {
    async.waterfall([
      callback => {
        callback(null, file, projectName)
      },
      replaceProjectName,
      resolveFilename,
      generateTemplateFile
    ], callback)
  }
}

function templateInit(projectName, templateName) {

    const projectPath = getProjectPath(projectName)

    if (directoryExist(projectPath)) {
        console.log(chalk.red(`Duplicated folder name: ${projectPath}`));
        process.exit(-1)
    }

    const spinner = ora({
        color: 'yellow',
        text: chalk.yellow(`Downloading template: ${templateName}...`),
    })

    spinner.start()

    downloadTemplate(templateName, (err, template) => {
        spinner.stop()
        if (err) {
          console.log(chalk.red(err));
          process.exit(-1)
        }

        const files = getTemplateFiles(template)

        spinner.text = chalk.yellow(`Initializing ${projectName}...`)
        spinner.start()
        async.each(
            files,
            asyncJobWaterfall(projectName),
            async err => {
              spinner.stop()
              if (err) {
                del.sync([projectPath])
                console.log(chalk.red(err));
                process.exit(-1)
              }

              spinner.text = `Installing ${projectName} dependencies ....`
              spinner.start()

              installDependencies(projectPath)

              spinner.stop()
              console.log(chalk.yellow(`${projectName} generated successfully`));
            }
        )
    })
}

module.exports = templateInit
