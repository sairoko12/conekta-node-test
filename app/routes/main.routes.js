module.exports = function(app){
	var token = require("./token.route")();
	var charge = require("./charge.route")();
	var clients = require("./clients.route")();
	var auth = require("./auth.route")();

	app.use("/token", token);
	app.use("/charges", charge);
	app.use("/clients", clients);
	app.use("/auth", auth);
}