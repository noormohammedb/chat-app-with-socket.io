// var express = require('express');
import express from "express";
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "chat app with socket io" });
});

// module.exports = router;
export default router;
