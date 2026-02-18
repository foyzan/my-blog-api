const commentService = require("../../../../lib/comment");
const create = async (req, res, next) => {
  const article = req.body.article;
  const author = req.user._id;
  const body = req.body.body;

  try {
    const comment = await commentService.create({ article, body, author });

    // response

    const url = req.baseUrl + req.path;



    const response = {
      message: "comment created",
      data: comment,
      links: {
        self: url,
        author: `${url}/01/author`,
        comment: `${url}/01/comment`,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
