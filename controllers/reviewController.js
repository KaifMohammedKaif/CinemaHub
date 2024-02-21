const Review = require("../models/review.js");

// Add Review Controller
module.exports.add = async (req, res) => {
  let { id } = req.params;
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  await newReview.save();
  res.redirect("/movie/" + id + "/");
};

// Delete Review Controller
module.exports.destroy = async (req, res) => {
  let { id, reviewId } = req.params;
  await Review.findByIdAndDelete(reviewId);
  res.redirect("/movie/" + id + "/");
};
