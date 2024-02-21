const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const userController = require("../controllers/userController.js");

//Add Fav
router.post("/:id/fav", wrapAsync(userController.addFav));

// View Favourites
router.get("/:id", wrapAsync(userController.viewFav));

// Destroy Fav
router.delete("/:id", wrapAsync(userController.deleteFav));

//Add Watched
router.post("/:id/watch", wrapAsync(userController.addWatched));

module.exports = router;
