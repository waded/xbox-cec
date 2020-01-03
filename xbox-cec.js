var keypress = require('keypress');

keypress(process.stdin);

process.stdin.on('keypress', function (ch, key) {
  console.log('got ', key);
  
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();