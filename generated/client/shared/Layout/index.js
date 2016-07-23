'use strict'

import React from 'react'
import Navbar from '../../components/Navbar'

require('./layout')

const Layout = (props) => {
  return (
    <div>
      <Navbar />
      <div id='main' className='container'>
        {props.children}
      </div>
    </div>
  )
}

export default Layout
