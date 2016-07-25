'use strict'

import React from 'react'
import Promise from 'bluebird'
import { Route, IndexRoute } from 'react-router'
import {
  isLoaded as isAuthLoaded,
  load as loadAuth
} from '../actions/auth'
import { About, Docs, Home, MembersOnly } from '../components'
import { Layout, Login, Signup } from '../containers'
import { NotFound } from '../shared'

const getRoutes = (store) => {
  const requireLogin = (nextState, replace, next) => {
    function checkAuth () {
      const { session: { user }} = store.getState()
      if (!user) {
        replace('/')
      }
      next()
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  }

  return (
    <Route path='/' component={Layout}>

      { /* Home route */ }
      <IndexRoute component={Home} />

      { /* Authenticated Routes */ }
      <Route onEnter={requireLogin}>
        <Route path='membersOnly' component={MembersOnly} />
      </Route>

      { /* Routes */ }
      <Route path='about' component={About} />
      <Route path='docs' component={Docs} />
      <Route path='login' component={Login} />
      <Route path='signup' component={Signup} />

      { /* Catch all routes */ }
      <Route path='*' component={NotFound} />
    </Route>
  )
}

export default getRoutes
