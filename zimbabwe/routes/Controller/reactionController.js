const express = require('express');
const { redirectIfNoGetData } = require('../Helper/validationHelper');
const router = express.Router();
const validationHelper = require('../Helper/validationHelper')
const reactionRepository = require('../Repository/reactionRepository')

router.get('/like', function(req, res) {
    validationHelper.redirectIfNotLoggedIn(req, res)
    if (redirectIfNoGetData(req)) {
        res.redirect('/');
     }
    var video_id = req.query.id
    var user_id = req.session.user.id;
    reactionRepository.getVideoReaction(user_id, video_id, function(result) {
        if (!result) {
            reactionRepository.likeVideo(user_id, video_id)
        } else if (result[0].like == 0) {
            reactionRepository.likeDislikedVideo(user_id, video_id)
        }else if (result[0].like == 1){
            reactionRepository.deleteReaction(user_id, video_id, 1)
        }
        res.redirect('/video/watch?id=' + video_id)
    });
});

router.get('/dislike', function(req, res) {
    validationHelper.redirectIfNotLoggedIn(req, res);
    if (redirectIfNoGetData(req)) {
        res.redirect('/');
     }
    var video_id = req.query.id
    var user_id = req.session.user.id
    reactionRepository.getVideoReaction(user_id, video_id, function(result) {
        if (!result) {
            reactionRepository.dislikeVideo(user_id, video_id)
        } else if (result[0].like == 1) {
            reactionRepository.dislikeLikedVideo(user_id, video_id)
        } else if (result[0].like == 0){
            reactionRepository.deleteReaction(user_id, video_id, 0)
        }
        res.redirect('/video/watch?id=' + video_id)
    });

});

module.exports = router