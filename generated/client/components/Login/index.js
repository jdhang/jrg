'use strict'

import React, { Component } from 'react'
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Button,
  Row,
  Col
} from 'react-bootstrap'

export default class Login extends Component {

  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  getValidationState = () => {
    const length = this.state.email.length
    if (length > 10) return 'success'
    else if (length > 5) return 'warning'
    else if (length > 0) return 'error'
  }

  handleChange = (e, field) => {
    const newState = {...this.state}
    newState[field] = e.target.value
    this.setState(newState)
  }

  render () {
    return (
      <Row>
        <Col xs={4} xsOffset={4}>
          <form>
            <FormGroup
              controlId="emailText"
              validationState={this.getValidationState()}
            >
              <ControlLabel>Email</ControlLabel>
              <FormControl
                type='text'
                value={this.state.value}
                placeholder='Enter Email'
                onChange={e => this.handleChange(e, 'email')}
              />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup
              controlId="passwordText"
            >
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type='password'
                value={this.state.password}
                placeholder='Password'
                onChange={e => this.handleChange(e, 'password')}
              />
            </FormGroup>
            <Button>Submit</Button>
          </form>
        </Col>
      </Row>
    )
  }
}
