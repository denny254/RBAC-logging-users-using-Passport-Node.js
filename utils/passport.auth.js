const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');


passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (username, password, done) => {
        try {
            const user = await user.findOne({ email });
            //username/email does Not exist
            if(!user){
                return done(null, false, {message: 'username/email not registered'});
            }
        } catch (error) {
            done(error);
        }
    })
)