var mongoose = require("mongoose");
var config = require("./config");

module.exports = function() {
	mongoose.connect(config.database);

	require("../app/models/clients.model");
	require("../app/models/tokenslog.model");
	require("../app/models/transactions.model");
}