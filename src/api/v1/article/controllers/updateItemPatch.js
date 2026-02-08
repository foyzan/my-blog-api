const articleService = require("../../../../lib/article");

const updateItemPatch = async (req, res, next) => {
  const { id } = req.params;
  
  // 1. making payload of allowed fields only
  const allowedUpdates = ['title', 'body', 'cover', 'status'];
  const updatePayload = {};

  allowedUpdates.forEach(field =>{
    if(req.body[field] !== 'undefined'){
      updatePayload[field] = req.body[field];
    }
  })

  // 2. Check if the user actually sent any valid fields
  if (Object.keys(updatePayload).length === 0) {
    const error = new Error("No valid update fields provided")
    error.status = 400
    throw error
  }

  try {
    
    const article = await articleService.updateProperties(id, updatePayload);

    const response = {
      code: 200,
      message: "Article successfully updated",
      data: article,
      links: {
        self: req.originalUrl,
      },
    };

    

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = updateItemPatch;