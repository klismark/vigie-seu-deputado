module.exports = function (app) {
    let HomeController = {
        index: function (req, res) {
            res.render('index');
        }
    };
    return HomeController;
}