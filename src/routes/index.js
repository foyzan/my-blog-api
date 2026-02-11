const router = require("express").Router();
const {controllers: articleController} = require('../api/v1/article')
const {controllers: authController} = require('../api/v1/authentication');
const authenticate = require("../middleware/authentication");
const authorize = require("../middleware/authorize");
const ownership = require("../middleware/ownership");
const test = (req, res) => {
  res.status(200).json({
    message: "Request Successful",
    url: req.url,
  });
};

router.post('/auth/login', authController.login)
router.post('/auth/register', authController.register)
router.route("/articles")
.get(articleController.findAll)
.post(authenticate,authorize(['user', 'admin']),articleController.create);

router.route("/articles/:id")
.get(articleController.findSingleItem)
.put(authenticate,authorize(['user', 'admin']),ownership,articleController.updateItem)
.patch(authenticate,authorize(['user', 'admin']), ownership,articleController.updateItemPatch)
.delete(authenticate, authorize(["user", 'admin']), ownership,articleController.removeItem)

module.exports = router;
