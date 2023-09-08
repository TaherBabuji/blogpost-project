const express = require('express')
const app = new express()

const ejs = require('ejs')
app.set('view engine', 'ejs')

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Taher:Babuji5253@cluster0.buzkxaq.mongodb.net/my_database', { useNewUrlParser: true })

const fileUpload = require('express-fileupload')
app.use(fileUpload());


const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const expressSession = require('express-session')
app.enable('trust proxy')
app.set("trust proxy", 1);
app.use(expressSession({
    secret: 'keyboard cat',
    proxy: true,
    resave: false,
    name: 'MyCoolWebAppCookieName',
    cookie: {
        httpOnly: true,
        secure: true, 
        maxAge: 1000 * 60 * 60 * 48,
        sameSite: 'none'
    }
}));

// app.use(expressSession({
//     secret: 'keyboard cat',
//     proxy: true,
//     resave: false,
//     saveUninitialized: false, // Set this to false
//     name: 'MyCoolWebAppCookieName',
//     resave: false,
//     store: new filestore()
//     cookie: {
//         httpOnly: true,
//         secure: true, 
//         maxAge: 1000 * 60 * 60 * 48,
//         sameSite: 'none'
//     }
// }));


app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});

const flash = require('connect-flash');
app.use(flash());

//Requiring Controllers
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home.js')
const storePostController = require('./controllers/storePost.js')
const getPostController = require('./controllers/getPost.js')
const newUserController = require('./controllers/newUser.js')
const storeUserController = require('./controllers/storeUser.js')
const loginController = require('./controllers/login.js')
const loginUserController = require('./controllers/loginUser.js')
const logoutController = require('./controllers/logout.js')

//Requiring Middlewares
const validateMiddleware = require('./middleware/validationMiddleware');
const authMidleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedUser');

app.use(express.static('public'))

let port = process.env.PORT;
if(port == null || port == ""){
    port = 4000;
}

app.listen(port, () => {
    console.log('App Listening...')
})

//Route For Creating New Posts
app.get('/posts/new', authMidleware, newPostController)

app.get('/', homeController)

//Route For Storing The BlogPosts In Database
app.post('/posts/store', authMidleware,  storePostController)

app.get('/post/:id', getPostController)

//Route For Creating New User
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)

//Route For Storing New User In The Database
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)

//Route For Accessing The Login Page
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)

//Route For User Login
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)

//Route For User Logout
app.get('/auth/logout', logoutController)

//Route For An Unknown Page Request
app.use((req, res) => res.render('notfound'));
