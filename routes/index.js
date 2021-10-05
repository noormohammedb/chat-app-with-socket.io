const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "chat app with socket io" });
});
router.use("*", (req, res, next) => {
  console.log("redirected to /");
  res.redirect("/");
});

module.exports = router;
