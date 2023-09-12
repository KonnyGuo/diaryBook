//need express for router
const express = require('express')
//routes tells server where to send and get data from 
const router = express.Router()
//destructuring allows us to bring in both of these item at same time and perform action, ensureGuest was only needed for login
const {ensureAuth} = require('../middleware/auth')

const Story = require("../models/Story")

//@desc add page
//@router GET /stories/add
router.get("/add", ensureAuth, (req, res) => {
    res.render("stories/add")
})

module.exports = router
