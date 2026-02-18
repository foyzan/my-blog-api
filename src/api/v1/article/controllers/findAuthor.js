const articleService = require("../../../../lib/article");

const findAuthor = async (req, res, next) => {
  const article = req.params.id; // article id
  

  try {
    // result
    const author = await articleService.findAuthor({ id : article });

    // response structure
    const response = {
      message: "successful",
      code: 200,
      data: author,
      links: {
        self: `/articles/${article}/author`,
        article: `/articles/${article}`,
      },
    };


    res.status(200).json(response)

  } catch (error) {
    next(error);
  }
};

module.exports = findAuthor;
