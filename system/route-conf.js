var indexRouter = require('./../routes/index');
var auth = require('./../routes/auth');
var wschat = require("./../routes/wschat")
var insta = require("./../routes/insta");

module.exports = function (app) {

    app.use('/', indexRouter);
    app.use('/auth', auth);
    app.use('/wschat', wschat);
    app.use('/insta', insta);
        
}