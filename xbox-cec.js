var keypress = require('keypress');
var cec_controller = require('cec-controller');

keypress(process.stdin);

process.stdin.on('keypress', function (ch, key) {
  console.log('got ', key);
  
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
  }
});

var cec = new cec_controller();
cec.on('ready', (c) => console.log(c));
cec.on('error', console.error);

process.stdin.setRawMode(true);
process.stdin.resume();