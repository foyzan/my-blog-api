const articleService = require("../../../../lib/article");

const create = async (req, res, next) => {
  const { title, body, cover, status } = req.body;
  try {
    const article = await articleService.create({
      title,
      body,
      cover,
      status,
      author,
    });

    const response = {
      code: 201,
      message: "article created",
      data: {...article._doc},
      links: {
        self:  `/article/${article._id}`,
        author: `/article/${article._id}/author`,
        comment: `/article/${article._id}/comment`,
      },
    };
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
