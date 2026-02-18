const articleService = require("../../../../lib/article");
const findSingleItem = async (req, res, next) => {
  const id = req.params.id;
  const expand = req.query.expand || "";

  try {
    const { article, comments = null} = await articleService.findSingleItem({
      id: id,
      expend: expand,
    });

    // response

    const url = req.baseUrl + req.path
    const response = {
      data: article,
      comments: comments,
      links: {
        self: url,
        author: `${url}/author`,
        comment: `${url}/comments`,
      },
    };

    if(!comments){
        delete response.comments
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingleItem;
