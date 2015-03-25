var router = require('express').Router();

var Progress = require('../models/progress');

// all endpoints about progress, will be under /api/progress/*
module.exports = function (app, passport) {

	// get progress record about User(userId) on Level(levelId) or progress._id
	router.get('/', function (req, res) {
		var filter = {};
		if (req.query.userId) {
			filter.userId = req.query.userId;
		}
		if (req.query.levelId) {
			filter.levelId = req.query.levelId;
		}
		if (req.query._id) {
			filter._id = req.query._id;
		}

		Progress.find(filter, function (err, result) {
			handleResult(err, result, res);
		})
	});

	// update progress record
	router.put('/', function (req, res) {
		var filter = {};
		if (req.query._id || req.body._id) {
			filter._id = req.query._id || req.body._id
		} else if ((req.query.userId || req.body.userId) && (req.query.levelId || req.body.levelId)) {
			filter.userId = req.query.userId || req.body.userId;
			filter.levelId = req.query.levelId || req.body.levelId;
		} else {
			return res.status(400).json({
				error: "Either _id or userId + levelId must be provided."
			})
		}

		var updateObj = {};
		if (typeof req.body.state != "number") {
			return res.status(400).json({
				error: "Status must be 0, 1, 2 (not started, started, completed)."
			})
		}
		updateObj.state = req.body.state;

		if (!Array.isArray(req.body.board)) {
			return res.status(400).json({
				error: "Board must be array of string."
			})
		}
		updateObj.board = req.body.board;

		Progress.where(filter).update(updateObj, function (err, result) {
			handleResult(err, result, res);
		});
	});

	// create new progress record, used when the user start level for the first time
	router.post('/', function (req, res) {
		var newProgress = new Progress(req.body);

		Progress.create(newProgress, function (err, result) {
			handleResult(err, result, res);
		})
	})

	app.use('/progress', router);
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