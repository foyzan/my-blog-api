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

    const response = {
      message: "comment created",
      data: comment,
      links: {
        self: `/comments/${comment._id}`,
        author: `/profile/${comment.author}`,
      },
    };

    res.status(201).json(response)
    
  } catch (error) {
    next(error);
  }
};

module.exports = commentsOnArticle;
