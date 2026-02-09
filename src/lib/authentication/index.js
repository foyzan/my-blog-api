const { badRequest } = require("../../utils/error");
const { generateHash } = require("../../utils/hashing");
const { generateToken } = require("../token");

const userService = require("../user")


const register = async ({name, username, email, password}) =>{
    const hasUser = await userService.userExist({email});
    console.log(hasUser);
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


const login = ({email, password}) => {

}

module.exports = {
    register,
    login
}