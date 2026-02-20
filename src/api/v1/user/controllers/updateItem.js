const userService = require("../../../../lib/user");

const updateItem = async (req, res, next) => {
  const id = req.params.id;
  const status = req.body.status || "pending";
  const role = req.body.role || "user";

  const { name, username, email, password } = req.body;

  try {
    const {user, statusCode} = await userService.updateOrCreate(id, {
      name,
      username,
      email,
      password,
      status,
      role,
    });


    //response
    const url = req.baseUrl + req.path

    const response = {
      code: statusCode,
      message: statusCode === 201 ? "successfully created" : " successfully updated",
      data: user,
      links: {
        self: url,
      },
    };

    

    res.status(statusCode).json(response);

    
  } catch (error) {
    next(error);
  }
};

module.exports = updateItem;
