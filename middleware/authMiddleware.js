const User = require('../models/user.js')

module.exports = async (req, res, next) => {
    try {
        const user = await User.findById({ _id: req.session.userId })
        console.log(req.session.userId)
        console.log(user)
        if (!user) {
            console.log("No user founded")
            return res.redirect('/')
        }

        next()
    } catch (error) {
        console.log(error)
        // return res.redirect('/')
    }
}