var jwtDecode = require('jwt-decode');

const getUserBearer = (req) => {
    if (req.header('authorization') === undefined) {return {id:undefined};}
    user = jwtDecode(req.header('authorization'));
    return user;
}

module.exports = { getUserBearer };