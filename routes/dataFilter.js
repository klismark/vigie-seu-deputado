module.exports = function (app) {
    let filter = app.controllers.dataFilter;
    app.get('/getListDeputados', filter.getListDeputados);
}