
/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index', { title: 'Express' });
};

exports.appView = function (req, res) {
    var tUrl = req.url.split('/').slice(2).join('/');

    res.render(tUrl);
};
