const authService = require("../../../../lib/authentication");
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const accessToken = await authService.login({ email, password });


    // response
    const url = req.baseUrl + req.path
    const response = {
      code: 200,
      data: {
        access_token: accessToken
      },
      links: {
        self: url,
        register: `${req.baseUrl}/auth/register`,
      },
    };


    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};

module.exports = login;
