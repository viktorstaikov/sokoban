module.exports = function (app, passport) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('/', function (req, res) {
		res.sendfile('./public/index.html');
	});

	app.post('/login', passport.authenticate('local-login'),
		function (req, res) {
			res.json({
				token: req.token
			});
		});

	app.post('/signup', passport.authenticate('local-signup'),
		function (req, res) {
			res.json({
				user: req.user
			});
		});
};