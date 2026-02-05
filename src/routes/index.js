const router = require("express").Router();
const {controllers: articleController} = require('../api/v1/article')
const test = (req, res) => {
  res.status(200).json({
    message: "Request Successful",
    url: req.url,
  });
};

router.route("/articles")
.get(articleController.findAll)
.post(articleController.create);

router.route("/articles/:id")
.get(test)
.post(test)
.put(test)
.patch(test)
.delete(test)

module.exports = router;
