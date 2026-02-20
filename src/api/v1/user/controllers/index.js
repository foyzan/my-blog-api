const create = require("./create");
const findAll = require("./findAll");
const findAllArticles = require("./findAllArticles");
const findAllComments = require("./findAllComments");
const findSingle = require("./findSingle");
const removeItem = require("./removeItem");
const updateItem = require("./updateItem");
const updateItemPatch = require("./updateItemPatch");





module.exports = {
    create,
    findAll,
    findSingle,
    findAllArticles,
    findAllComments,
    updateItem,
    updateItemPatch,
    removeItem

    
}