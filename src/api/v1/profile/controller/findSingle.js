const profileService = require("../../../../lib/profile");
const findSingle = async (req, res, next) => {
  const id = req.params.id;

  try {
    const profile = await profileService.findSingleItem({ id });

    //response

    const url = req.baseUrl + req.path;
    const response = {
      code: 200,
      message: "successful",
      data: profile,
      links: {
        self:  url,
        register: `${req.baseUrl}/auth/register`,
        login: `${req.baseUrl}/auth/login`,
      },
    };

    res.status(200).json(response)
  } catch (error) {
    next(error);
  }
};

module.exports = findSingle;
