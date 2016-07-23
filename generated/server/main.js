'use strict'

import chalk from 'chalk'
import db from './db'

// Create a node server instance!
const server = require('http').createServer()

const createApplication = () => {
  const app = require('./app')(db)
  server.on('request', app) // Attach the Express application
}

const startServer = () => {

  const PORT = process.env.PORT || 8080

  server.listen(PORT, () => {
    console.log(chalk.blue('Server started on port', chalk.magenta(PORT)))
  })

}

db.sync()
.then(createApplication)
.then(startServer)
.catch(err => console.error(chalk.red(err.stack)))
