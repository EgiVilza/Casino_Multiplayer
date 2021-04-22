// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

const jwt = require("jsonwebtoken")

module.exports = {
    verifyToken: function(req, res, next) {
        // // Get auth header value
        const bearerHeader = req.headers['authorization']

        //Check if bearer is undefined
        if (typeof bearerHeader !== 'undefined') {
            // Split at the space
            const bearer = bearerHeader.split(' ')

            // Get Token from array
            const bearerToken = bearer[1]

            console.log(bearerHeader)

            // Set token
            req.token = bearerToken

            //Next middleware
            next()

        } else {
            // Forbidden
            res.sendStatus(403)
        }
    }
}