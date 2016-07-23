'use strict'

import nodePath from 'path'
import addAppVariables from './app-variables'
import addStaticMiddlware from './static-middleware'
import addParsingMiddlware from './parsing-middleware'
import addWebpackMiddleware from './webpack-middleware'
import addAuthentication from './authentication'

module.exports = function (app, db) {

  // setValue and getValue are alias
  // for app.set and app.get used in the less
  // common way of setting application variables
  app.setValue = app.set.bind(app)

  app.getValue = path => app.get(path)

  // Adding configurations
  addAppVariables(app)
  addStaticMiddlware(app)
  addParsingMiddlware(app)
  addWebpackMiddleware(app)

  // Logging middleware, set as application
  // variable inside of server/app/configure/app-variables.js
  app.use(app.getValue('log'))

  addAuthentication(app, db)

}

