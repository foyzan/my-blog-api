const { Article } = require("../../model");

const findAll = async ({
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

  const articles = Article.find(filter)
    .sort(sortOptions)
    .skip((Number(page) - 1) * limit)
    .limit(Number(limit));

  return articles;
};

const create = async ({
  title,
  body = "",
  cover = "",
  status = "draft",
  author,
}) => {

  if(!title || !author){
    const error = new Error('invalid parameters');
    error.status = 400
    throw error
  }

  const article = new Article({title, body, cover, status, author})

  const savedArticle = await article.save()

  return savedArticle
};

module.exports = {
  findAll,
};
