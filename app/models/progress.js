var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// progress record - keep User's progress on particular Level
var progressSchema = Schema({
	userId: Schema.Types.ObjectId,
	levelId: Schema.Types.ObjectId,
	state: Number, // 2 - completed, 1 - started, 0 - nothing
	board: [String]
});

module.exports = mongoose.model('Progress', progressSchema);