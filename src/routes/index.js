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

// auth routes
router.post('/auth/login', authController.login)
router.post('/auth/register', authController.register)


// articles routes
router.route("/articles")
.get(articleController.findAll)
.post(authenticate,authorize(['user', 'admin']),articleController.create);

router.route("/articles/:id")
.get(articleController.findSingleItem)
.put(authenticate,authorize(['user', 'admin']),ownership,articleController.updateItem)
.patch(authenticate,authorize(['user', 'admin']), ownership,articleController.updateItemPatch)
.delete(authenticate, authorize(["user", 'admin']), ownership,articleController.removeItem)

router.route("/articles/:id/comments")
.get(test)
.post(test)

router.route("/articles/:id/author")
.get(test)


// comments routes

router.route("/comments")
.get(test)
.post(test)

router.route("/comments/:id")
.get(test)
.patch(test)
.delete(test)


// users routes

router.route("/users")
.get(test)
.post(test)

router.route("/users/:id")
.get(test)
.put(test)
.patch(test)
.delete(test)

router.route("/users/:id/articles")
.get(test)

router.route("/users/:id/comments")
.get(test)


// profile routes
router.route("/profile")
.get(test)
.patch(test)
.delete(test)

router.route("/profile/:id")
.get(test)


module.exports = router;
