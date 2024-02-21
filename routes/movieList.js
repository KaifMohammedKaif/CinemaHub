const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const movieController = require("../controllers/movieController.js");

// Top rated route
router.get("/", movieController.topRated);

// Search Movie route
router.post("/", wrapAsync(movieController.search));

// Movie Details route
router.get("/:id", wrapAsync(movieController.movieDetail));

module.exports = router;
