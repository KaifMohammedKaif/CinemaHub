const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const reviewController = require("../controllers/reviewController.js");
const router = express.Router();

// Add Review route
router.post("/:id/reviews", wrapAsync(reviewController.add));

// Delete Review route
router.delete("/:id/reviews/:reviewId", wrapAsync(reviewController.destroy));

module.exports = router;
