const articleService = require("../../../../lib/article");

const findAuthor = async (req, res, next) => {
  const article = req.params.id; // article id
  

  try {
    // result
    const author = await articleService.findAuthor({ id : article });

    // response structure
    const url = req.baseUrl + req.path;

    const response = {
      message: "successful",
      code: 200,
      data: author,
      links: {
        self: url,
        article: `${req.baseUrl}/articles/${article}`,
      },
    };


    res.status(200).json(response)

  } catch (error) {
    next(error);
  }
};

module.exports = findAuthor;
