const { badRequest } = require("../../utils/error");
const { generateHash, compareHash } = require("../../utils/hashing");
const { generateToken } = require("../token");

const userService = require("../user")


const register = async ({name, username, email, password}) =>{
    const hasUser = await userService.userExist({email});
    if(hasUser){
       throw badRequest('Email is already registered.')
    }

    const hashedPassword = await generateHash(password);
    

    const user = await userService.create({name, username, email, password: hashedPassword})

    const payload = {
        id : user.id,
        email: user.email,
        name : user.name,
        role: user.name,
    }

    const accessToken = generateToken({payload});

    return accessToken;
    
}


const login = async ({email, password}) => {

    const user = await userService.findUserByEmail({email});
    if(!user){
        throw badRequest('Invalid credential')
    }

    const passwordVerify = await compareHash(password, user.password); 
    if(!passwordVerify){
        throw badRequest('Invalid credential')
    }
     const payload = {
        id : user._id,
        email: user.email,
        name : user.name,
        role: user.name,
    }

    return generateToken({payload})

    

}

module.exports = {
    register,
    login
}