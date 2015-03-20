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

	app.post('/login', function (req, res) {
		var email = req.body.email;
		var password = req.body.password;

		if (!(email && password)) {
			return res.status(400).send("Bad request. Email and password must be provided.");
		}

		// if (!validator.isEmail(email)) {
		// 	return res.status(400).send("Bad request. Invalid email.");
		// }

		User.findOne({
			email: email
		}, function (err, user) {
			if (err) {
				return res.status(500).send(err);
			}

			if (!user) {
				return res.status(400).send("Bad request. No user with that email.");
			}

			if (!user.validPassword(password)) {
				return res.status(400).send("Bad request. Invalid password.");
			}

			authenticationHelper.getToken(user, function (err, token) {
				if (err) {
					done(err);
				} else {
					delete user._id;
					delete user.password;

					res.json({
						token: token,
						user: user
					});
				}
			});
		});
	});

	app.post('/signup', function (req, res) {
		var email = req.body.email;
		var password = req.body.password;

		if (!(email && password)) {
			return res.status(400).send("Bad request. Email and password must be provided.");
		}

		// if (!validator.isEmail(email)) {
		// 	return res.status(400).send("Bad request. Invalid email.");
		// }

		User.findOne({
			'email': email
		}, function (err, user) {
			if (err) {
				return res.status(500).send(err);
			}

			if (user) {
				return res.status(409).send("User with that email already exists");
			} else {
				var newUser = new User();

				newUser.email = email;
				newUser.password = newUser.generateHash(password);

				newUser.save(function (err) {
					if (err) {
						return res.status(500).send(err);
					}
					return res.json({
						result: newUser
					});
				});
			}

		});
	});
};