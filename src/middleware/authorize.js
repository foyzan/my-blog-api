const { authorizationError } = require("../utils/error")


const authorize =(role = ['admin']) => (req, _res, next) =>{
  
    if(role.includes(req.user.role)){
        return next()
    }

    return next(authorizationError())
}

module.exports = authorize