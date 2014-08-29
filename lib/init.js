var prompt = require('prompt');
var sshkey = require('./sshkey');

prompt.message = '[wa]'.green;
prompt.delimiter = ' ';
prompt.start();

module.exports = function() {

  prompt.get([{
    name: 'host',
    description: 'Remote Server',
    required: true
  }, {
    name: 'path',
    description: 'Remote Directory',
    default: '/home/admin/build',
    required: true
  }, {
    name: 'username',
    description: 'Username',
    default: 'admin'
  }, {
    name: 'password',
    description: 'password',
    hidden: true,
    required: true
  }], function (err, result) {
    if (result) {
      sshkey(result);
    }
  });

};
