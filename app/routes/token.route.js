var router = require("express").Router();

var crypto = require('crypto');

var redis = require("redis"),
    redisClient = redis.createClient();

var TokenLog = require("mongoose").model("Tokenslog");

require("../middlewares/auth.middleware")(router);

module.exports = function() {
	router.route("/")
		.post(function(req,res,next){
			var data_secret = JSON.stringify(req.body);
			var token = crypto.createHash('sha256').update(data_secret + req.decoded.client_id).digest('hex');

			var cipher_data = crypto.createCipher('aes192', token);
			var encrypted = cipher_data .update(data_secret, 'utf8', 'hex');
					encrypted += cipher_data.final('hex');
	
			redisClient.hmset(token, {info: encrypted}, function(err) {
				redisClient.expire(token, 6000, function(){
					var number_card = req.body.number.split(" ").join("");

					var last_four = number_card.substring(12, this.length);
					var bin =  number_card.substring(0, 6);

					// Get service for bin validation
					var bin_validation = "visa";

					var response_client = {
						id: token,
						name: req.body.name,
						bin: bin,
						exp_month: req.body.exp_month,
						exp_year: req.body.exp_year,
						brand: bin_validation,
						last4: last_four
					};

					var tokenLog = new TokenLog({
						_id: token,
						name: req.body.name, 
					    bin: bin,
					    exp_month: req.body.exp_month,
					    exp_year: req.body.exp_year,
					    brand: bin_validation,
					    last4: last_four
					});

					tokenLog.save(function(err, tokenLog){
						res.json(response_client);
					});
				});
			});
		});

	return router;
}