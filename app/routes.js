var validator = require('validator');
var User = require('./models/user');

var authenticationHelper = require('./auth/authenticationHelper');

module.exports = function (app, passport) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('/', function (req, res) {
		res.sendfile('./public/index.html');
	});

};