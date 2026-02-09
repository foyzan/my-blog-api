const { badRequest } = require("../../utils/error");
const { userExist } = require("../user")


const register = ({name, username, email, password}) =>{
    const hasUser = userExist({email});
    if(hasUser){
       throw badRequest('Email is already registered.')
    }

    

    
}


const login = ({email, password}) => {

}

module.exports = {
    register,
    login
}