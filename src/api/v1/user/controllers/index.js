const create = require("./create");
const deleteItem = require("./deleteItem");
const findAll = require("./findAll");
const findAllArticles = require("./findAllarticles");
const findAllComments = require("./findAllComments");
const findSingle = require("./findSingle");
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
    deleteItem
}