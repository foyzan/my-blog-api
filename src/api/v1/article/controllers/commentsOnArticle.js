const articleService = require("../../../../lib/article");

const commentsOnArticle = async (req, res, next) => {
  const article = req.params.id;
  const author = req.user._id;
  const body = req.body.body;
  try {
    const comment = await articleService.commentsOnArticle({
      body,
      article,
      author,
    });

    const url = req.baseUrl + req.path;
    const response = {
      message: "comment created",
      data: comment,
      links: {
        self: url,
        author: `${req.baseUrl}/profile/${comment.author}`,
      },
    };

    res.status(201).json(response)
    
  } catch (error) {
    next(error);
  }
};

module.exports = commentsOnArticle;
