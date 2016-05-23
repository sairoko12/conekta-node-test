var mongoose = require("mongoose");

var tokenlogSchema = require("mongoose").Schema({
	name: String, 
    bin: String,
    exp_month: String,
    exp_year: String,
    brand: String,
    last4: String
});

mongoose.model('Tokenslog', tokenlogSchema);