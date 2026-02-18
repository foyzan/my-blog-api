const authService = require("../../../../lib/authentication");

const register = async (req, res, next) => {
  const { name, username, email, password } = req.body;

  try {
    const accessToken = await authService.register({
      name,
      username,
      email,
      password,
    });

    // response
    const url = req.baseUrl + req.path

    const response = {
      code: 201,
      message: "registration successful",
      data: {
        access_token: accessToken,
      },
      links: {
        self: url,
        login: `${req.baseUrl}/auth/login`,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }

  //response
};

module.exports = register;
