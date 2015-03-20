exports.isLoggedIn = function isLoggedIn(req, res, next) {
	if (req.isAuthenticated)
		return next();

	res.redirect('/');
}


exports.isNotLoggedIn = function (req, res, next) {
	if (!req.isAuthenticated())
		return next();

	res.redirect('/');
};