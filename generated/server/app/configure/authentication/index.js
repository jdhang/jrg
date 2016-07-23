'use strict'

import path from 'path'
import session from 'express-session'
import passport from 'passport'

const SequelizeStore = require('connect-session-sequelize')(session.Store)

const ENABLED_AUTH_STRATEGIES = [
  'local',
  // 'twitter',
  // 'facebook',
  // 'google',
  // 'github'
]

module.exports = function (app, db) {

  const dbStore = new SequelizeStore({ db })

  const User = db.model('user')

  dbStore.sync()

  // Session middleware will set/read sessions from the request.
  // Sessions will get stored in Postgres using the same connection
  // from Sequelize.
  app.use(session({
    secret: app.getValue('env').SESSION_SECRET,
    store: dbStore,
    resave: false,
    saveUninitialized: false
  }))

  // Initialize passport and also allow it to read
  // the request session information.
  app.use(passport.initialize())
  app.use(passport.session())

  // Get a cookie? it's just the userId (encrypted with our secret).
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // When we get a cookie, we use the id to set req.user
  // to a user found in the database.
  passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => done(null, user))
        .catch(done)
  })

  // Provide simple GET /session to get session information
  // Used by client application (React) to determine if a user
  // is logged in already.
  app.get('/session', (req, res) => {
    if (req.user) {
      res.send({ user: req.user.sanitize() })
    } else {
      res.status(401).send('No authenticated user.')
    }
  })

  // Simple /logout route.
  app.get('/logout', (req, res) => {
    req.logout()
    res.status(200).end()
  })

  // Enabled strategies get registered.
  ENABLED_AUTH_STRATEGIES.forEach(strategyName => {
    require(path.join(__dirname, strategyName))(app, db)
  })

}
