'use strict'

import 'isomorphic-fetch'
import { push } from 'react-router-redux'

export const LOAD           = 'LOAD'
export const LOAD_SUCCESS   = 'LOAD_SUCCESS'
export const LOAD_FAILURE   = 'LOGIN_FAILURE'
export const LOGIN          = 'LOGIN'
export const LOGIN_SUCCESS  = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE  = 'LOGIN_FAILURE'
export const LOGOUT         = 'LOGOUT'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'
export const SIGNUP         = 'SIGNUP'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

export const types = {
  LOAD, LOAD_SUCCESS, LOAD_FAILURE,
  LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE,
  SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE
}

const BASE_URL = 'http://localhost:8080'

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

export function isLoaded (globalState) {
  return globalState.session && globalState.session.loaded
}

export const load = () => (dispatch, getState) => {
  dispatch({ type: LOAD })
  const { session: { user } } = getState()

  if (user) {
    dispatch({ type:LOAD_SUCCESS, user })
  } else {
    return fetch(`${BASE_URL}/session`)
    .then(res => res.json())
    .then(
      resData => dispatch({ type: LOAD_SUCCESS, resData }),
      error => dispatch({ type: LOAD_FAILURE, error })
    )
    .catch(error => dispatch({
      error: error.message || `An error occured`,
      type: LOAD_FAILURE
    }))
  }

}

export const signup = (credentials) => (dispatch) => {
  dispatch({ type: SIGNUP })
  return fetch(`${BASE_URL}/signup`, {
    method: 'post',
    headers,
    body: JSON.stringify({...credentials})
  })
  .then(res => res.json())
  .then(
    result => dispatch({ type: SIGNUP_SUCCESS, result }),
    error => dispatch({ type: SIGNUP_FAILURE, error })
  )
  .catch(error => dispatch({
    error: error.message || `An error occured`,
    type: SIGNUP_FAILURE
  }))
}

// export const signup = (credentials) => {
//   return {
//     types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE],
//     promise: fetch(`/signup`, {
//       method: 'post',
//       headers,
//       body: JSON.stringify({...credentials})
//     })
//   }
// }
//
//
export const login = (credentials) => (dispatch) => {
  dispatch({ type: LOGIN })
  return fetch(`${BASE_URL}/login`, {
    method: 'post',
    headers,
    body: JSON.stringify({...credentials})
  })
  .then(res => res.json())
  .then(
    result => dispatch({ type: LOGIN_SUCCESS, result }),
    error => dispatch({ type: LOGIN_FAILURE, error })
  )
  .catch(error => dispatch({
    error: error.message || `An error occured`,
    type: LOGIN_FAILURE
  }))
}

// export const login = (credentials) => {
//   return {
//     'CALL_API': {
//       types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE],
//       endpoint: `/login`,
//       method: 'post',
//       body: JSON.stringify({...credentials})
//     }
//   }
// }

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT })
  return fetch(`${BASE_URL}/logout`)
  .then(
    response => {
      dispatch({ type: LOGOUT_SUCCESS })
      dispatch(push('/login'))
    },
    error => dispatch({ type: LOGOUT_FAILURE, error })
  )
  .catch(error => dispatch({
    error: error.message || `An error occured`,
    type: LOGOUT_FAILURE
  }))
}

export const actions = {
  isLoaded, load, signup, login, logout
}

export default {
  types,
  actions
}
