'use strict'

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from '../shared/Layout'
import NotFound from '../shared/NotFound'
import Home from '../components/Home'
import Login from '../components/Login'
import About from '../components/About'
import Docs from '../components/Docs'

const routes = (
  <Route path='/' component={Layout}>
    <IndexRoute component={Home} />
    <Route path='login' component={Login} />
    <Route path='about' component={About} />
    <Route path='docs' component={Docs} />
    <Route path='*' component={NotFound} />
  </Route>
)

export default routes
