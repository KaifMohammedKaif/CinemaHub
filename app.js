require("dotenv").config();
const express = require("express");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const expressError = require("./utils/expressError.js");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const movieListRouter = require("./routes/movieList.js");
const reviewRouter = require("./routes/review.js");
const loginRouter = require("./routes/login.js");
const userRouter = require("./routes/user.js");
const path = require("path");
const app = express();

const { topRated, popular, webSeries } = require("./temp/data.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));

//MONGODB CONNECTION
// const mongodbUrl = "mongodb://127.0.0.1:27017/cinemaHub";
const mongodbUrl = process.env.MONGO_URL;
main()
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongodbUrl);
}

const store = MongoStore.create({
  mongoUrl: mongodbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("Error on mongoStore", err);
});

const sessionOption = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash());

app.use((req, res, next) => {
  res.locals.currUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.get("/", (req, res) => {
  res.render("listings/home", { topRated, popular, webSeries });
});

app.use("/movie", movieListRouter);
app.use("/movie", reviewRouter);
app.use("/", loginRouter);
app.use("/user", userRouter);

app.all("*", (req, res, next) => {
  throw new expressError(404, "Page Not Found");
});

app.use("/", (err, req, res, next) => {
  let { status = 500, message = "somthing went wrong" } = err;
  res.status(status).render("error", { message });
});

app.listen(3000, () => {
  console.log("CinemaHub Started");
});
