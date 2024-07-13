const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:3001/auth/google/callback`
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('Google profile:', profile);
    return done(null, profile); // Utilisez le profil pour créer ou trouver un utilisateur dans la base de données
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

module.exports = passport;
