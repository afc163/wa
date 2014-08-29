var fs = require('fs');

var read = function() {
  return JSON.parse(fs.readFileSync('.wa', {
    encoding: 'utf8'
  }));
};

var info = function() {
  if (!fs.existsSync('.wa')) {
    console.log(('[wa] Config no found, wa init first.').red);
    return;
  }
  var config = read();
  Object.keys(config).forEach(function(key) {
    console.log(key, config[key].toString().cyan);
  });
  return config;
};

info.read = read;
module.exports = info;

