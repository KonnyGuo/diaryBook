const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require("../models/User")

module.exports = function(passport){
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    }, async(accessToken, refreshToken, profile, done) => { //profile of user like id, img, name, etc and done is callback
        //create new document of users
        const newUser = {
            googleID: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.familyName,
            lastName: profile.name.givenName,
            image: profile.photos[0].value
        }

        try {
            //double check if user is already in db
            let user = await User.findOne({ googleID: profile.id })
            if(user) {
                //user exists and pass user data out of function
                done(null, user)
            } else {
                user = await User.create (newUser)
                done(null, user)
            }
        } catch (err) {
            console.error(err)
        }


    }))
    //serialize and deserialize basically when passport goes to save user it does not want to save entire user in a way thgat is reversible
    passport.serializeUser(async function(user, done) {
        done(null, user.id); 
    });

    passport.deserializeUser(async function(id, done) {

        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error, null); 
        }

    });
}