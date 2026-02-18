const commentService = require("../../../../lib/comment");

const findSingle = async (req, res, next) => {
  const id = req.params.id;

  try {
    const comment = await commentService.findSingleItem({ id });

    // response
    const url = req.baseUrl + req.path
    const response = {
      message: "successful",
      data: comment,
      links: {
        self: url,
        author:   `${req.baseUrl}/profile/${comment.author._id}`,
        article: `${req.baseUrl}/articles/${comment.article}`,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingle;
