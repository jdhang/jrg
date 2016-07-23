'use strict'

import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

module.exports = function (app) {

  // Capture them cookies
  // Must be done before any session middleware
  app.use(cookieParser())

  // Parse out POST and PUT bodies
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

}
