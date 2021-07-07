module.exports = {
    redirectIfNotLoggedIn: function(req, res) {
        if (!req.session.user) {
            res.redirect('/user/login');
            return true;
        }
    },
    redirectIfLoggedIn: function(req, res) {
        if (req.session.user) {
            res.redirect('/');
            return true;
        }
    },
    redirectIfNoPostData: function (req){
        if (Object.keys(req.query).length === 0) {
            return true;
         }
    },
    redirectIfNoGetData: function (req){
        if (Object.keys(req.query).length === 0) {
            return true;
         }
    }
}