'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { AuthForm } from '../../shared'
import { signup } from '../../actions/auth'

class Signup extends Component {

  static propTypes = {
    dispatch: PropTypes.func
  }

  handleSignup = (credentials) => {
    this.props.dispatch(signup(credentials))
  }

  render () {
    return (
      <AuthForm
        buttonLabel='Sign Up'
        buttonStyle='success'
        onSubmit={this.handleSignup}
      />
    )
  }
}

export default connect()(Signup)
