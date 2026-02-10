const defaults = require("../../config/defaults");
const { Article, Comment } = require("../../model");
const { badRequest, notFound } = require("../../utils/error");

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
   
    throw badRequest("invalid parameters");
  }

  const article = new Article({ title, body, cover, status, author });

  return article.save();
};




const findSingleItem = async ({ id, expend = "" }) => {
  if (!id) {
  
    throw badRequest("invalid argument")
  }

  const article = await Article.findById(id);
  if (!article) {
   
    throw notFound("Resource not found");
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
    status,
  };
  const article = await Article.findOneAndUpdate(
    { _id: id }, // 1. Filter: Find by this ID
    { $set: payload }, // 2. Data: What to put in the document
    {
      new: true, // Return the updated/new document
      upsert: true, // Create it if it doesn't exist
      runValidators: true, // Ensure schema rules are followed
      setDefaultsOnInsert: true, // Apply default values if creating new
      includeResultMetadata: true,
    },
  ).lean();

  // 3. Determine HTTP Code based on MongoDB metadata
  const isUpdate = article.lastErrorObject.updatedExisting;

  return {
    article: article.value, // The actual article data
    statusCode: isUpdate ? 200 : 201,
  };
};

const updateProperties = async (id, payload) => {
  // 1. Await the execution (findOneAndUpdate returns a query object, not the doc, if not awaited)
  const article = await Article.findOneAndUpdate(
    { _id: id },
    { $set: payload },
    { new: true, runValidators: true },
  ).lean();

  if (!article) {
    throw notFound("Resource not found");
  }

  // 2. Return the formatted object.
  // Use 'article' (the variable defined above) and return it directly.
  return {
    id: article._id.toString(),
    title: article.title,
    body: article.body,
    cover: article.cover,
    status: article.status,
    CreatedAt: article.createdAt, // Matches your Swagger 'CreatedAt'
    updatedAt: article.updatedAt,
  };
};

const removeItem = async (id) => {
  const article = await Article.findById(id);

  if (!article) {
    
    throw notFound("Resource not found");
  }

  // TODO : clean up comments, cover photo and other related data.

  const deleteArticle = await Article.findByIdAndDelete(id)

  return deleteArticle;


};



module.exports = {
  findAll,
  countDocuments,
  create,
  findSingleItem,
  updateOrCreate,
  updateProperties,
  removeItem
};
