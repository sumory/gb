var fs = require('fs');
var path = require('path');
var utils = require('./utils');
var g = require('octonode');

exports = module.exports = Github;

//http://developer.github.com/v3/
//https://github.com/pksunkara/octonode#pagination
function Github() {
    this.login = false;
    this.username = '';
    this.client = undefined;
    this.ghme = undefined;

}


Github.prototype.auth = function(account) {
    try {
        this.client = g.client({
            username: account.username,
            password: account.password
        });
        //this.ghme = this.client.me();
        this.login = true;
        utils.writeJsonToFile(account);
        //this.me(function(err, body){console.dir(body);});
    } catch (e) {
        console.error('Auth fails, please `gitstar config` again and input the right account.');
        console.error('Details: \n', e);
        process.exit(-1);
    }
};


Github.prototype.info = function(callback) {
    this.client.get('/user', {}, function(err, status, body, headers) {
        callback(err, body);
    });
};


Github.prototype.search = function(key,pageNo, pageCount, callback) {
    this.client.get('/search/repositories', {q:key,page:pageNo, per_page:pageCount}, function(err, status, body, headers) {
        callback(err, body);
    });
};


Github.prototype.list = function(pageNo, pageCount, callback) {
    this.client.get('/user/starred', {page:pageNo, per_page:pageCount}, function(err, status, body, headers) {
        callback(err, body);
    });
};