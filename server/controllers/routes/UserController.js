const User  = require('../lib/user');

module.exports = function (app) {
    
    // POST /register
    app.post('/register', User.addUser)

    // GET /users
    app.get('/user/all', User.getUsers)

    // GET /user/id
    app.get('/user/:id', User.getUser)

    // PATCH /user/id
    app.patch('/user/:id', User.patchUser)

    // DELETE /user/id
    app.delete('/user/:id', User.deleteUser)

    // LOGIN /login
    app.post('/login', User.login)
    
    // LOGINJWT
    app.post('/loginjwt', User.loginJWT)
}
