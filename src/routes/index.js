const router = require("express").Router();
const {controllers: articleController} = require('../api/v1/article')
const {controllers: commentController} = require('../api/v1/comment')
const {controllers: userController} = require('../api/v1/user')
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
.put(authenticate,authorize(['user', 'admin']),ownership('articles'),articleController.updateItem)
.patch(authenticate,authorize(['user', 'admin']), ownership('articles'),articleController.updateItemPatch)
.delete(authenticate, authorize(["user", 'admin']), ownership('articles'),articleController.removeItem)

router.route("/articles/:id/comments")
.get(articleController.findAllComments)
.post(authenticate,authorize(['user', 'admin']),articleController.commentsOnArticle)

router.route("/articles/:id/author")
.get(articleController.findAuthor)



// comments routes

router.route("/comments")
.get(commentController.findAll)
.post(authenticate,authorize(['user', 'admin']),commentController.create)

router.route("/comments/:id")
.get(commentController.findSingle)
.patch(authenticate, authorize(['user', 'admin']), ownership('comments'), commentController.updateItemPatch)
.delete(authenticate, authorize(['user', 'admin']), ownership('comments'), commentController.removeItem);


// users routes

router.route("/users")
.get(userController.findAll)
.post(authenticate, authorize, userController.create)

router.route("/users/:id")
.get(userController.findSingle)
.put(userController.updateItem)
.patch(userController.updateItemPatch)
.delete(userController.removeItem)

router.route("/users/:id/articles")
.get(userController.findAllArticles)

router.route("/users/:id/comments")
.get(userController.findAllComments)


// profile routes
router.route("/profile")
.get(test)
.patch(test)
.delete(test)

router.route("/profile/:id")
.get(test)


module.exports = router;
