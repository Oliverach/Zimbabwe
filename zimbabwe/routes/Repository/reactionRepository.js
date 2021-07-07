const connection = require('../../connection')
module.exports = {
    getVideoReaction: function(user_id, video_id, callback) {
        connection.query('SELECT reaction.like FROM reaction WHERE user_id = ? AND video_id = ?', [user_id, video_id],
         function(err, result) {
            if (err) throw err;
            if (result.length != 0) { 
                return callback(result)
            }else{
                return callback(false);
            }
        });
    },

    likeVideo: function(user_id, video_id) {
        connection.query('INSERT INTO reaction(user_id, video_id, reaction.like) VALUES (?,?,?)', [user_id, video_id, 1],
            function(err) {
                if (err) throw err;
            });
    },
    dislikeVideo: function(user_id, video_id) {
        connection.query('INSERT INTO reaction(user_id, video_id, reaction.like) VALUES (?,?,?)', [user_id, video_id, 0], 
            function(err) {
                if (err) throw err;
            });
    },
    dislikeLikedVideo: function(user_id, video_id) {
        connection.query('UPDATE reaction SET reaction.like=? WHERE user_id=? AND video_id=? AND reaction.like =?', [0,user_id, video_id, 1],
            function(err) {
                if (err) throw err;
            });
    },
    likeDislikedVideo: function(user_id, video_id) {
        connection.query('UPDATE reaction SET reaction.like=? WHERE user_id=? AND video_id=? AND reaction.like =?', [1, user_id, video_id, 0],
            function(err) {
                if (err) throw err;
            });
    },
    getAmountOfLike: function(video_id, callback){
        connection.query('SELECT count(reaction.like) as amount FROM reaction WHERE video_id = ? AND reaction.like = ?', [video_id, 1],
            function(err,result) {
                if (err) throw err;
                if (result) { 
                    console.log(result)
                    return callback(result)
                }
            });
    },
    getAmountOfDisike: function(video_id, callback){
        connection.query('SELECT count(reaction.like) as amount FROM reaction WHERE video_id = ? AND reaction.like = ?', [video_id, 0],
            function(err,result) {
                if (err) throw err;
                if (result) { 
                    return callback(result)
                }
            });
    },
    deleteReaction: function(user_id, video_id, reaction){
        connection.query('DELETE FROM reaction WHERE user_id = ? AND video_id = ? AND reaction.like = ?;', [user_id, video_id, reaction],
            function(err,result) {
                if (err) throw err;
            });
    },
}