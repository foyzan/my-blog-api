
const articleService = require("../../../../lib/article");
const findSingleItem = async (req, res, next) => {
    
    const id = req.params.id
    const expend = req.query.expend || ""

    try {
        
        const article = await articleService.findSingleItem({id : id, expend : expend});
        article.links = {
        self:  `/article/${id}`,
        author: `/article/${id}/author`,
        comment: `/article/${id}/comment`,
      }

      // response
      res.json(article)
    } catch (error) {
        next(error)
    }
}

module.exports = findSingleItem