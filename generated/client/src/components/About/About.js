'use strict'

import React from 'react'
import { Row, Col, Carousel } from 'react-bootstrap'
import getPics from '../../resources/Pics'
import './_About'

const About = () => {
  return (
    <section id='about'>
      <p>
        This website is built with React/Redux, Express, Sequelize and Node and
        was created from a scaffolding tool inspired by the generator created
        by Fullstack Academy. Here are some random pictures:
      </p>
      <Carousel interval={2000} indicators={false}>
        {
          getPics(20).map((pic, i) => {
            return (
              <Carousel.Item key={i}>
                <img src={pic} />
              </Carousel.Item>
            )
          })
        }
      </Carousel>
    </section>
  )
}

export default About
