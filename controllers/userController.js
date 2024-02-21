const User = require("../models/user");
const { topRated } = require("../temp/data.js");
const omdbUrl = process.env.OMDB_URL;
const apikey = process.env.OMDB_API_KEY;

// Add Fav movie Controller
module.exports.addFav = async (req, res) => {
  let { id } = req.params;
  let userFav = await User.findById(id);
  userFav.favoriteMovies.push(req.body);
  await userFav.save();
  res.redirect("/user/" + id + "/");
};

// Add Watched
module.exports.addWatched = async (req, res) => {
  let { id } = req.params;
  let userFav = await User.findById(id);
  userFav.watchedMovies.push(req.body);
  await userFav.save();
  res.redirect("/user/" + id + "/");
};
// View Profile movie Controller
module.exports.viewFav = async (req, res) => {
  let { id } = req.params;
  const movieFav = [];
  const movieWatched = [];
  await showFav();
  async function showFav() {
    let user = await User.findById(id);
    let favMovie = user.favoriteMovies;
    let watchedMovie = user.watchedMovies;
    for (const el of favMovie) {
      let result = await fetch(`${omdbUrl}i=${el.name}&apikey=${apikey}`);
      movieFav.push(await result.json());
    }
    for (const el of watchedMovie) {
      let result = await fetch(`${omdbUrl}i=${el.name}&apikey=${apikey}`);
      movieWatched.push(await result.json());
    }
    res.render("user/profile", { movieFav, movieWatched });
  }
};

// Delete Fav Movie Controller
module.exports.deleteFav = async (req, res) => {
  let { id } = req.params;
  let { name } = req.body;
  await User.updateOne({ _id: id }, { $pull: { favoriteMovies: { name } } });
  res.redirect("/user/" + id + "/");
};
