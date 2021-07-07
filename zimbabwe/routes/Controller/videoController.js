const express = require('express');
const router = express.Router();
const multer = require('multer');
const videoRepository = require('../Repository/VideoRepository');
const playlistRepository = require('../Repository/PlaylistRepository');
const reactionRepository = require('../Repository/ReactionRepository');
const validationHelper = require('../Helper/validationHelper');
const CommentRepository = require('../Repository/CommentRepository');

const videoStorage = multer.diskStorage({
    destination: 'uploads/', 
});

const videoUpload = multer({
    storage: videoStorage,
    limits: {
        fileSize: 10000000
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "video/mp4") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('only mp4 allowed!'));
        }
    }
})

router.get('/upload', function (req, res) {
    if (!validationHelper.redirectIfNotLoggedIn(req, res)) {
        res.render('pages/upload')
    }
});

router.post('/upload', videoUpload.single('file'), (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    var user_id = req.session.user.id;
    var filename = req.file.filename;
    var filepath = "../../uploads/" + filename;
    var comment = req.body.comment;

    var comment = comment[0]

    if(title && description && filename) {
        videoRepository.saveFilepath(title, description, filepath, user_id, comment);
        req.flash('file_upload_success', 'File uploaded successfully');
        res.render('pages/upload')
    } else {
        req.flash('file_upload_empty', 'Fill in all fields please');
        res.render('pages/upload')   
    }

}, (error, req, res, next) => {
    console.log(error.message)
    req.flash('file_size_limit', 'File too large (under 10MB)');
    res.render('pages/upload')
})

router.get('/watch', (req, res) => {
    validationHelper.redirectIfNotLoggedIn(req, res)
    var user_id = req.session.user.id;
    var id = req.query.id;
    CommentRepository.getCommentsByVideoId(id, function(comments){
        reactionRepository.getAmountOfDisike(id, function(dislike){
            reactionRepository.getAmountOfLike(id, function(like){
                reactionRepository.getVideoReaction(user_id, id, function (reaction) {
                    if(!reaction){
                        var t_up_color = ""
                        var t_down_color = ""
                    }else if (reaction[0].like == 1){
                        var t_up_color = "color:blue;"
                        var t_down_color = ""
                    }else if (reaction[0].like == 0){
                        var t_up_color = ""
                        var t_down_color = "color:blue;"
                    }
                    videoRepository.getVideo(id, function (video) {
                        playlistRepository.getPlaylistByUserID(user_id, function (playlists) {
                            res.render('pages/watch', { video: video, playlists: playlists, like:like , dislike:dislike, t_up_color: t_up_color,  t_down_color:t_down_color, comments:comments})
                        })
                    })
                })
            })
        })
    })
})

router.get('/userVideo', function (req, res) {
    validationHelper.redirectIfNotLoggedIn(req, res);
    var user_id = req.session.user.id;
    videoRepository.getVideoByUserID(user_id, function (video) {
        res.render('pages/userVideo', { video: video });
    });

});

module.exports = router;