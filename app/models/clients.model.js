var mongoose = require("mongoose");

var clientSchema = require("mongoose").Schema({
	client_id: String, 
    client_secret: String
});

mongoose.model('Clients', clientSchema);