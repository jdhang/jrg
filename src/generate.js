'use strict'

import bluebird from 'bluebird'
import path from 'path'
import chalk from 'chalk'

const ncp = bluebird.promisify(require('ncp').ncp)
const rename = bluebird.promisify(require('fs').rename)

ncp.limit = 16

const newProjectDir = (() => {
  if (process.argv[2]) {
    return path.resolve(process.cwd(), process.argv[2])
  }

  return path.join(process.cwd(), 'generated')

})()

const generatorFilesPath = path.join(__dirname, '../generated')

const copyFiles = () => ncp(generatorFilesPath, newProjectDir)

const renameGitignore = () => {
   const oldPath = path.join(newProjectDir, 'gitignore.txt')
   const newPath = path.join(newProjectDir, '.gitignore')
   return rename(oldPath, newPath)
}

console.log(chalk.green('Generating your new REACT application!'))
copyFiles().then(renameGitignore).then(() => {
  console.log(chalk.blue('Completed!'));
  const output = [
    chalk.red('Do not forget to'),
    chalk.green(`cd ${process.argv[2] || 'test'}`),
    chalk.red('and'),
    chalk.yellow('npm install')
  ];
  console.log.apply(console, output)
})
