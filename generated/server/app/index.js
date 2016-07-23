'use strict'

import path from 'path'
import express from 'express'
import configure from './configure'

const app = express()

module.exports = function (db) {

  // Pass express application through configuration
  // function located at server/app/configure/index.js
  configure(app, db)

  // Routes definition

  /*
   Middleware to catch URLs resembling file extensions
   e.g: .js, .html, .css
   Allows for proper 404s instead of the wildcard catching
   URLs that bypass express.static because the provided file
   does not exist.
   */
  app.use((req, res, next) => {

    if (path.extname(req.path).length > 0) {
      res.status(404).end()
    } else {
      next(null)
    }

  })

  app.get('*', (req, res) => {
    res.sendFile(app.get('indexHTMLPath'))
  })

  // Error catching
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })

  return app
}
