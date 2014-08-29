var fs = require('fs');
var child_process = require('child_process');
var Connection = require('ssh2');

module.exports = function(options) {
  var host = options.host;
  var username = options.username;
  var port = options.port = options.port || 22;

  if(!fs.existsSync(process.env.HOME + "/.ssh/id_rsa.pub")) {
    child_process.exec('ssh-keygen -t rsa -N "" -C "" -f '
      + process.env.HOME + '/.ssh/id_rsa', function(err) {
      if (err) {
        throw err.red;
      }
    });
  }

  child_process.exec('cat $HOME/.ssh/id_rsa.pub', function(err, stdout, stderr) {
    if (err) {
      throw err.red;
    }
    sshServer(stdout);
  });

  function addSshConfig() {
    var configInfo = "Host " + host + "\n" +
        "    HostName " + host + "\n" +
        "    Port " + port + "\n" +
        "    User " + username + "\n";

    fs.appendFileSync(process.env.HOME + "/.ssh/config", configInfo);
  }

  function addWaConfig() {
    delete options.password;
    options.ignores = '';
    fs.writeFileSync('.wa', JSON.stringify(options, null, 2));
    console.log("[wa] Done! Input 「wa」 to watch files!".green);
  }

  function sshServer(keyContent) {
    var client = new Connection();
    client.on('ready', function() {
      client.exec('mkdir -p $HOME/.ssh', function(err) {
        if (err) {
          throw err.red;
        }
        client.exec("echo '" + keyContent + "' >>$HOME/.ssh/authorized_keys", function(err) {
          if (err) {
            throw err.red;
          }
          client.end();
          addSshConfig();
          addWaConfig();
        });
      });
    });

    client.on('error', function(err) {
      console.log(('[wa] ' + err).red);
    });

    client.connect(options);
  }

};
