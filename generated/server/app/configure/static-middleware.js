'use strict'

import path from 'path'
import express from 'express'
import favicon from 'serve-favicon'

module.exports = function (app) {

  const root = app.getValue('projectRoot')

  const npmPath = path.join(root, './node_modules')
  const buildPath = path.join(root, './client/build')

  app.use(favicon(app.getValue('faviconPath')))
  app.use(express.static(npmPath))
  app.use(express.static(buildPath))

}
