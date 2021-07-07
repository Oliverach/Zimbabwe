const connection = require('../../connection')
module.exports = {
    saveFilepath: function(title, description, filepath, user_id, comment) {
        connection.query('INSERT INTO video (title, description, filepath, user_id, comment) VALUES (?,?,?,?,?)', [title, description, filepath, user_id, comment], function(err, rows, fields) {
            if (err) throw err;
        });
    },

    getVideos: function(callback) {
        connection.query('SELECT id, title, description, filepath FROM video', function(err, results) {
            if (err) {
                throw err;
            }
            if (results) {
                return callback(results);
            }
        });
    },
    getVideo: function(id, callback) {
        connection.query('SELECT * FROM video LEFT JOIN listedVideo ON video.id = video_id WHERE id = ?', [id], function(err, results) {
            if (err) {
                throw err;
            }
            if (results) {
                return callback(results);
            }
        });
    },

    getVideoByUserID: function(user_id, callback) {
        connection.query('SELECT * FROM video WHERE user_id = ?', [user_id], function(err, results) {
            if (err) {
                throw err;
            }
            if (results) {
                return callback(results);
            }
        });
    },
    getVideoByPlaylistID: function(playlist_id, callback) {
        connection.query('SELECT * FROM video LEFT JOIN video_has_playlist ON video.id = video_id WHERE playlist_id = ?', [playlist_id], function(err, results) {
            if (err) {
                throw err;
            }
            if (results) {
                return callback(results);
            }
        });
    },
}