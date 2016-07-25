'use strict'

import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAILURE,
  SIGNUP_SUCCESS,
  LOGIN_SUCCESS
} from '../../actions/auth'

const initialState = {
  loaded: false
}

export default function session (state = initialState, action = {}) {

  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      }
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.user
      }
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.response
      }
    case LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      }
    default:
      return state
  }

}
