const { Comment, Article } = require("../../model");
const defaults = require("../../config/defaults");
const mongoose = require('mongoose');
const { notFound, badRequest } = require("../../utils/error");

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

  return Comment.find(filter) // 1. Initial Query
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

const findSingleItem = async ({ id }) => {
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw badRequest("Invalid comment format");
  }

  
  const comment = await Comment.findById(id)
    .populate("author", "name")
    .lean();

  
  if (!comment) {
    throw notFound("Comment not found");
  }

  return comment;
};

const create = async ({ body, status = "public", author, article}) => {
  if (!mongoose.Types.ObjectId.isValid(article)) {
    throw badRequest("Invalid Article ID format");
  }

  // 2. Existence Check
  const hasArticle = await Article.findById(article).lean(); // Use .lean() here too for speed
  if (!hasArticle) {
    throw notFound("Article not found");
  }

  const comment = await Comment.create({ body, status, article, author });

  return comment._doc;
};

const countDocuments = ({ searchQuery = "" }) => {
  const filter = {};
  if (searchQuery) {
    filter.title = { $regex: searchQuery, $options: "i" };
  }

  return Comment.countDocuments(filter);
};

const updateProperties = async (id, payload) => {

  const comment = await Comment.findOneAndUpdate(
    { _id: id },
    { $set: payload },
    { new: true, runValidators: true },
  ).lean();

  if (!comment) {
    throw notFound("Resource not found");
  }

  // 2. Return the formatted object.
  return {
    id: comment._id.toString(),
    body: comment.body,
    status: comment.status,
    author: comment.author,
    article: comment.article,
    CreatedAt: comment.createdAt, 
    updatedAt: comment.updatedAt,
  };
};

const removeItem = async (id) => {

  console.log(id)
  const comment = await Comment.findById(id);

  if(!comment){
    throw notFound()
  }

  return await comment.deleteOne()

}


const checkOwnership = async ({resourceId, userId}) => {
  
  const comment = await Comment.findById(resourceId).lean()

  if(!comment){
    throw notFound()
  }

  
  return comment.author.toString() === userId.toString();


}






module.exports = {
  findAll,
  create,
  findSingleItem,
  countDocuments,
  updateProperties,
  removeItem,
  checkOwnership
};
