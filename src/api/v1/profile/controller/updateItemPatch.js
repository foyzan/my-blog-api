const profileService = require("../../../../lib/profile");
const updateItemPatch = async (req, res, next) => {
  const id = req.user._id;

  const updatedPayload = {};
  const allowedUpdates = ["email", "name", "username"];

  allowedUpdates.forEach((item) => {
    if (req.body[item] !== "undefined") {
      updatedPayload[item] = req.body[item];
    }
  });

  if (Object.keys(updatedPayload).length === 0) {
    throw badRequest("No valid update fields provided");
  }

  try {

    const profile = await profileService.updateProperties(id, updatedPayload);
  

        // response
        const url = req.baseUrl + req.path
        const response = {
          code: 200,
          message: "successfully updated",
          data: profile,
          links: {
            self: url,
          },
        };
    
        
    
        res.status(200).json(response);

  } catch (error) {}
};

module.exports = updateItemPatch;
