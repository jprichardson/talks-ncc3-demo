var os = require('os')
  , path = require('path');

var p = {};

for (key in path) {
    if (typeof path[key] === 'function') {
        p[key] = path[key];
    }
}
path = p;
    
var ost = os.type().toLowerCase();

if (path.tempdir == null) {
    path.tempdir = function() {

        if (ost.indexOf('lin') === 0) {
            return '/tmp';
        } else if (ost.indexOf('darwin') === 0) {
            return '/tmp';
        } else if (ost.indexOf('win') === 0) {
            return process.env['TEMP'];
        } else {
            return null;
        }
    };
}

if (path.homedir == null) {
    path.homedir = function() {
        if (ost.indexOf('win') === 0) {
            return process.env['USERPROFILE']
        } else {
            return process.env['HOME']
        }
    };
}

module.exports = path;


