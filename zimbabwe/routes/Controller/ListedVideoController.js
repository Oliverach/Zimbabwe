const express = require('express');
const router = express.Router();
const listedVideoRepository = require('../Repository/listedVideoRepository');
const playlistRepository = require('../Repository/PlaylistRepository');

router.post('/addVideoToPlaylists', (req, res) => {
    var user_id = req.session.user.id;
    var video_id = req.body.video_id;
    playlistRepository.getPlaylistByUserID(user_id, function(playlists) {
        for (var i = 0; i < playlists.length; i++) {
            
            var checkbox = "req.body." + playlists[i].name;
            console.log(checkbox)
            if (eval(checkbox) == "on") {
                listedVideoRepository.listedVideoExists(video_id, playlists[i].id, function(result, playlist_id) {
                    if (!result) {
                        listedVideoRepository.addVideoToPlaylist(video_id, playlist_id)
                    }
                })
            } else {
                listedVideoRepository.listedVideoExists(video_id, playlists[i].id, function(result, playlist_id) {
                    if (result) {
                        listedVideoRepository.removeVideoFromPlaylist(video_id, playlist_id)
                    }
                })
            }
        }
    })
    res.redirect('/video/watch?id=' + video_id);
});


module.exports = router;