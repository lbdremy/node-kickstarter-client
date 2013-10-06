/**
 * Retrieve an access token for the given account
 */

var kickstarter = require('./../');

var options = {
	email : process.env['KICKSTARTER_EMAIL'],
	password : process.env['KICKSTARTER_PASSWORD']
};
var client = kickstarter.createClient(options);

client._getAccessToken(function(err,body){
	if(err) return console.error(err.stack);
	console.log(body);
});