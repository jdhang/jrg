'use strict'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import promise from '../../middleware/promise'
import { types, actions } from '../../actions/auth'
import nock from 'nock'
import { expect } from 'chai'

const middlewares = [ thunk, promise ]
const mockStore = configureMockStore(middlewares)

describe('ACTIONS - auth:', () => {

  let store
  let credentials = {
    email: 'test@test.com',
    password: '1234'
  }

  const dispatchAction = (action, ...args) => {
    return store.dispatch(action.apply(action, args))
  }

  beforeEach(() => {
    store = mockStore({ session: {} })
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('isLoaded', () => {

    it('returns true if session has been loaded', () => {
      store = mockStore({ session: { loaded: true }})
      expect(actions.isLoaded(store.getState())).to.be.true
    })

    it('returns false if session has not been loaded', () => {
      store = mockStore({ session: { loaded: false }})
      expect(actions.isLoaded(store.getState())).to.be.false
    })

  })

  describe('load', () => {
    const sessionAPICall = nock(`http://localhost:8080`)
                          .get('/session')

    it('creates LOAD when initially dispatched', () => {
      sessionAPICall.reply(200)

      return dispatchAction(actions.load)
      .then(() => {
        const actionTypes = store.getActions().map(action => action.type)
        expect(actionTypes).to.include(types.LOAD)
      })
    })

    it('creates LOAD_SUCCESS with result when load was successfully done', () => {
      sessionAPICall.reply(200, credentials)

      return dispatchAction(actions.load)
      .then(() => {
        const actionsWithResult = store.getActions().filter(action => action.result)
        expect(actionsWithResult).to.have.length(1)
        expect(actionsWithResult[0].type).to.equal(types.LOAD_SUCCESS)
        expect(actionsWithResult[0].result).to.deep.equal(credentials)
      })
    })

    it ('creates LOAD_FAILURE when load request fails', () => {
      sessionAPICall.replyWithError({ message: 'Error occured' })

      return dispatchAction(actions.load)
      .then(() => {
        const actionTypes = store.getActions().map(action => action.type)
        expect(actionTypes).to.include(types.LOAD_FAILURE)
      })
    })


  })

  describe('signup', () => {
    const signupAPICall = nock(`http://localhost:8080`)
                          .post('/signup', credentials)

    it('creates SIGNUP when initially dispatched', () => {
      signupAPICall.reply(200, credentials)

      return dispatchAction(actions.signup, credentials)
      .then(() => {
        const actionTypes = store.getActions().map(action => action.type)
        expect(actionTypes).to.include(types.SIGNUP)
      })
    })

    it('creates SIGNUP_SUCCESS with result when signup was successfully done', () => {
      signupAPICall.reply(200, credentials)

      return dispatchAction(actions.signup, credentials)
      .then(() => {
        const actionsWithResult = store.getActions().filter(action => action.result)
        expect(actionsWithResult).to.have.length(1)
        expect(actionsWithResult[0].type).to.equal(types.SIGNUP_SUCCESS)
        expect(actionsWithResult[0].result).to.deep.equal(credentials)
      })
    })

    it ('creates SIGNUP_FAILURE when signup request fails', () => {
      signupAPICall.replyWithError({ message: 'Error occured' })

      return dispatchAction(actions.signup, credentials)
      .then(() => {
        const actionTypes = store.getActions().map(action => action.type)
        expect(actionTypes).to.include(types.SIGNUP_FAILURE)
      })
    })

  })

  describe('login', () => {
    const loginAPICall = () => nock(`http://localhost:8080`)
                               .post('/login', credentials)

    it('creates LOGIN when initially dispatched', () => {
      loginAPICall().reply(200, credentials)

      return dispatchAction(actions.login, credentials)
      .then(() => {
        const actionTypes = store.getActions().map(action => action.type)
        expect(actionTypes).to.include(types.LOGIN)
      })
    })

    it('creates LOGIN_SUCCESS when login was successfully done', () => {
      loginAPICall().reply(200, credentials)

      return dispatchAction(actions.login, credentials)
      .then(() => {
        const actionsWithResult = store.getActions().filter(action => action.result)
        expect(actionsWithResult).to.have.length(1)
        expect(actionsWithResult[0].type).to.equal(types.LOGIN_SUCCESS)
        expect(actionsWithResult[0].result).to.deep.equal(credentials)
      })
    })

    it('creates LOGIN_FAILURE when login request fails', () => {
      loginAPICall().replyWithError({ message: 'Invalid credentials' })

      return dispatchAction(actions.login, credentials)
      .then(() => {
        const actionTypes = store.getActions().map(action => action.type)
        expect(actionTypes).to.include(types.LOGIN_FAILURE)
      })
    })

  })

  describe('logout', () => {
    const logoutAPICall = nock(`http://localhost:8080`)
                          .get('/logout')

    const dispatchLogoutAction = () => {
      return store.dispatch(actions.logout())
    }

    it('creates LOGOUT when initially dispatched', () => {
      logoutAPICall.reply(200)

      return dispatchLogoutAction()
      .then(() => {
        const actionTypes = store.getActions().map(action => action.type)
        expect(actionTypes).to.include(types.LOGOUT)
      })
    })

    it('creates LOGOUT_SUCCESS when login was successfully done', () => {
      logoutAPICall.reply(200)

      return dispatchLogoutAction()
      .then(() => {
        const actionTypes = store.getActions().map(action => action.type)
        expect(actionTypes).to.include(types.LOGOUT_SUCCESS)
      })
    })

    it('creates LOGOUT_FAILURE when login request fails', () => {
      logoutAPICall.replyWithError({ message: 'Logout Failed' })

      return dispatchLogoutAction()
      .then(() => {
        const actionTypes = store.getActions().map(action => action.type)
        expect(actionTypes).to.include(types.LOGOUT_FAILURE)
      })
    })

  })

})
