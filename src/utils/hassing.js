const bcrypt = require('bcryptjs')

const generateHash = async (payload) =>{
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(payload, salt);
}


const compareHash = async (payload, hashPayload)=>{
    const hasMatch = await bcrypt.compare(payload, hashPayload); // true or false

    return hasMatch;
}


module.exports = {
    generateHash,
    compareHash
}