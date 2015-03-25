var validator = require('validator');
var User = require('./models/user');

var authenticationHelper = require('./auth/authenticationHelper');

module.exports = function (app, passport) {
	// return the SPA html
	// angular will do the rest
	app.get('/', function (req, res) {
		res.sendfile('./public/index.html');
	});
};