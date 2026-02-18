const commentService = require("../../../../lib/comment");


const updateItemPatch = async (req, res, next) => {
  const id = req.params.id;

  // 1. destructuring the properties given by user for update 
  const allowedUpdates = ["body", "status"];
  const payload = {};
  allowedUpdates.forEach((field) => {
    if (req.body[field] !== "undefined") {
      payload[field] = req.body[field];
    }
  });

  // 2. Check if the user actually sent any valid fields
  if (Object.keys(payload).length === 0) {
    throw badRequest("No valid update fields provided");
  }

  try {
    const comment = await commentService.updateProperties(id, payload);

    // response

    const url = req.baseUrl + req.path
    const response = {
      message: "successful",
      data: comment,
      links: {
        self: url,
        author:   `${req.baseUrl}/profile/${comment.author}`,
        article: `${req.baseUrl}/articles/${comment.article}`,
      },
    };

    res.status(200).json(response)
  } catch (error) {
    next(error);
  }
};

module.exports = updateItemPatch;
