const profileService = require("../../../../lib/profile");
const removeItem = async (req, res, next) => {
  const id = req.user._id

  try {
    const profile = await profileService.removeItem(id);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = removeItem;
