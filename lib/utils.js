var _crypto = require('crypto');
var path = require('path');
var fs = require('fs');

var prompt = require('prompt');
var promptSchema = {
    properties: {
        username: {
            description: 'Github Username',
            required: true
        },
        password: {
            description: 'Github Password',
            hidden: false,
            required: true
        }
    }
};


exports.config = function(github) {
    prompt.start();
    prompt.get(promptSchema, function(err, result) {
        if (err) return consoler.error(err);
        github.auth({
            username: result.username,
            password: result.password
        });
        console.info('Welcome to use this tool，' + result.username);
    });
};


/**
 * 尝试获取用户身份
 * 1. 如果已经配置过，则从本地获取账户然后连接github验证
 * 2. 否则，提示用户先配置
 * @param  {[type]} github [description]
 * @return {[type]}        [description]
 */
exports.tryAuth = function(github, callback) {
    var account_file = getConfigFile();
    if (fs.existsSync(account_file)) {
        var account = readJsonFromFile();

        if (account && account.username && account.password) {
            github.auth({
                username: account.username,
                password: account.password
            });
            callback();
        } else {
            console.warn('Github account is none. Set it first.');
            console.warn('Use `gb config` to config.');
        }
    } else {
        console.warn('You have not set your github account.');
        console.warn('Use `gb config` to config.');
    }
};



function getConfigFile() {
     var home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
     return path.join(home, '.gitrobot.profile.json');
}

//获取账户信息
function readJsonFromFile() {
    try {
        var account_file = getConfigFile();
        var data = fs.readFileSync(account_file);
        return JSON.parse(data.toString());
    } catch (err) {
        return {};
    }
};

// 读写json
exports.writeJsonToFile = function(contents, callback) {
    var account_file = getConfigFile();
    fs.writeFile(account_file, JSON.stringify(contents), function(err) {
        callback && callback(err, contents);
    });
}

exports.splitArgs = function(val) {
    return val.split(',');
};


exports.cipheriv = function(en, code, data) {
    var buf1 = en.update(data, code),
        buf2 = en.final();
    var r = new Buffer(buf1.length + buf2.length);
    buf1.copy(r);
    buf2.copy(r, buf1.length);
    return r;
};
exports.encrypt = function(data, key, vi) {
    key = key || 'abcdeghijk123';
    vi = vi || 10000;
    return data = exports.cipheriv(_crypto.createCipheriv('des', key, vi), 'utf8', data).toString('base64');
};
exports.decrypt = function(data, key, vi) {
    key = key || 'abcdeghijk123';
    vi = vi || 10000;
    return exports.cipheriv(_crypto.createDecipheriv('des', key, vi), 'base64', data).toString('utf8');
};