var express = require('express');
var router = express.Router();
const videoRepository = require('../Repository/VideoRepository');

router.get('/', function(req, res) {
    videoRepository.getVideos(function(results) {
        res.render('pages/', { obj: results })
    });
});

module.exports = router;