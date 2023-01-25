import passport from 'passport';
import GoogleStr from 'passport-google-oauth2';
import db from "../../models";
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';

const User = db.users;

const GoogleStrategy = GoogleStr.Strategy;
let localStrategy = passportLocal.Strategy;

const GOOGLE_CLIENT_ID = '770377968946-6qlpk50ft5gf27k3cq1f23hij0r3500v.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

const loadauth = () => {

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/v1/users/auth/callback",
    passReqToCallback: true
  },

  function(request, accessToken, refreshToken, profile, done) {
      try{
        User.create({
          email: profile.emails[0].value
        });
      }catch(err){
        console.log(err);
      };
    return done(null, profile);
  // }
    // });
  }
));

passport.serializeUser((user , done) => {
    done(null , user);
})
passport.deserializeUser(function(user, done) {
    done(null, user);
});


passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const data = {
              email,
              password,
            };
        const user = User.create(data);
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

}
export default loadauth;