const { User, Comment, Article } = require("../../model");
const defaults = require("../../config/defaults");
const mongoose = require("mongoose");
const { notFound, badRequest } = require("../../utils/error");
const { generateHash } = require("../../utils/hashing");



const findOwnProfile = async ({id}) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw badRequest("invalid id");
  }

  const user = await User.findById(id).select("-__v");

  if (!user) {
    throw notFound("Resource not found");
  }

  
    const articles = await Article.find({ author: id }) // user is author in comment
      .populate("author", "name")
      .select("-__v")
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

  

 
    const comments = await Comment.find({ author: id }) // user is author in comment
      .populate("author", "name")
      .select("-__v")
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    return { user: { ...user._doc }, comments, articles };
};


const findSingleItem = async ({id}) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw badRequest("invalid id");
  }

  const user = await User.findById(id).select("-__v");

  if (!user) {
    throw notFound("Resource not found");
  }

  
    const articles = await Article.find({ author: id }) // user is author in comment
      .populate("author", "name")
      .select("-__v")
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

  


    return { user: { ...user._doc }, articles };
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

const removeItem = async (id) => {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw badRequest("invalid id");
  }
  const user = await User.findById(id);

  if (!user) {
    throw notFound();
  }

  // todo: delete all article and comments too

  return await user.deleteOne();
  
};

module.exports = {
    findSingleItem,
    findOwnProfile,
    updateProperties,
    removeItem
}