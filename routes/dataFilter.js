module.exports = function (app) {
    var filter = app.controllers.dataFilter;
    app.get('/getCongressmen', filter.getCongressmen);
    app.get('/getParties', filter.getParties);
}