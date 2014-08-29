var fs = require('fs');
var child_process = require('child_process');
var watch = require('watch');
var path = require('path');
var minimatch = require('minimatch');

module.exports = function() {
  if (!fs.existsSync('.wa')) {
    console.log(('[wa] Config no found, wa init first.').red);
    return;
  }

  var config = require('./info').read();
  var ignores = config.ignores || [];
  var cwd = process.cwd();
  console.log('[wa]'.green, 'Watching ' + cwd.cyan +
              ' for ' + config.host.cyan + ' ... ');
  watch.createMonitor(cwd, {
    ignoreDotFiles: true,
    interval: 500,
    filter: function(f) {
      var result = ignores.some(function(i) {
        return minimatch(f, i, {
          matchBase: true
        });
      });
      return !result;
    }
  }, function(monitor) {
    monitor.on("created", changed);
    monitor.on("changed", changed);

    function changed(f) {
      // Handle file changes
      var relativePath = path.relative(cwd, f);
      var scpCmd = 'scp ' + relativePath + ' ' + config.host + ':' + config.path + '/' + relativePath;
      scpCmd = scpCmd.replace('//', '/');
      child_process.exec(scpCmd, function(err, stdout) {
        if (err) {
          console.log(('[wa] ' + relativePath + ' failed').yellow);
        } else {
          console.log(('[wa] ' + relativePath + ' uploaded').green);
        }
      });
    }
  });
};
