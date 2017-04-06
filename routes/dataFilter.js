module.exports = function (app) {
    let filter = app.controllers.dataFilter;
    app.get('/getDeputados', filter.getDeputados);
    app.get('/getPartidos', filter.getPartidos);
}