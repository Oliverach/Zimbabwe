const connection = require('../../connection')
module.exports = {
    createPlaylist: function(name, user_id) {
        connection.query('INSERT INTO playlist (name, user_id) VALUES (?, ?)', [name, user_id], function(err, rows, fields) {
            if (err) throw err;
            console.log(rows, fields, "Successfully created playlist: " + name);
        });
    },
    getPlaylistByUserID: function(user_id, callback) {
        connection.query('SELECT * FROM playlist WHERE user_id = ?', [user_id], function(err, results) {
            if (err) {
                throw err;
            }
            if (results) {
                return callback(results);
            }
        });
    },
    getPlaylistByID: function(id, callback) {
        connection.query('SELECT * FROM playlist WHERE id = ?', [id], function(err, results) {
            if (err) {
                throw err;
            }
            if (results) {
                return callback(results);
            }
        });
    }
}