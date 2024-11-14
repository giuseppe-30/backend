const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const google = express.Router();
const jwt = require("jsonwebtoken");
const userModel = require("../UsersModels");

google.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

google.use(passport.initialize());
google.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await userModel.findOne({ email: profile._json.email });
        if (!user) {
          const { _json: dataProfile } = profile;
          const googleUser = new userModel({
            name: dataProfile.given_name,
            surname: dataProfile.family_name,
            email: dataProfile.email,
            dob: new Date(),
            password: "khkjgjgjkghjmchjgllo",
            username: `${dataProfile.given_name}_${dataProfile.family_name}`,
          });
          user = await googleUser.save();
        }
        done(null, user);
      } catch (error) {
        console.error(error);
        done(error, null);
      }
    }
  )
);

google.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

google.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const user = req.user;
    const payload = {
      name: user.name,
      surname: user.surname,
      email: user.email,
      _id: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    const redirectUrl = `${
      process.env.FRONTEND_URL
    }/success/${encodeURIComponent(token)}`;

    res.redirect(redirectUrl);
  }
);

module.exports = google;
