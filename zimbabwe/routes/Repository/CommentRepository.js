const connection = require('../../connection')
module.exports = {
    getCommentsByVideoId: function (video_id, callback) {
        connection.query('SELECT comment, username FROM zimbabwe.comment JOIN user ON commenter_id = user.id WHERE video_id =?', [video_id], function (err,results) {
            if (err) throw err;
            if(results){
                return callback(results)
            }
        });
    },

    createComment: function (text, user_id, video_id) {
        connection.query('INSERT INTO comment (comment, commenter_id, video_id) VALUES (?,?,?)', [text, user_id, video_id], function (err, rows, fields) {
            if (err) throw err;
        });
    },
}