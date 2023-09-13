//need express for router
const express = require('express')
//routes tells server where to send and get data from 
const router = express.Router()
//destructuring allows us to bring in both of these item at same time and perform action, ensureGuest was only needed for login
const { ensureAuth } = require('../middleware/auth')

const Story = require("../models/Story")

//@desc add page
//@route GET /stories/add
router.get("/add", ensureAuth, (req, res) => {
    res.render("stories/add")
})

//@desc process add form
//@route GET /stories
router.post("/", ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id
        // can just pass in and the model will populate
        await Story.create(req.body)
        res.redirect("/dashboard")
    } catch (err) {
        console.error(err)
        res.render("error/500")
    }
})

//@desc show all public stories
//@route GET /stories
router.get("/", ensureAuth, async (req, res) => {
    try {

        const stories = await Story.find({ status: "public" })
            .populate("user")
            .sort({ createdAt: "desc" })
            .lean()
        res.render("stories/index", {
            stories
        })
    } catch (err) {
        console.error(err)
        res.render("error/500")

    }
})

//@desc show 1 story
//@route GET /:id
router.get("/:id", ensureAuth, async (req, res) => {
    try {
        let story = await Story.findById(req.params.id)
            .populate("user")
            .lean()

        if(!story) {
            res.render("error/400")
        }

        res.render("stories/show", {
            story,
        })
        
    } catch (err) {
        console.error(err)
        res.render("error/400")
    }
})

//@desc edit story page
//@route GET /stories/edit
router.get("/edit/:id", ensureAuth, async (req, res) => {
    try {
        const story = await Story.findOne({
            _id: req.params.id,
        }).lean()

        if (!story) {
            res.render("error/400")
        }

        if (story.user != req.user.id) {
            res.redirect("/stories")
        } else {
            res.render("stories/edit", {
                story,
            })
        }
    } catch (err) {
        console.error(err)
        res.render("error/500")
    }

})

//@desc get user story
//@route GET /user/:userId
router.get("/user/:userId", ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({
            user: req.params.userId,
            status: "public"
        })
        .populate("user")
        .lean()

        res.render("stories/index",{
            stories,
        })

    } catch (err) {
        console.error(err)
        res.render("error/400")
    }
})


//@desc update story
//@route PUT /stories/add
router.put("/:id", ensureAuth, async (req, res) => {
    try {
        let story = await Story.findById(req.params.id).lean()
        if (!story) {
            return res.render("error/400")
        }

        if (story.user != req.user.id) {
            res.redirect("/stories")
        } else {
            //passes all the check
            //perform update by id from req replacing it with req.body
            story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
                //story does not exist make new one
                new: true,
                //params set in story model makes other user unable to change model (for more security)
                //double check the validators
                runValidators: true,
            })
            res.redirect("/dashboard")
        }
    } catch (err) {
        console.error(err)
        res.render("error/500")
    }
})

//@desc delete story
//@route Delete /stories/:id
router.delete('/:id', ensureAuth, async (req, res) => {
    try {
        let story = await Story.findById(req.params.id).lean()

        if (!story) {
            return res.render('error/400')
        }

        if (story.user != req.user.id) {
            res.redirect('/stories')
        } else {
            await Story.findByIdAndRemove({ _id: req.params.id })
            res.redirect('/dashboard')
        }
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})


module.exports = router
