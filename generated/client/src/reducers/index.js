'use strict'

import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import session from './session'

export default combineReducers({
  session,
  routing
})
