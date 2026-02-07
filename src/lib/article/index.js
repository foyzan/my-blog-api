const defaults = require("../../config/defaults");
const { Article, Comment } = require("../../model");


const findAll = ({
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

  return Article.find(filter) // 1. Initial Query
    .select("-__v") // 2. Field Selection
    .populate({
      // 3. Joins/Transforms
      path: "author",
      select: "name",
    })
    .lean() // 4. Performance Optimization
    .sort(sortOptions) // 5. Ordering
    .skip((Number(page) - 1) * limit) // 6. Pagination Skip
    .limit(Number(limit));
};

const countDocuments = ({ searchQuery = "" }) => {
  const filter = {};
  if (searchQuery) {
    filter.title = { $regex: searchQuery, $options: "i" };
  }

  return Article.countDocuments(filter);
};

const create = ({ title, body = "", cover = "", status = "draft", author }) => {
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

  const article = await Article.findById(id);
  if (!article) {
    const error = new Error("Resource not found");
    error.status = 404;
    throw error;
  }

  if (expend === "author") {
    await article.populate({ path: "author", select: "name" });
  }

  if (expend === "comment") {
    const comments = await Comment.find({ article: id })
      .populate("author", "name")
      .lean();

    return { ...article._doc, comments };
  }

  return { ...article._doc };
};

const updateOrCreate = async (
  id,
  { title, body, author, cover = "", status = "draft" },
) => {

  const payload = {
    title,
    body,
    author,
    cover,
    status
  }
  const article = await Article.findOneAndUpdate(
      { _id: id },                 // 1. Filter: Find by this ID
      { $set: payload },           // 2. Data: What to put in the document
      { 
        new: true,                 // Return the updated/new document
        upsert: true,              // Create it if it doesn't exist
        runValidators: true,       // Ensure schema rules are followed
        setDefaultsOnInsert: true, // Apply default values if creating new
        includeResultMetadata: true
      }
    ).lean()

    // 3. Determine HTTP Code based on MongoDB metadata
  const isUpdate = article.lastErrorObject.updatedExisting;
  
  return {
    article: article.value, // The actual article data
    statusCode: isUpdate ? 200 : 201
  };
  

};

module.exports = {
  findAll,
  countDocuments,
  create,
  findSingleItem,
  updateOrCreate,
};
