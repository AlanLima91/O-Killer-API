var jwtDecode = require('jwt-decode')

const getUserBearer = (req) => {
  if (req.header('authorization') === undefined) {
    return { id: undefined }
  }

  return jwtDecode(req.header('authorization'))
}
function getRandomString(length) {
  var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for ( var i = 0; i < length; i++ ) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}
module.exports = { getUserBearer, getRandomString }
