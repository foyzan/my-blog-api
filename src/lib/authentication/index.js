const { userExist } = require("../user")


const register = ({name, username, email, password}) =>{
    const hasUser = userExist({email});
    if(email){
       const error = new Error  
    }
}


const login = ({email, password}) => {

}

module.exports = {
    register,
    login
}