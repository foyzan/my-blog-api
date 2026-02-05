const {Schema, model} = require('mongoose');

const commentSchema = new Schema({
    body: String,
    status: {type: String, enum: ['public', 'private']},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    article: {type: Schema.Types.ObjectId, ref: 'Article'}
}, {timestamps: true})


const Comment = model('Comment', commentSchema);

module.exports = Comment