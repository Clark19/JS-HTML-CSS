const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "id",
      passwordField: "password",
      session: true, // 세션에 저장 여부
      passReqToCallback: true,
    },
    (req, id, password, done) => {
      console.log(id, password);
      if (id == password) {
        done(null, { id: id, name: "" });
      } else {
        done(null, false);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: "255379222636637",
      clientSecret: "563fca3d35db7855c9215d2a6f9f35bc",
      callbackURL: "http://localhost:3000/fblogin/facebook/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      done(null, profile);
    }
  )
);

module.exports = passport;
