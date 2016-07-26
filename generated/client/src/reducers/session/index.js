'use strict'

import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAILURE,
  SIGNUP_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS
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
        user: action.result.user
      }
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loaded: true,
        user: action.result.user
      }
    case LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loaded: false,
        user: null
      }
    default:
      return state
  }

}
