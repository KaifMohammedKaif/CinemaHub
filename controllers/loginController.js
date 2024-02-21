const User = require("../models/user");

// Render Sign-up form
module.exports.getSignupForm = (req, res) => {
  res.render("user/signup");
};

// Sign-up Controller
module.exports.signup = async (req, res, next) => {
  let { username, email, password } = req.body;
  const newUser = new User({ email, username });
  const registeredUser = await User.register(newUser, password);
  req.login(registeredUser, (err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

// Render Log-in form
module.exports.getLoginForm = (req, res) => {
  res.render("user/login");
};

// Log-in Controller
module.exports.login = async (req, res) => {
  res.redirect("/");
};

// Log-out Controller
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
