var express = require('express'),
	apiRouter = express.Router();


var levelRoutes = require('./levelRoutes');
var progressRoutes = require('./progressRoutes');

var authentication = require('./authenticateRoute');


module.exports = function (app, passport) {
	// initialize all routes under /api/*
	authentication(app, passport);

	levelRoutes(apiRouter, passport);
	progressRoutes(apiRouter, passport);

	app.use('/api', apiRouter);
};