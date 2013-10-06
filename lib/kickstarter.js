/*!
 * Module dependencies
 */

var request = require('request');
var querystring = require('querystring');
var HTTPError = require('httperror');

/**
 * Expose `createClient`
 */

exports.createClient = createClient;

/**
 * Create an instance of Client
 * @param {Object} [options] -
 * @param {String} [options.email] - email address of the kickstarter account,
 *  if not provided only the API calls without authentification required will work.
 * @param {String} [options.password] - password of the kickstarter account,
 *  if not provided only the API calls without authentification required will work.
 *
 * @return {Client} kickstarter client
 * @api public
 */

function createClient(options){
    return new Client(options);
};

/**
 * Create a new `Client`
 * @constructor
 *
 * @param {Object} [options] -
 * @param {String} [options.email] - email address of the kickstarter account,
 *  if not provided only the API calls without authentification required will work.
 * @param {String} [options.password] - password of the kickstarter account,
 *  if not provided only the API calls without authentification required will work.
 *
 * @return {Client}
 * @api private
 */

function Client(options){
    this.email = options ? options.email : null;
    this.password = options ? options.password : null;
    this.accessToken = null;
    this.endpoint = 'https://api.kickstarter.com/';
}

/**
 * Get access token
 * @param {Function} callback -
 * @return {http.ClientRequest} http request
 * @api public
 */

Client.prototype._getAccessToken = function(callback){
    var options = {
        uri : this.endpoint + 'xauth/access_token?client_id=2II5GGBZLOOZAA5XBU1U0Y44BU57Q58L8KOGM7H0E0YFHP3KTG',
        json : true,
        body : {
            email : this.email,
            password : this.password
        }
    };
    var req = request.post(options,function(err,res,body){
        if(err) return callback(err);
        if(res.statusCode != 200) return callback(new HTTPError(req,res,'Getting access token'));
        callback(null,body);
    });
    return req;
};



