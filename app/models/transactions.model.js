var mongoose = require("mongoose");

var transactionSchema = require("mongoose").Schema({
	name_card: String, 
    bin_number: String,
    expiration_date: String,
    type_card: String,
    brand: String
});

mongoose.model('Transactions', transactionSchema);