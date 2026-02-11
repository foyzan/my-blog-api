const ArticleService = require('../lib/article')
const { authorizationError } = require('../utils/error')
const ownership = async (req, res, next) => {

    
    const isOwner =  await ArticleService.checkOwnership({resourceId : req.params.id, userId: req.user.id})

    if(!isOwner){
        return next(authorizationError())
    }

    return next()
    
}

module.exports = ownership