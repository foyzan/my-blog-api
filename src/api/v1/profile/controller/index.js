const deleteItem = require("./removeItem");
const findSingle = require("./findSingle");
const updateItemPatch = require("./updateItemPatch");
const usersProfile = require("./usersProfile");
const findAllComments = require("./findAllComments");
const findAllArticles = require("./findAllArticles");
const removeItem = require("./removeItem");





module.exports = {
    usersProfile,
    updateItemPatch,
    deleteItem,
    findSingle,
    findAllComments,
    findAllArticles,
    removeItem
}