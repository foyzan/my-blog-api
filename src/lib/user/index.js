const {User} = require('../../model')

const findUserByEmail = async ({email}) =>{
    const user = await User.findOne({email});
    
    return user ? user : false;
}

const userExist = async ({email})=>{
    const user = await findUserByEmail({email});

    return user ? true : false;
}

const create = async ({name, username, email, password})=>{
    console.log({name, username, email, password})
    const user = new User({name, username, email, password});
    await user.save()
    return {...user._doc, id: user._id};
}


module.exports = {
    userExist,
    create,
    findUserByEmail
}