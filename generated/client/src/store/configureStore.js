'use strict'

import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import api from '../middleware/api'
import promise from '../middleware/promise'
import rootReducer from '../reducers'

export default function configureStore (history, initialState) {

  const middleware = [thunk, routerMiddleware(history)]
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
  }

  const enhancers = compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )

  return createStore(rootReducer, initialState, enhancers)
}
