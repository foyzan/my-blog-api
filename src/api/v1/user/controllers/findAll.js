const defaults = require("../../../../config/defaults");
const userService = require("../../../../lib/user");
const { getPagination, getHateOASForAll } = require("../../../../utils/");

const findAll = async (req, res, next) => {
  const page = Number(req.query.page) || defaults.page;
  const limit = Number(req.query.limit) || defaults.limit;
  const sortType = req.query.sort_type || defaults.sortType;
  const sortBy = req.query.sort_by || defaults.sortBy;
  const searchQuery = req.query.search || defaults.searchQuery;

  try {
    // users
    const users = await userService.findAll({
      page,
      limit,
      sortType,
      sortBy,
      searchQuery,
    });

    //data
    const data = users.map((user) => {
      return { ...user, link: `/users/${user._id}` };
    });

    //pagination
    const totalItems = await userService.countDocuments({ searchQuery });
    const pagination = getPagination({ page, limit, totalItems });

    // H A T O A S
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
