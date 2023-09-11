//middleware help intercept messages to pass on to recipents
module.exports = {
    //if not authenticated then go back home page
    ensureAuth: function (req, res, next) {
        if(req.isAuthenticated()) {
            return next()
        } else {
            redirect("/")
        }
    },

    //if is login then send them to dashboard at all time
    ensureGuest: function(req, res, next) {
        if(req.isAuthenticated()) {
            res.redirect("dashboard")
        } else {
            return next()
        }
    }
}