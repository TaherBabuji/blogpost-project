const BlogPost = require('../models/BlogPost.js');
const path = require('path');

module.exports = (req, res) => {
    if (!req.files || !req.files.image) {
        req.flash('validationErrors', ['Please Provide Image']);
        req.flash('title', req.body.title);
        req.flash('body', req.body.body);
        return res.redirect('/posts/new'); // Redirect to an appropriate route
    }

    let image = req.files.image;

    image.mv(path.resolve(__dirname, '..', 'public/img', image.name), async (error) => {
        if (error) {
            console.error('Error Uploading image:', error);
            req.flash('error', 'Error uploading image');
        }

        try {
            await BlogPost.create({
                ...req.body,
                image: '/img/' + image.name,
                userid: req.session.userId
            });

            res.redirect('/');
        } catch (error) {
            console.error('Error creating blog post:', error);
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
            req.flash('validationErrors', validationErrors);
            req.flash('title', req.body.title);
            req.flash('body', req.body.body);
            res.redirect('/posts/new');
        }
    });
};









// const BlogPost = require('../models/BlogPost.js')
// const path = require('path')

// module.exports = (req, res) => {
//     let image = req.files.image;

//     image.mv(path.resolve(__dirname,'..','public/img', image.name), async (error) => {
//         if (error) {
//             console.error('Error Uploading image:', error);
//             return res.status(500).send('Error Uploading Image');
//         }

//         try {
//             await BlogPost.create({
//                 ...req.body,
//                 image: '/img/' + image.name
//             })
//             res.redirect('/')
//         } catch (error) {
//             console.error('Error creating blog post:', error);
//             res.status(500).send('Error creating blog post')
//         }
//     })
// }