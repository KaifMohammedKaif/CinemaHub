require("dotenv").config();
const Review = require("../models/review.js");
const { topRated } = require("../temp/data");
const omdbUrl = process.env.OMDB_URL;
const apikey = process.env.OMDB_API_KEY;

// Top-rated Movie Controller
module.exports.topRated = (req, res) => {
  res.render("listings/topRated", { topRated });
};

// Movie Search Controller
module.exports.search = async (req, res) => {
  let { movieSearch } = req.body;
  async function searchMovie() {
    let result = await fetch(
      omdbUrl + "s=" + movieSearch + "&apikey=" + apikey
    );
    let data = await result.json();
    let movieData = data.Search;
    res.render("listings/search", { movieData });
  }
  await searchMovie();
};

// Movie Details Controller
module.exports.movieDetail = async (req, res) => {
  let { id } = req.params;
  await showMovie();
  async function showMovie() {
    let result = await fetch(omdbUrl + "i=" + id + "&apikey=" + apikey);
    let movie = await result.json();
    const movieReview = await Review.find({ movieId: movie.imdbID }).populate(
      "author"
    );
    res.render("listings/show", { movie, movieReview });
  }
};
