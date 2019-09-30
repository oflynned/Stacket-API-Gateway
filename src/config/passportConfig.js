import passport from 'passport';
import User from '../models/user/user';

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(async (email, passwordAttempt, done) => {
  console.log(email, passwordAttempt);

  const isPasswordCorrect = await User.doesPasswordMatch(email, passwordAttempt);
  if (isPasswordCorrect) {
    return done(null, await User.findByEmail(email));
  }

  return done(new Error('user_does_not_exist'));
}));

passport.serializeUser((user, done) => {
  console.log(user);
  return done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  console.log(_id);
  const user = await User.findById(_id);
  const error = user === null ? new Error('user_does_not_exist') : null;
  return done(error, user);
});
