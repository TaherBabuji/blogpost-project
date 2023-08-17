const User = require('../models/user.js')
const path = require('path')

module.exports = async (req, res) => {
    try {
        await User.create(req.body)
        res.redirect('/')
    } catch (error) {
        const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
        req.flash('validationErrors', validationErrors)
        req.flash('username', req.body.username);
        req.flash('password', req.body.password);
        // res.status(500).send('Error registering User')
        res.redirect('/auth/register')
    }
}