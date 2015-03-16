var util = require("util");
var events = require("events");
var https = require("https");
var querystring = require("querystring");
var fs = require('fs');
var ssl = require("ssl-root-cas").inject();

function FreeMobileSmsAPI() {
  events.EventEmitter.call(this);
  
  var self = this,
      code = {
        200: 'Success',
        400: 'One of needed parameters is missed or incorrect',
        402: 'Too many requests sent, please wait few time',
        403: 'Access denied, check your\'s options and credentials',
        500: 'SMS API got an internal error, try again later',
      },
      data = {},
      post = {};
  
  FreeMobileSmsAPI.prototype.query = function(data) {
    options = {
      rejectUnauthorized: false,
      host: 'smsapi.free-mobile.fr',
      port: 443,
      path: '/sendmsg?user=' + data.user + '&pass=' + data.pass + '&msg=' + data.msg,
      method:'POST',
      ca: https.globalAgent.options.ca,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(querystring.stringify(data), 'UTF-8')
      }
    };
    
    var req = https.request(options, function(res) {
      
      var type = typeof(code[parseInt(res.statusCode)]) != "undefined" && res.statusCode == 200 ? 'success' : 'error';
      console.log(type);
      self.emit('sms:' + type, {id: res.statusCode, account: data.user, msg: code[parseInt(res.statusCode)], sms:data.msg});
      
    });
    
    req.write(querystring.stringify(data));
    req.end(); 
  }
  
  FreeMobileSmsAPI.prototype.send = function(msg) {
    data.msg = msg;
    self.query(data);
  }
  
  FreeMobileSmsAPI.prototype.account = function(user, pass) {
    data.user = user;
    data.pass = pass;
  }
  
};

util.inherits(FreeMobileSmsAPI, events.EventEmitter);
module.exports = new FreeMobileSmsAPI();