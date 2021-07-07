const connection = require('../../connection')
module.exports = {
    addVideoToPlaylist: function(video_id, playlist_id) {
        connection.query('INSERT INTO listedVideo (video_id, playlist_id) VALUES (?, ?)', [video_id, playlist_id], function(err) {
            if (err) throw err;
        });
    },
    removeVideoFromPlaylist: function(video_id, playlist_id) {
        connection.query('delete From listedVideo WHERE video_id = ? AND playlist_id = ?', [video_id, playlist_id], function(err) {
            if (err) throw err;
        });
    },
    listedVideoExists: function(video_id, playlist_id, callback) {
        connection.query('SELECT * From listedVideo WHERE video_id = ? AND playlist_id = ?', [video_id, playlist_id], function(err, rows) {
            if (err) throw err;
            if (rows != 0) {
                return callback(true, playlist_id);
            } else {
                return callback(false, playlist_id);
            }
        });
    },
    getVideoByPlaylistID: function(playlist_id, callback) {
        connection.query('SELECT video.id, title,filepath, description FROM listedVideo JOIN video on video_id = video.id WHERE playlist_id = ?', [playlist_id], function(err, results) {
            if (err) {
                throw err;
            }
            if (results) {
                return callback(results);
            }
        });
    },
}