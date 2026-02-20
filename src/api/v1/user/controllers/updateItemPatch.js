
const userService = require("../../../../lib/user");

const updateItemPatch = async (req, res, next) => {

   const { id } = req.params;
  
  // 1. making payload of allowed fields only
  const allowedUpdates = ['name', 'username', 'email', 'password', 'status', 'role'];
  const updatePayload = {};

  allowedUpdates.forEach(field =>{
    if(req.body[field] !== 'undefined'){
      updatePayload[field] = req.body[field];
    }
  })

  // 2. Check if the user actually sent any valid fields
  if (Object.keys(updatePayload).length === 0) {
  

    throw badRequest("No valid update fields provided")
  }
  
  try {

    const user = await userService.updateProperties(id, updatePayload)

    // response
    const url = req.baseUrl + req.path
    const response = {
      code: 200,
      message: "successfully updated",
      data: user,
      links: {
        self: url,
      },
    };

    

    res.status(200).json(response);
    
  } catch (error) {

    next(error)
  }


}

module.exports = updateItemPatch