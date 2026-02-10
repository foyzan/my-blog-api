const { verifyToken } = require("../lib/token");
const { authenticationError} = require("../utils/error");
const userService = require('../lib/user')

const authenticate = async (req, res, next) =>{

    const token = req.headers.authorization.split(' ')[1];
    console.log(req.headers)

    try {

        const decodedUser = verifyToken({token});

        const user = await userService.findUserByEmail({email : decodedUser.email})

        if(!user){
            next(authenticationError())
        }

        if(user.status !== 'approved'){
            next(authenticationError(`You account is ${user.status}`))
        }

        req.user = user._doc
        next()
        
    } catch (error) {
        next(authenticationError());
    }
}


module.exports = authenticate