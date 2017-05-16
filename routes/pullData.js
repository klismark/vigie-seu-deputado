module.exports = function (app) {
    var pull = app.controllers.pullData;
    app.get('/pullQuota', pull.getQuota);
    app.get('/pullAttendance', pull.getAttendance);
}