var config = require("../../config/config");
var jwt = require('jsonwebtoken');

module.exports = function(router) {
	router.use(function(req,res,next){
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		  if (token) {

		    // verifies secret and checks exp
		    jwt.verify(token, config.secret, function(err, decoded) {      
		      if (err) {
		        return res.json({ success: false, message: 'Failed to authenticate token.' });    
		      } else {
		        req.decoded = decoded;
		        next();
		      }
		    });

		  } else {
		    return res.status(403).send({ 
		        success: false, 
		        message: 'Logeate perra!'
		    });
    
  		}
	});
}