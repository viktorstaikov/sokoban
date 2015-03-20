var jwt = require('jwt-simple');
var moment = require('moment');

var secret = '1234567890';

var authenticationHelper = require('../auth/authenticationHelper');

var User = require('../models/user');
var Token = require('../models/token');

module.exports = function (app, passport) {

	app.all('/api*', function (req, res, next) {
		var authorizationHeader = req.headers['authorization'];

		if (!authorizationHeader) {
			return res.status(401).send('Unauthorized');
		}

		var jwtToken = authorizationHeader;

		authenticationHelper.validToken(jwtToken, function (err, valid) {
			if (err) {
				res.status(500).send(err);
			} else if (!valid) {
				res.status(401).send('Unauthorized. Invalid token.');
			} else {
				next();
			}
		});
	});
};