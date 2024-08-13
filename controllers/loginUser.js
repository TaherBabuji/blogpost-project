const bcrypt = require('bcrypt')
const User = require('../models/user')

module.exports = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username: username });
        req.flash('username', req.body.username);
        req.flash('password', req.body.password);
        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                // if passwords match
                // store user session, will talk about it later
                console.log(password)
                req.session.userId = user._id
                req.session.save(function() {
                    if(req.session.userId){
                      console.log({user});
                    }else{
                      consol.log( 'not log in' );
                    }
                  });
                res.redirect('/')
            } else {
                req.flash('validationErrors', ['Please Provide Valid Password']);
                res.redirect('/auth/login')
            }
        } else {
            req.flash('validationErrors', ['Please Provide Valid Username']);
            res.redirect('/auth/login')
        }
    } catch (error) {
        console.log("There Is An Error While Logging In :", error)
    }
}