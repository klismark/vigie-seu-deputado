module.exports = function (app) {
    let filter = app.controllers.dataFilter;
    app.get('/getCongressmen', filter.getCongressmen);
    app.get('/getParties', filter.getParties);
}