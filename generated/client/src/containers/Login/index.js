'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { AuthForm } from '../../shared'
import { login } from '../../actions/auth'

class Login extends Component {

  static propTypes = {
    dispatch: PropTypes.func
  }

  handleLogin = (credentials) => {
    this.props.dispatch(login(credentials))
  }

  render () {
    return (
      <AuthForm
        buttonLabel='Login'
        buttonStyle='primary'
        onSubmit={this.handleLogin}
      />
    )
  }
}

export default connect()(Login)
