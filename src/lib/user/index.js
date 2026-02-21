const { User, Comment, Article } = require("../../model");
const defaults = require("../../config/defaults");
const mongoose = require("mongoose");
const { notFound, badRequest } = require("../../utils/error");
const { generateHash } = require("../../utils/hashing");

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

  return User.find(filter) // 1. Initial Query
    .select("-__v") // 2. Field Selection
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

  return User.countDocuments(filter);
};

const findSingleItem = async ({ id, expend = "" }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw badRequest("invalid id");
  }

  const user = await User.findById(id).select("-__v");

  if (!user) {
    throw notFound("Resource not found");
  }

  if (expend === "article") {
    const articles = await Article.find({ author: id }) // user is author in comment
      .populate("author", "name")
      .select("-__v")
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    return { user: { ...user._doc }, articles };
  }

  if (expend === "comment") {
    const comments = await Comment.find({ author: id }) // user is author in comment
      .populate("author", "name")
      .select("-__v")
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    return { user: { ...user._doc }, comments };
  }

  return { user: { ...user._doc } };
};

const findUserByEmail = async ({ email }) => {
  const user = await User.findOne({ email });

  return user ? user : false;
};

const userExist = async ({ email }) => {
  const user = await findUserByEmail({ email });

  return user ? true : false;
};

const create = async ({ name, username, email, password }) => {
  console.log({ name, username, email, password });
  const user = new User({ name, username, email, password });
  await user.save();
  return { ...user._doc, id: user._id };
};

const updateProperties = async (id, payload) => {


  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw badRequest("invalid id");
  }

  const user = await User.findOneAndUpdate(
    { _id: id },
    { $set: payload },
    { new: true, runValidators: true },
  ).lean();

  if (!user) {
    throw notFound("Resource not found");
  }

  // 2. Return the formatted object.
  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    username: user.username,
    role: user.role,
    status: user.status,
    CreatedAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};




const updateOrCreate = async (id, { name, username, email, password, status = "pending", role = "user" }) => {
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw badRequest("invalid id");
  }

  // 1. Manually hash the password (PUT bypasses Mongoose hooks)
  
  const hashedPassword = await generateHash(password)

  const payload = { name, username, email, password: hashedPassword, status, role };

  // 2. Use findOneAndReplace for true PUT behavior
  const result = await User.findOneAndReplace(
    { _id: id }, 
    payload, 
    {
      new: true,           // Return the document AFTER replacement
      upsert: true,        // Create it if it doesn't exist
      runValidators: true, 
      includeResultMetadata: true 
    }
  ).lean();

  // 3. Determine if it was an update or a fresh creation
  const isUpdate = result.lastErrorObject?.updatedExisting;

  return {
    user: result.value,
    statusCode: isUpdate ? 200 : 201,
  };
};

const removeItem = async (id) => {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw badRequest("invalid id");
  }
  const user = await User.findById(id);

  if (!user) {
    throw notFound();
  }

 
  await Comment.deleteMany({ author: id });
  await Article.deleteMany({ author: id });

  return await user.deleteOne();
  
};

// find all comments of an particular user

const findAllComments = async ({
  author, // User ID
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  searchQuery = defaults.searchQuery,
}) => {


  // 1. Validation: Ensure 'author' is a valid MongoDB ObjectId
 
  if (!mongoose.Types.ObjectId.isValid(author)) {
    throw badRequest("Invalid User ID format");
  }

  // 2. Existence Check
  const hasUser = await User.findById(author).lean(); // Use .lean() here too for speed
  if (!hasUser) {
    throw notFound("User not found");
  }

  // 3. Build Filter
  const filter = { author };
  if (searchQuery) {
    // Matching your Schema field 'body'
    filter.body = { $regex: searchQuery, $options: "i" };
  }

  const sortOrder = sortType === "dsc" ? -1 : 1;
  const sortOptions = { [sortBy]: sortOrder };

  // 4. Execute Query
  return Comment.find(filter)
    .select("-__v")
    .populate({
      path: "author",
      select: "name",
    })
    .sort(sortOptions)
    .skip((Number(page) - 1) * limit)
    .limit(Number(limit))
    .lean();
};

const countUserComments = ({ author, searchQuery = "" }) => {
  // 1. Filter by the specific author ID
  const filter = { author };

  // 2. Target the 'body' field to match your Schema
  if (searchQuery) {
    filter.body = { $regex: searchQuery, $options: "i" };
  }

  // 3. Efficiently count matching documents
  return Comment.countDocuments(filter);
};

// find all articles of an particular user

const findAllArticles = async ({
  author, // User ID
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  searchQuery = defaults.searchQuery,
}) => {
  // 1. Validation: Ensure 'author' is a valid MongoDB ObjectId
  // This prevents Mongoose from throwing a 'CastError' before the query even runs
  if (!mongoose.Types.ObjectId.isValid(author)) {
    throw badRequest("Invalid User ID format");
  }

  // 2. Existence Check
  const hasUser = await User.findById(author).lean(); // Use .lean() here too for speed
  if (!hasUser) {
    throw notFound("User not found");
  }

  // 3. Build Filter
  const filter = { author };
  if (searchQuery) {
    // Matching your Schema field 'body'
    filter.title = { $regex: searchQuery, $options: "i" };
  }

  const sortOrder = sortType === "dsc" ? -1 : 1;
  const sortOptions = { [sortBy]: sortOrder };

  // 4. Execute Query
  return Article.find(filter)
    .select("-__v")
    .populate({
      path: "author",
      select: "name",
    })
    .sort(sortOptions)
    .skip((Number(page) - 1) * limit)
    .limit(Number(limit))
    .lean();
};

const countUserArticles = ({ author, searchQuery = "" }) => {
  // 1. Filter by the specific author ID
  const filter = { author };

  // 2. Target the 'body' field to match your Schema
  if (searchQuery) {
    filter.body = { $regex: searchQuery, $options: "i" };
  }

  // 3. Efficiently count matching documents
  return Article.countDocuments(filter);
};

module.exports = {
  userExist,
  create,
  findUserByEmail,
  findAll,
  countDocuments,
  findSingleItem,
  updateProperties,
  updateOrCreate,
  removeItem,
  findAllComments,
  countUserComments,
  findAllArticles,
  countUserArticles,
};
