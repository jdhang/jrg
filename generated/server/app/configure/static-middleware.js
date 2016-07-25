'use strict'

import path from 'path'
import express from 'express'
import favicon from 'serve-favicon'

module.exports = function (app) {

  const root = app.getValue('projectRoot')

  const npmPath = path.join(root, './node_modules')
  // const clientPath = path.join(root, './client')
  const publicPath = path.join(root, './client/public')

  app.use(favicon(app.getValue('faviconPath')))
  app.use(express.static(npmPath))
  app.use(express.static(publicPath))
  // app.use(express.static(clientPath))

}
