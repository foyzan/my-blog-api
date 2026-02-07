
const defaults = require("../../../../config/defaults");
const articleService = require("../../../../lib/article");
const { getPagination, getHateOASForAll } = require("../../../../utils/");






const findAll = async (req, res, next) => {
  const page = Number(req.query.page) || defaults.page;
  const limit = Number(req.query.limit) || defaults.limit;
  const sortType = req.query.sort_type || defaults.sortType;
  const sortBy = req.query.sort_by || defaults.sortBy;
  const searchQuery = req.query.search || defaults.searchQuery;

  try {

    // result
    const articles = await articleService.findAll({
      page,
      limit,
      sortType,
      sortBy,
      searchQuery,
    });

    

    // response

    //data
    const data = articles.map(article => {
      return {...article,
        link: `/article/${article._id}` 
      }
    })

    //pagination
    const totalItems = await articleService.countDocuments({searchQuery});
    const pagination = getPagination({page, limit, totalItems});

    // HATOAS 
    const url = req.baseUrl + req.path;
    const links =  getHateOASForAll({url: url, query: req.query, page: page, hasNext: pagination.next, hasPrev: pagination.prev})
  
    

    res.status(200).json({
      data,
      pagination,
      links

    });


   
  } catch (error) {
    next(error);
  }
};

module.exports = findAll;
