//need express for router
const express = require('express')
const router = express.Router()

//@desc login/landing page
//@router GET / 
//routes tells server where to send and get data from 
router.get("/", (req, res) => {
    //By setting layout to false, Express will render "login.hbs" without trying to use the "main.hbs" layout file.
    //  templating engines like Handlebars or EJS used with Express.js, "layout" refers to both a concept and, often, a specific template. layout is a special kind of folder for common structures
    res.render("login")
})


//@desc dashboard page
//@router GET /dashboard
router.get("/dashboard", (req, res) => {
    res.render("dashboard")
})

module.exports = router
