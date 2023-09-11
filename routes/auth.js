//authentication routes
//need express for router
const express = require('express')
const router = express.Router()
const passport = require('passport')

//@desc auth with google
//@router GET / /auth/google
//routes tells server where to send and get data from 
router.get("/google", passport.authenticate('google',{scope: ['profile']}))


//@desc google auth callback
//@router GET /auth/google/callback
router.get("/google/callback", passport.authenticate('google', {
    failureRedirect: "/"
}), (req,res) => {
    //login successful go dashboad else fail go "/"
    res.redirect("/dashboard")
})

module.exports = router
