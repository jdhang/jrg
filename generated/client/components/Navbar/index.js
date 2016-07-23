'use strict'

import React, { PropTypes } from 'react'
import { IndexLink, Link } from 'react-router'
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'
import Logo from '../../shared/Logo'

require('./navbar')

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: 'about' },
  { label: 'Documentation', path: 'docs' },
  { label: 'Members Only', path: 'membersOnly', auth: true }
]

const renderNavItems = () => {
  return (
    <Nav>
    {
      NAV_ITEMS.map((item, i) => {
        if (item.label === 'Home') {
          return (
            <IndexLinkContainer to={item.path} key={i}>
              <NavItem>
                {item.label}
              </NavItem>
            </IndexLinkContainer>
          )
        } else if (!item.auth) {
          return (
            <LinkContainer to={item.path} key={i}>
              <NavItem>
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

const renderAuthNavItems = () => {
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

const NavBar = props => {
  return (
    <Navbar inverse staticTop>
      <Navbar.Header>
        <Navbar.Brand>
          <Logo width={40} />
        </Navbar.Brand>
      </Navbar.Header>
      {renderNavItems()}
      {renderAuthNavItems()}
  </Navbar>
  )
}

export default NavBar
