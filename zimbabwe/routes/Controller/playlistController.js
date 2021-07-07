const express = require('express');
const router = express.Router();
const playlistRepository = require('../Repository/PlaylistRepository');
const validationHelper = require('../Helper/validationHelper')
const listedVideoRepository = require('../Repository/ListedVideoRepository');


router.get('/', function (req, res) {
    if (!validationHelper.redirectIfNotLoggedIn(req, res)) {
        playlistRepository.getPlaylistByUserID(req.session.user.id, function (results) {
            res.render('pages/playlist', { obj: results })
        });
    }
});

router.get('/create', function (req, res) {
    if (!validationHelper.redirectIfNotLoggedIn(req, res)) {
        res.render('pages/createPlaylist');
    }
});

router.get('/watch', function (req, res) {
    if (!validationHelper.redirectIfNotLoggedIn(req, res)) {
        var id = req.query.id;
        playlistRepository.getPlaylistByID(id, function(name){
            listedVideoRepository.getVideoByPlaylistID(id, function (videos) {
                res.render('pages/playlistWatch', { videos: videos, name:name})
            })
        })
        
    }
});

router.post('/createPlaylist', (req, res) => {
    var name = req.body.name;
    var user_id = req.session.user.id;

    function hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0;
    }
    if(hasWhiteSpace(name)) {
        req.flash('space_in_name', 'Please remove spaces in name');
        res.redirect("/playlist")
    } else {
        playlistRepository.createPlaylist(name, user_id);
        res.redirect('/playlist');
    }
});

module.exports = router;