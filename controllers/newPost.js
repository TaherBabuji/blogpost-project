module.exports = (req, res) => {
    if (req.session.userId) {
        const title = req.flash('title')[0] || '';
        const body = req.flash('body')[0] || '';

        return res.render('create', {
            errors: req.flash('validationErrors'),
            title: title,
            body: body,
            createPost: true
        })
    }
    res.redirect('/auth/login')
}