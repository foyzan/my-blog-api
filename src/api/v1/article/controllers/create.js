const articleService = require("../../../../lib/article");

const create = async (req, res, next) => {
  const { title, body, cover, status } = req.body;
  const author = req.user._id
  try {
    const article = await articleService.create({
      title,
      body,
      cover,
      status,
      author,
    });

    // response
    const url = req.baseUrl + req.path;

    const response = {
      code: 201,
      message: "article created",
      data: {...article._doc},
      links: {
        self:  url,
        author: `${url}/${article._id}/author`,
        comment: `${url}/${article._id}/comment`,
      },
    };
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
