'use strict'

import { expect } from 'chai'
import session from '../../../reducers/session'
import { LOAD, LOAD_SUCCESS, LOAD_FAILURE } from '../../../actions/auth'

const successRes = {
  user: { email: 'test@test.com', password: 'test1234' }
}

const failureRes = {
  response: { data: 'ERROR' }
}

export default function () {
  describe('LOAD', () => {
    const nextState = session(
      { loading: false, loadError: failureRes },
      { type: LOAD }
    )

    it('by setting \'loading\' to true', () => {
      expect(nextState.loading).to.be.true
    })

    it('by setting \'loadError\' to null', () => {
      expect(nextState.loadError).to.be.null
    })
  })

  describe('LOAD_SUCCESS', () => {
    const nextState = session(
      { loading: true, loaded: false },
      { type: LOAD_SUCCESS, result: successRes }
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

  describe('LOAD_FAILURE', () => {
    const nextState = session(
      { loading: true, loaded: false },
      { type: LOAD_FAILURE, error: failureRes}
    )

    it('by setting \'loading\' to false', () => {
      expect(nextState.loading).to.be.false
    })

    it('by setting \'loadError\'', () => {
      expect(nextState.loadError).to.exist
    })

    it('by not setting \'loaded\' to true', () => {
      expect(nextState.loaded).to.be.false
    })

    it('by not setting \'user\'', () => {
      expect(nextState.user).to.not.exist
    })
  })
}
