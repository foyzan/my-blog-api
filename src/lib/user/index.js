const {User} = require('../../model')

const findUserByEmail = async ({email}) =>{
    const user = await User.findOne({email});
    
    return user ? user : false;
}

const userExist = async ({email})=>{
    const user = await findUserByEmail({email});

    return user ? true : false;
}


module.exports = {
    userExist
}