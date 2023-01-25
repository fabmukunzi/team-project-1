//importing modules
import express from "express"
import {signup} from "../controllers/userController"
import googleLogin from "../controllers/googleLogin.js"
import passport from 'passport';
import loggedIn from '../middlewares/googleAuth/loggedIn.js'
import loggedSucces from '../controllers/loggedSuc.js';
import updateProfile from '../controllers/updateProfile.js'
import db from "../models";


const router = express.Router()

//For test
const User = db.users;
router.get('/all', (req, res) => {
    User.findAll()
        .then(users => {
            console.log(users);
            res.send(users);
        })
})

//signup endpoint
//passing the middleware function to the signup
router.post('/signup', passport.authenticate('signup', { session: true }), signup)


// When use need to login using google account
router.get('/google-login', googleLogin);

router.get('/auth/google', passport.authenticate('google', {scope: ['email', 'profile']}))

router.get('/auth/callback',
    passport.authenticate( 'google', {
        successRedirect: 'profile',
        failureRedirect: '/auth/callback/failure'
}))

// protected routes

router.get('/auth/profile', loggedIn, loggedSucces)

router.get('/profile/update', loggedIn, updateProfile);


export default  router