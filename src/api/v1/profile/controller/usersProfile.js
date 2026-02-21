const profileService = require("../../../../lib/profile");

const usersProfile = async (req, res, next) => {
  const id = req.user._id;

  try {
    const profile = await profileService.findOwnProfile({id});

    
    // response

    const url = req.baseUrl + req.path;
    const response = {
      code: 200,
      message: "successful",
      data: profile,
      links: {
        self:  url,
        author: `${url}/author`,
        comment: `${url}/comment`,
      },
    };

    res.status(200).json(response)
  } catch (error) {
    next(error);
  }
};

module.exports = usersProfile;
