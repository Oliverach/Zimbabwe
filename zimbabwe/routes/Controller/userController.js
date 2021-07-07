const express = require('express');
const router = express.Router();
const userRepository = require('../Repository/UserRepository');
const validationHelper = require('../Helper/validationHelper')
const videoRepository = require('../Repository/VideoRepository');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

router.get('/register', function (req, res) {
    res.render('pages/register');
});

router.post('/doRegister', (req, res) => {
    var username = req.body.username;
    var password = bcrypt.hashSync(req.body.password, salt);
    var email = req.body.email;
    userRepository.createUser(username, password, email)
    res.redirect('/user');
});

router.get('/', function (req, res) {
    validationHelper.redirectIfLoggedIn(req, res);
    res.render('pages/login');
});

router.post('/doLogin', (req, res) => {
    var password = bcrypt.hashSync(req.body.password, salt);
    var email = req.body.email;
    userRepository.loginUser(email, password, function (results) {
        req.session.user = results[0];
        res.redirect('/');
    });
});

router.get('/logout', function (req, res) {
    req.session = null;
    res.redirect('/user');
});

router.get('/profile', function (req, res) {
    validationHelper.redirectIfNotLoggedIn(req, res);
    var user_id = req.session.user.id;
    videoRepository.getVideoByUserID(user_id, function (video) {
        res.render('pages/profile', { video: video });
    });

});



module.exports = router;