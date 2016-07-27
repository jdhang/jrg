'use strict'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import promise from '../../middleware/promise'
import * as test from './tests'

const middlewares = [ thunk, promise ]
const mockStore = configureMockStore(middlewares)

describe('ACTIONS - auth:', () => {
  let store = mockStore({ session: {} })

  // isLoaded action test
  test.isLoaded(mockStore)

  // load action tests
  test.load(mockStore)

  // login action tests
  test.login(mockStore)

  // logout action tests
  test.logout(mockStore)

  // signup action test
  test.signup(mockStore)

})
