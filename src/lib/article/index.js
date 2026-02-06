const { Article } = require("../../model");

const findAll =  ({
  page = 1,
  limit = 10,
  sortType = "dsc",
  sortBy = "updatedAt",
  searchQuery = "",
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

module.exports = {
  findAll,
  countDocuments,
  create
};
