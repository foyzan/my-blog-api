const articleService = require("../lib/article");
const commentService = require("../lib/comment");
const { authorizationError } = require("../utils/error");
const ownership = (route) => async (req, _res, next) => {
  if (req.url.role === "admin") {
    return next();
  }
  
  let isOwner = '';

  if (route === "articles") {
      isOwner = await articleService.checkOwnership({
      resourceId: req.params.id,
      userId: req.user._id,
    });
  }

  if(route === "comments" ){
    isOwner = await commentService.checkOwnership({
        resourceId: req.params.id,
        userId: req.user._id
    })
  }

  console.log(isOwner)

  if (!isOwner) {
    return next(authorizationError());
  }

  return next();
};

module.exports = ownership;
