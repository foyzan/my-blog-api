const defaults = require("../../../../config/defaults");
const commentService = require("../../../../lib/comment");
const { getPagination, getHateOASForAll } = require("../../../../utils/");

const findAll = async (req, res, next) => {
  const page = Number(req.query.page) || defaults.page;
  const limit = Number(req.query.limit) || defaults.limit;
  const sortType = req.query.sort_type || defaults.sortType;
  const sortBy = req.query.sort_by || defaults.sortBy;
  const searchQuery = req.query.search || defaults.searchQuery;

  try {
    // comments
    const comments = await commentService.findAll({
      page,
      limit,
      sortType,
      sortBy,
      searchQuery,
    });

    //data
    const data = comments.map((comment) => {
      return { ...comment, link: `/comments/${comment._id}` };
    });

    //pagination
    const totalItems = await commentService.countDocuments({ searchQuery });
    const pagination = getPagination({ page, limit, totalItems });

    // HATOAS
    const url = req.baseUrl + req.path;
    const links = getHateOASForAll({
      url: url,
      query: req.query,
      page: page,
      hasNext: pagination.next,
      hasPrev: pagination.prev,
    });

    res.status(200).json({
      data,
      pagination,
      links,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = findAll;
