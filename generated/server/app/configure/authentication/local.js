'use strict'

import passport from 'passport'

const LocalStrategy = require('passport-local').Strategy

module.exports = function (app, db) {

  const User = db.model('user')

  // When passport.authenticate('local') is used, this function will receive
  // the email and password to run the actual authentication logic.
  const strategyFn = (email, password, done) => {
    User.findOne({
      where: {
        email: email
      }
    })
    .then(user => {
      if (!user || !user.correctPassword(password)) {
        done(null, false)
      } else {
        // Properly authenticated
        done(null, user)
      }
    })
    .catch(done)
  }

  passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, strategyFn))

  // A POST /signup route to create a new user
  app.post('/signup', (req, res, next) => {
    User.create(req.body)
    .then(user => {
      req.login(user, signupErr => {
        if (signupErr) return next(signupErr)
        // We respond the same way /login does
        res.status(201).send({
          user: user.sanitize()
        })
      })
    })
    .catch(next)
  })

  // A POST /login route is created to handle login
  app.post('/login', (req, res, next) => {

    const authCb = (err, user) => {

      if (err) return next(err)

      if (!user) {
        const error = new Error('Invalid login credentials.')
        error.status = 401
        return next(error)
      }

      // req.login will establish our session
      req.login(user, loginErr => {
        if (loginErr) return next(loginErr)
        // We respond with a response object that has user with id and email
        res.status(200).send({
          user: user.sanitize()
        })
      })
    }

    passport.authenticate('local', authCb)(req, res, next)

  })
}
