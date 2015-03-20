var mongoose = require('mongoose');

var levelSchema = mongoose.Schema({
	Name: String,
	Width: Number,
	Height: Number,
	L: [String]
});

levelSchema.methods.valid = function () {
	if (this.Height != this.L.length) {
		return false;
	}

	return true;
}

module.exports = mongoose.model('Level', levelSchema);