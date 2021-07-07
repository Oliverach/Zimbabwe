const express = require('express');
const router = express.Router();
const commentRepository = require('../Repository/CommentRepository');

router.post('/addComment', (req, res) => {
    var user_id = req.session.user.id;
    var video_id = req.body.video_id;
    var comment_text = req.body.comment_text;
    commentRepository.createComment(comment_text, user_id, video_id);
    res.redirect('/video/watch?id=' + video_id);
});

module.exports = router;
