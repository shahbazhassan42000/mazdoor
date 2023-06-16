import passport from "passport";
import passport_local from "passport-local";
import mongoose from "mongoose";

const User = mongoose.model('users');
const LocalStrategy = passport_local.Strategy;


passport.use(new LocalStrategy({
    usernameField: 'user[username]',
    passwordField: 'user[password]'
}, function (username, password, done) {
    User.findOne({username: username}).then(function (user) {
        if (!user || !user.validatePassword(password)) {
            return done(null, false, {error: 'invalid username and/or password, please try again'});
        }

        return done(null, user);
    }).catch(done);
}));

