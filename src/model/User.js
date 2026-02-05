const {Schema, model, models} = require('mongoose')

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    status: {
        type: String,

        // pending, approved, blocked, decline
        enum: ['pending', 'approved', 'blocked', 'decline'],
        default: 'pending'
    }
}, {timestamps: true, id : true})

const User = model('User', userSchema)

module.exports = User;