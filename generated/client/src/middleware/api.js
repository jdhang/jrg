'use strict'

import 'isomorphic-fetch'

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

function callApi (endpoint, method, body) {
  return fetch(`${endpoint}`, {
    method,
    headers,
    body
  })
  .then(res => res.json().then(json => ({ json, res })))
  .then(({ json, res }) => {
    if (!res.ok) {
      return Promise.reject(json)
    }

    return {...json}
  })
}

export default store => next => action => {
  const callAPI = action['CALL_API']
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI
  const { types, method, body } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL')
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three string types.')
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith (data) {
    const finalAction = {...action, ...data}
    delete finalAction['CALL_API']
    return finalAction
  }

  const [REQUEST, SUCCESS, FAILURE] = types
  next(actionWith({ type: REQUEST }))

  return callApi(endpoint, method, body)
  .then(
    response => next(actionWith({ response, type: SUCCESS })),
    error => next(actionWith({
      type: FAILURE,
      error: error.message || 'An error occured',
    }))
  )
  .catch(error => {
    console.error(`MIDDLEWARE ERROR: ${error}`)
    next(actionWith({ type: FAILURE, error }))
  })

}
