var express = require('express'),
	apiRouter = express.Router();


var levelRoutes = require('./levelRoutes');
var progressRoutes = require('./progressRoutes');

var authentication = require('./authenticateRoute');


module.exports = function (app, passport) {

	authentication(app, passport);

	levelRoutes(apiRouter, passport);
	progressRoutes(apiRouter, passport);

	app.use('/api', apiRouter);
};