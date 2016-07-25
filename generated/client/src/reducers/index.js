'use strict'

import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import session from './session'
import auth from './auth'

export default combineReducers({
  session,
  auth,
  routing
})
