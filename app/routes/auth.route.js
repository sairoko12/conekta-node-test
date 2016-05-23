var router = require("express").Router();
var jwt = require('jsonwebtoken');
var config = require("../../config/config");

var Clients = require("mongoose").model("Clients");

module.exports = function() {
	router.route("/")
		.post(function(req, res) {

		  Clients.findOne({
		    client_id: req.body.client_id
		  }, function(err, client) {

		    if (err) throw err;

		    if (!client) {
		      res.json({ success: false, message: 'Authentication failed. User not found.' });
		    } else if (client) {
		      if (client.client_secret != req.body.client_secret) {
		        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
		      } else {
		        var token = jwt.sign({
		        	client_id: client.client_id
		        }, config.secret, {
		          expiresIn: 1440
		        });

		        res.json({
		          success: true,
		          token: token
		        });
		      }   

		    }

  	});
});

	return router;
}