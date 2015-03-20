var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var progressSchema = Schema({
	userId: Schema.Types.ObjectId,
	levelId: Schema.Types.ObjectId,
	state: Number,
	board: [String]
});

module.exports = mongoose.model('Progress', progressSchema);