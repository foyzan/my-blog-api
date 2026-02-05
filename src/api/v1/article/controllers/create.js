const articleService = require('../../../../lib/article')

const create = async (req, res, next)=>{

    const {title, body, cover, status} = req.body
    const author = req.user.id
    try {
        const article = await articleService.create({title, body, cover, status, author})
        res.status(201).json(article)
    } catch (error) {
        next(error)
    }

}

module.exports = create