const articleService = require('../../../../lib/article')

const findAll = async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const sortType = req.query.sort_type || "dsc";
  const sortBy = req.query.sort_by || "updatedAt";
  const searchQuery = req.query.search || "";

  try {

    const articles = await articleService.findAll({page, limit, sortType, sortBy, searchQuery})

   res.status(200).json(articles)
    

  } catch (error) {
    next(error);
  }
};



module.exports = findAll;
