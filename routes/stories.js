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

//@desc process add form
//@router GET /stories
router.post("/", ensureAuth, async(req, res) => {
    try {
        req.body.user = req.user.id
        // can just pass in and the model will populate
        await Story.create(req.body)
        res.redirect("/dashboard")
    } catch(err) {
        console.error(err)
        res.render("error/500")
    }
})

//@desc show all public stories
//@router GET /stories
router.get("/", ensureAuth, async (req, res) => {
    try {

        const stories = await Story.find({status: "public"})
            .populate("user")
            .sort( {createdAt: "desc"})
            .lean()
        res.render("stories/index", {
            stories
        })
    } catch (err) {
        console.error(err)
        res.render("error/500")
    
    }
})

module.exports = router
