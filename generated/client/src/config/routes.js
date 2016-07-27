'use strict'

import React from 'react'
import Promise from 'bluebird'
import { Route, IndexRoute } from 'react-router'
import {
  isLoaded as isSessionLoaded,
  load as loadSession
} from '../actions/auth'
import { About, Docs, Home, MembersOnly } from '../components'
import { Layout, Login, Signup } from '../containers'
import { NotFound } from '../shared'

const getRoutes = (store) => {
  const getSession = (nextState, replace, next) => {
    if (!isSessionLoaded(store.getState())) {
      store.dispatch(loadSession())
      .then(() => next())
    } else {
      next()
    }
  }

  const requireLogin = (nextState, replace, next) => {
    function checkSession () {
      const { session: { user }} = store.getState()
      if (!user) {
        replace('/login')
      }
      next()
    }

    if (!isSessionLoaded(store.getState())) {
      store.dispatch(loadSession()).then(checkSession);
    } else {
      checkSession();
    }
  }

  const requireNoUser = (nextState, replace, next) => {
    function checkSession () {
      const { session: { user }} = store.getState()
      if (user) {
        replace('/membersOnly')
      }
      next()
    }

    if (!isSessionLoaded(store.getState())) {
      store.dispatch(loadSession()).then(checkSession);
    } else {
      checkSession();
    }
  }

  return (
    <Route path='/' onEnter={getSession} component={Layout}>

      { /* Home route */ }
      <IndexRoute component={Home} />

      { /* Authenticated Routes */ }
      <Route onEnter={requireLogin}>
        <Route path='membersOnly' component={MembersOnly} />
      </Route>

      { /* Unauthenticated Routes Only */ }
      <Route onEnter={requireNoUser}>
        <Route path='login' component={Login} />
        <Route path='signup' component={Signup} />
      </Route>

      { /* Routes */ }
      <Route path='about' component={About} />
      <Route path='docs' component={Docs} />

      { /* Catch all routes */ }
      <Route path='*' component={NotFound} />
    </Route>
  )
}

export default getRoutes
