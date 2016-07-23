'use strict'

import path from 'path'
import devConfigPath from './development.js'
import prodConfigPath from './production.js'
import testConfigPath from './testing.js'

if (process.env.NODE_ENV === 'production') {
  module.exports = prodConfigPath
} else if (process.env.NODE_ENV === 'testing') {
  module.exports = testConfigPath
} else {
  module.exports = devConfigPath
}
