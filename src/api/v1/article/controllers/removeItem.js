const articleService = require("../../../../lib/article");

const removeItem = async (req, res, next)=>{
    const {id} = req.params

    try {
        
        const article = await articleService.removeItem(id);

        

        res.status(204).end()

    } catch (error) {
        next(error)
    }

}


module.exports = removeItem