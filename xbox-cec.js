var keypress = require('keypress');
var cec_controller = require('cec-controller');
var cec;

log("Send x to exit");

keypress(process.stdin);

process.stdin.on('keypress', function (ch, key) {
  if (cec) {
    if (ch === 'a') {
      log("Xbox ON blast detected");
      send("tx 5F:82:12:00").then(v => send("on 0"));
    }
    if (ch === 'b') {
      log("Xbox OFF blast detected");
      log("Doing nothing to avoid interuptions (e.g. Xbox auto-off when using other input)");
    }
    if (ch === 'c') {
      log("Test command c, return standby to Chromecast");
      send("standby 0").then(v => send("tx 5F:82:11:00"));
    }
    if (ch === 'd') {
      log("Test command d, return to Chromecast");
      send("tx 5F:82:11:00");
    }
  } else {
    log("CEC was not ready")
  }

  if (ch === 'x') {
    process.stdin.pause();
    process.exit();
  }
});

process.on('exit', function(code) {
  return log(`Exit with code ${code}`);
});

process.stdin.setRawMode(true);
process.stdin.resume();

log("Preparing CEC support")
var controller = new cec_controller();
controller.on('ready', (ready) => {
  log("CEC ready")
  cec = ready;
});
controller.on('error', console.error);

function log(msg) {
  return console.log('xbox-cec:', msg)
}

async function send(command) {
  log("Sending " + command)
  return cec.command(command)
}
