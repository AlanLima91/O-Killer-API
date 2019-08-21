const User  = require('../lib/user');

module.exports = function (app) {
    
    // POST /user
    app.post('/user', User.addUser)

    // GET /users
    app.get('/users', User.getUsers)

    // GET /user/id
    app.get('/user/:id', User.getUser)

    // PATCH /user/id
    app.patch('/user/:id', User.patchUser)

    // DELETE /user/id
    app.delete('/user/:id', User.deleteUser)

    // LOGIN /login
    app.get('/login', User.getLogin)
}
