var express = require('express'),
	router = express.Router();
var utils = require('../utils/middlewares');

var Level = require('../models/level');


module.exports = function (app, passport) {

	router.get('/', function (req, res) {
		Level.find(function (err, result) {
			handleResult(err, result, res);
		});
	});

	router.get('/:id', function (req, res) {
		Level.findOne({
			_id: req.params.id
		}, function (err, result) {
			handleResult(err, result, res);
		});
	});

	router.post('/single', function (req, res) {
		var newLevel = new Level(req.body);
		if (!newLevel.valid()) {
			res.status(403).json({
				error: "Invalid Level dimensions."
			});
		}

		Level.create(newLevel, function (err, result) {
			handleResult(err, result, res);
		});
	});

	router.post('/bootstrap', function (req, res) {
		var rawLevels = require('../models/sample-levels');

		if (!Array.isArray(rawLevels)) {
			res.status(403).json({
				error: "Array must be passed. Fix your sample Levels."
			});
		}

		bulkInsert(req, res, rawLevels);
	})

	router.post('/many', function (req, res) {
		var rawLevels = req.body;

		bulkInsert(rq, res, rawLevels);
	})

	router.delete('/:id', function (req, res) {
		Level.remove({
			_id: req.params.id
		}, function (err, level) {
			if (err) {
				res.status(500).json({
					error: err
				});
			}
			Level.find(function (err, result) {
				handleResult(err, result, res);
			});
		})
	})

	app.use('/level', router);
};


// return the result or yeld 500 Internal server error
function handleResult(err, result, res) {
	if (err) {
		res.status(500).json({
			error: err
		});
	} else {
		res.json({
			result: result
		});
	}
}

function bulkInsert(req, res, levels) {
	var newLevels = [];
	for (var i = 0; i < levels.length; i++) {
		var newLevel = new Level(levels[i]);

		if (!newLevel.valid()) {
			res.status(403).json({
				error: "Item at possition " + (i + 1) + " is not a valid Level."
			});
			return;
		}

		newLevels.push(newLevel);
	};

	Level.create(newLevels, function (err, created) {
		if (err) {
			res.status(500).json({
				error: err
			});
		} else {
			res.json({
				result: newLevels.length
			});
		}
	});
}