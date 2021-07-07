const connection = require('../../connection')
module.exports = {
    createUser: function(username, password, email) {
        connection.query('INSERT INTO user (username, password, email) VALUES (?, ?, ?)', [username, password, email], function(err, rows, fields) {
            if (err) throw err;
            console.log(rows, fields, "Successfully inserted the user: " + username);
        });
    },

    loginUser: function(email, password, callback) {
        connection.query('SELECT id, username, email, password FROM user WHERE email=? AND password=?', [email, password], function(err, results) {
            if (err) throw err;
            if (results) {
                return callback(results);
            }
        });
    }
}