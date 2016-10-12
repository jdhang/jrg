'use strict'

import React from 'react'
import Logo from '../../shared/Logo'
import getRandomGreeting from '../../resources/RandomGreetings'
import './_Home'

const Home = () => {
  return (
    <div id='home'>
      <Logo />
      <h1>{getRandomGreeting()}</h1>
    </div>
  )
}

export default Home
