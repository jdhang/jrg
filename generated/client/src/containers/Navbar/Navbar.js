'use strict'

import React, { Component, PropTypes } from 'react'
import { IndexLink, Link } from 'react-router'
import { push } from 'react-router-redux'
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'
import { logout } from '../../redux/modules/auth'
import Logo from '../../shared/Logo'
import './_Navbar'

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: 'about' },
  { label: 'Documentation', path: 'docs' },
  { label: 'Members Only', path: 'membersOnly', auth: true }
]

class NavBar extends Component {
  constructor (props) {
    super(props)

    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout () {
    const {dispatch} = this.props

    dispatch(logout()).then(() => dispatch(push('/login')))
  }

  render () {
    const {user, dispatch} = this.props

    return (
      <Navbar inverse staticTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Logo width={40} />
          </Navbar.Brand>
        </Navbar.Header>
        {this.renderNavItems()}
        {this.renderAuthNavItems()}
      </Navbar>
    )
  }

  renderNavItems () {
    const {user} = this.props

    return (
      <Nav>
      {
        NAV_ITEMS.map((item, i) => {
          if (item.label === 'Home') {
            return (
              <IndexLinkContainer to={item.path} key={i}>
                <NavItem eventKey={i}>
                  {item.label}
                </NavItem>
              </IndexLinkContainer>
            )
          } else if (user || !item.auth) {
            return (
              <LinkContainer to={item.path} key={i}>
                <NavItem eventKey={i}>
                  {item.label}
                </NavItem>
              </LinkContainer>
            )
          }
        })
      }
      </Nav>
    )
  }

  renderAuthNavItems () {
    const {user} = this.props

    if (user) {
      return (
        <Nav pullRight>
          <NavItem eventKey={NAV_ITEMS.length} onClick={this.handleLogout}>
            Logout
          </NavItem>
        </Nav>
      )
    } else {
      return (
        <Nav pullRight>
          <LinkContainer to='signup'>
            <NavItem>Sign Up</NavItem>
          </LinkContainer>
          <LinkContainer to='login'>
            <NavItem>Login</NavItem>
          </LinkContainer>
        </Nav>
      )
    }
  }
}

NavBar.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func
}

export default NavBar
