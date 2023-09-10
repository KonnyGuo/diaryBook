const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require("../models/User")

module.exports = function(passport){
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    }, async(accessToken, refreshToken, profile, done) => { //profile of user and done is callback
        console.log(profile)

    }))
    //serialize and deserialize essential makes sure that we ask user.id where it should go while be anomonous
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user)
        })
    });
}