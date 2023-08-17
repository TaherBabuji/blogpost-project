module.exports = (req, res) => {
    const username = req.flash('username')[0] || '';
    const password = req.flash('password')[0] || '';

    res.render('login', {
        errors: req.flash('validationErrors'),
        username: username,
        password: password
    })
}