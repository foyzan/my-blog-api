const commentsOnArticle = require('./commentsOnArticle')
const create = require('./create')
const findAll = require('./findAll')
const findAllComments = require('./findallcomments')
const findAuthor = require('./findAuthor')
const findSingleItem = require('./findSingle')
const removeItem = require('./removeItem')
const updateItem = require('./updateItem')
const updateItemPatch = require('./updateItemPatch')

module.exports = {
    findAll,
    create,
    findSingleItem,
    updateItem,
    updateItemPatch,
    removeItem,
    findAllComments,
    findAuthor,
    commentsOnArticle
}


