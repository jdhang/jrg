'use strict'

import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { AuthForm } from '../../shared'
import { login, signup } from '../../redux/modules/auth'

class Auth extends Component {
  static propTypes = {
    location: PropTypes.object,
    login: PropTypes.func,
    signup: PropTypes.func,
    push: PropTypes.func
  }

  constructor (props) {
    super(props)

    this.handleLogin = this.handleLogin.bind(this)
    this.handleSignup = this.handleSignup.bind(this)
  }

  handleLogin (credentials) {
    const {login, push} = this.props
    login(credentials)
      .then(() => push('/membersOnly'))
  }

  handleSignup (credentials) {
    const {signup, push} = this.props
    signup(credentials)
      .then(() => push('/membersOnly'))
  }

  render () {
    const {pathname} = this.props.location

    if ((/signup/i).test(pathname)) {
      return (
        <AuthForm
          title='Sign Up'
          buttonLabel='Sign Up'
          buttonStyle='success'
          onSubmit={this.handleSignup}
        />
      )
    } else if ((/login/i).test(pathname)) {
      return (
        <AuthForm
          title='Login'
          buttonLabel='Login'
          buttonStyle='primary'
          onSubmit={this.handleLogin}
        />
      )
    } else {
      return null
    }
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({ login, signup, push }, dispatch)
}

export default connect(null, mapDispatchToProps)(Auth)
