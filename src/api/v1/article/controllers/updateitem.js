
const articleService = require("../../../../lib/article");

const updateItem = async (req, res, next) => {
  const { id } = req.params;
  const cover = req.body.cover || "";
  const status = req.body.status || "draft";

  try {
    const { article, statusCode } = await articleService.updateOrCreate(id, {
      title: req.body.title,
      body: req.body.body,
      author: req.user.id,
      cover,
      status,
    });

    const response = {
      code: statusCode,
      message: statusCode === 201 ? "Article successfully created" : "Article successfully updated",
      data: article,
      links: {
        self: req.originalUrl,
      },
    };

    

    res.status(statusCode).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = updateItem;
