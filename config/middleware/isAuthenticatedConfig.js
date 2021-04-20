module.exports = {
    isLoggedIn: function(req, res, next) {
        if (req.user) {
            return next()
        }
    
        return res.redirect("/login")
    },

    Test: function() {
        if (req.user) {
            console.log("Logged In")
        }   
    }
}




