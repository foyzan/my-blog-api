const commentService = require("../../../../lib/comment");

const removeItem = async (req, res, next) => {

    const id = req.params.id
    console.log(req.params.id)
    try {

        const comment = await commentService.removeItem(id)

        res.status(204).end()

    } catch (error) {
        next(error)
    }
}

module.exports = removeItem