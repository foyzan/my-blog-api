const router = require("express").Router();
const {controllers: articleController} = require('../api/v1/article')
const {controllers: authController} = require('../api/v1/authentication')
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
.post(articleController.create);

router.route("/articles/:id")
.get(articleController.findSingleItem)
.put(articleController.updateItem)
.patch(articleController.updateItemPatch)
.delete(articleController.removeItem)

module.exports = router;
