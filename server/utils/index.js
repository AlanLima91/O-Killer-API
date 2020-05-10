var jwtDecode = require('jwt-decode')

const getUserBearer = (req) => {
  if (req.header('authorization') === undefined) {
    return { id: undefined }
  }

  return jwtDecode(req.header('authorization'))
}

module.exports = { getUserBearer }
