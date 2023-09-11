//need express for router
const express = require('express')
//routes tells server where to send and get data from 
const router = express.Router()
//destructuring allows us to bring in both of these item at same time and perform action
const {ensureAuth, ensureGuest} = require('../middleware/auth')

//@desc login/landing page
//@router GET / 
//reusable protection for routes in app
router.get("/", ensureGuest, (req, res) => {
    //By setting layout to false, Express will render "login.hbs" without trying to use the "main.hbs" layout file.
    //templating engines like Handlebars or EJS used with Express.js, "layout" refers to both a concept and, often, a specific template. layout is a special kind of folder for common structures
    res.render("login", {
        //specificy login layout b/c main is default
        layout: "login"
    })
})


//@desc dashboard page
//@router GET /dashboard
router.get("/dashboard", ensureAuth, (req, res) => {
    res.render("dashboard")
})

module.exports = router
