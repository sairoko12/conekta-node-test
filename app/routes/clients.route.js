var router = require("express").Router();

var Clients = require("mongoose").model("Clients");

module.exports = function() {
	router.route("/")
		.get(function(req,res,next){
			res.send("USER EMTPY");
		})
		.post(function(req,res,next) {
			var newClient = new Clients(req.body);

			newClient.save(function(err, client){
				return res.json(client);
			});
		});

	return router;
}