module.exports = function (app) {
    var filter = app.controllers.dataFilter;
    app.get('/getListDeputados', filter.getListDeputados);
}