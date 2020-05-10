const User = require('../lib/user')

module.exports = function (app) {
  // POST /register
  app.post('/register', User.addUser)

  // GET /users
  app.get('/users', User.getUsers)

  // GET /user/id
  app.get('/users/:id', User.getUser)

  // PATCH /user/id
  app.patch('/users/:id', User.patchUser)

  // DELETE /user/id
  app.delete('/users/:id', User.deleteUser)

  // LOGIN /login
  app.post('/login', User.login)

  // LOGINJWT
  app.post('/loginjwt', User.loginJWT)
}
