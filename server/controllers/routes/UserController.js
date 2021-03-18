const User = require('../lib/user')
const authentificate = require('../../middlewares/authentificate');

module.exports = function (app) {
  // POST /register
  app.post('/register', User.addUser)

  // GET /users
  app.get('/users', authentificate, User.getUsers)

  // GET /user/id
  app.get('/users/:id', authentificate, User.getUser)

  // PATCH /user/id
  app.patch('/users/:id', authentificate, User.patchUser)

  // DELETE /user/id
  app.delete('/users/:id', authentificate, User.deleteUser)

  // LOGIN /login
  app.post('/login', User.login)

  // LOGINJWT
  app.post('/loginjwt', User.loginJWT)
}
