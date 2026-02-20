const userService = require("../../../../lib/user");

const removeItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    const article = await userService.removeItem(id);

    res.status(204).end();

  } catch (error) {
    next(error);
  }


};

module.exports = removeItem;
