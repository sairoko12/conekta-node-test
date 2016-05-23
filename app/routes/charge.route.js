var router = require("express").Router();

var crypto = require('crypto');

var redis = require("redis"),
    redisClient = redis.createClient();

var TokenLog = require("mongoose").model("Tokenslog");

require("../middlewares/auth.middleware")(router);

module.exports = function() {
	router.route("/")
	.post(function(req,res,next){
		var token = req.body.id;
		var amount = req.body.amount;
		var description = req.body.description;

		redisClient.HGETALL(token, function(err, data){
			if (!data) {
				res.status(403).json({
					success: false,
					message: "Token expired"
				});
			}

			var decipher = crypto.createDecipher('aes192', token);
			var data_encode = decipher.update(data.info, 'hex', 'utf8');
			data_encode += decipher.final('utf8');

			var data_decode = JSON.parse(data_encode);

			/**
			 * Data ready for service payment
			 */
			
			var request_gate = {
				card_number: data_decode.number,
				cvc: data_decode.cvc,
				exprired_date: data_decode.exp_month + "/" + data_decode.exp_year
			};

			/**
			 * Dummie for service payment. e.g Cybersource
			 */
			

			 var info_customer = TokenLog.findOne({
			 	_id: token
			 }, function(err, info){
			 	res.json({
					id: token,
					amount: amount,
					description: description,
					satatus: "paid",
					name: info.name,
					bin: info.bin,
					exp_month: info.exp_month,
					exp_year: info.exp_year,
					brand: info.brand,
					last4: info.last4
				});
			 });
		});
	});

	return router;
}