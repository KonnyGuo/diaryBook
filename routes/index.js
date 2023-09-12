//need express for router
const express = require('express')
//routes tells server where to send and get data from 
const router = express.Router()
//destructuring allows us to bring in both of these item at same time and perform action
const {ensureAuth, ensureGuest} = require('../middleware/auth')

const Story = require("../models/Story")

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
router.get("/dashboard", ensureAuth, async (req, res) => {

    try {
        //find to get all matches
        //document return from query with lean are js object and not mongoose docs to be able to use in template
        const stories = await Story.find({ user: req.user.id}).lean()
            // console.log(req.user)
        res.render("dashboard", {
            name: req.user.firstName,
            stories
        })
    } catch (err) {
        console.error(err)
        res.render("error/500")
    }
})

module.exports = router
