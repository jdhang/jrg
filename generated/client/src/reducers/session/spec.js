'use strict'

import { expect } from 'chai'
import session from '../../reducers/session'
import { types } from '../../actions/auth'

describe('REDUCER - session:', () => {

  const initialState = {
    loaded: false
  }

  const credentials = {
    email: 'test@test.com',
    password: 'test1234'
  }

  it('returns the initial state', () => {
    expect(session(undefined, {})).to.deep.equal(initialState)
  })

  describe('handles actions', () => {

    const reduceWithAction = (action, initialState) => {
      return session(initialState, action)
    }

    describe('LOAD', () => {
      it('by setting \'loading\' to true', () => {
        const nextState = reduceWithAction({ type: types.LOAD })
        expect(nextState.loading).to.be.true
      })
    })

    describe('LOAD_SUCCESS', () => {
      const nextState = reduceWithAction({
        type: types.LOAD_SUCCESS,
        result: { user: credentials }
      })

      it('by setting \'loading\' to false', () => {
        expect(nextState.loading).to.be.false
      })

      it('by setting \'loaded\' to true', () => {
        expect(nextState.loaded).to.be.true
      })

      it('by setting \'user\'', () => {
        expect(nextState.user).to.exist
      })
    })

    describe('LOAD_FAILURE', () => {
    })

    describe('SIGNUP', () => {
      it('by setting \'loading\' to true', () => {
        const nextState = reduceWithAction({ type: types.LOAD })
        expect(nextState.loading).to.be.true
      })
    })

    describe('SIGNUP_SUCCESS', () => {
      const nextState = reduceWithAction(
        { type: types.SIGNUP_SUCCESS, result: { user: credentials }},
        { loading: true, loaded: false }
      )

      it('by setting \'loading\' to false', () => {
        expect(nextState.loading).to.be.false
      })

      it('by setting \'loaded\' to true', () => {
        expect(nextState.loaded).to.be.true
      })

      it('by setting \'user\'', () => {
        expect(nextState.user).to.exist
      })
    })

    describe('SIGNUP_FAILURE', () => {
      const nextState = reduceWithAction(
        { type: types.SIGNUP_FAILURE, error: { message: 'ERROR '}},
        { loading: true, loaded: false }
      )

      it('by setting \'loading\' to false', () => {
        expect(nextState.loading).to.be.false
      })

      it('by setting \'error\'', () => {
        expect(nextState.error).to.exist
      })

      it('by not setting \'loaded\' to true', () => {
        expect(nextState.loaded).to.be.false
      })

      it('by not setting \'user\'', () => {
        expect(nextState.user).to.not.exist
      })
    })

    describe('LOGIN', () => {
      it('by setting \'loading\' to true', () => {
        const nextState = reduceWithAction({ type: types.LOAD })
        expect(nextState.loading).to.be.true
      })
    })

    describe('LOGIN_SUCCESS', () => {
      const nextState = reduceWithAction(
        { type: types.LOAD_SUCCESS, result: { user: credentials }},
        { loading: true, loaded: false }
      )

      it('by setting \'loading\' to false', () => {
        expect(nextState.loading).to.be.false
      })

      it('by setting \'loaded\' to true', () => {
        expect(nextState.loaded).to.be.true
      })

      it('by setting \'user\'', () => {
        expect(nextState.user).to.exist
      })
    })

    describe('LOGIN_FAILURE', () => {
      const nextState = reduceWithAction(
        { type: types.LOGOUT_FAILURE, error: { message: 'ERROR' }},
        { loading: true, loaded: false }
      )

      it('by setting \'loading\' to false', () => {
        expect(nextState.loading).to.be.false
      })

      it('by setting \'error\'', () => {
        expect(nextState.error).to.exist
      })

      it('by not setting \'loaded\' to true', () => {
        expect(nextState.loaded).to.be.false
      })

      it('by not setting \'user\'', () => {
        expect(nextState.user).to.not.exist
      })
    })

    describe('LOGOUT', () => {
      it('by setting \'loading\' to true', () => {
        const nextState = reduceWithAction({ type: types.LOAD })
        expect(nextState.loading).to.be.true
      })
    })

    describe('LOGOUT_SUCCESS', () => {
      const nextState = reduceWithAction(
        { type: types.LOGOUT_SUCCESS },
        { loading: true, loaded: true, user: credentials }
      )

      it('by setting \'loading\' to false', () => {
        expect(nextState.loading).to.be.false
      })

      it('by setting \'loaded\' to false', () => {
        expect(nextState.loaded).to.be.false
      })

      it('by setting \'user\' to null', () => {
        expect(nextState.user).to.be.null
      })
    })

    describe('LOGOUT_FAILURE', () => {
      const nextState = reduceWithAction(
        { type: types.LOGOUT_FAILURE, error: { message: 'Error' }},
        { loading: true, loaded: true, user: credentials }
      )

      it('by setting \'loading\' to false', () => {
        expect(nextState.loading).to.be.false
      })

      it('by setting \'error\'', () => {
         expect(nextState.error).to.exist
      })

      it('by not setting \'loaded\' to false', () => {
        expect(nextState.loaded).to.be.true
      })

      it('by not setting \'user\' to null', () => {
        expect(nextState.user).to.exist
      })

    })

  })

})
