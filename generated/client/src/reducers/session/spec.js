'use strict'

import { expect } from 'chai'
import session from '../../reducers/session'
import { types } from '../../actions/auth'
import * as test from './tests'

describe('REDUCER - session:', () => {

  const initialState = {
    loaded: false
  }

  it('returns the initial state', () => {
    expect(session(undefined, {})).to.deep.equal(initialState)
  })

  describe('handles actions', () => {
    // LOAD action tests
    test.loadActions()

    // SIGNUP action tests
    test.signupActions()

    // LOGIN action tests
    test.loginActions()

    // LOGOUT action tests
    test.logoutActions()
  })

})
