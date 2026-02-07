
const defaults = require("../../config/defaults");
const { Article, Comment } = require("../../model");
const { findById } = require("../../model/Article");

const findAll =  ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  searchQuery = defaults.searchQuery,
}) => {
  /**
   * searchQuery available
   */

  const filter = {};
  if (searchQuery) {
    filter.title = { $regex: searchQuery, $options: "i" };
  }

  const sortOrder = sortType === "dsc" ? -1 : 1;
  const sortOptions = { [sortBy]: sortOrder };

  return Article.find(filter)         // 1. Initial Query
  .select('-__v')                                   // 2. Field Selection
  .populate({                                       // 3. Joins/Transforms
    path: 'author',
    select: 'name',
  })
  .lean()                                           // 4. Performance Optimization
  .sort(sortOptions)                                // 5. Ordering
  .skip((Number(page) - 1) * limit)                 // 6. Pagination Skip
  .limit(Number(limit));


 
};


const countDocuments = ({searchQuery = ''})=>{

  const filter = {};
  if (searchQuery) {
    filter.title = { $regex: searchQuery, $options: "i" };
  }

  return Article.countDocuments(filter)
}

const create =  ({
  title,
  body = "",
  cover = "",
  status = "draft",
  author,
}) => {
  if (!title || !author) {
    const error = new Error("invalid parameters");
    error.status = 400;
    throw error;
  }

  const article = new Article({ title, body, cover, status, author });

  return article.save();

  
};

const findSingleItem = async ({ id, expend = "" }) => {
  if (!id) {
    throw new Error("invalid argument");
  }

  
  if (expend === "author") {
    return await Article.findById(id)
      .populate({ path: "author", select: "name" })
      .lean();
  } 


  if (expend === "comment") {
    const article = await Article.findById(id).lean();
    if (!article) return null;

    const comments = await Comment.find({ article: id })
      .populate("author", "name")
      .lean();

    return { ...article, comments };
  }


  return await Article.findById(id).lean();
};

module.exports = {
  findAll,
  countDocuments,
  create,
  findSingleItem
};
