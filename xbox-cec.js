var cec_controller = require('cec-controller');
var debounce = require('debounce');
var lirc = require('lirc-client');

var cec;

// Config
var xbox_physical = "12:00";
var lirc_key_on = "KEY_POWER";
var lirc_key_off = "KEY_POWER2"

log("Starting up")

log("Enabling LIRC")
var lirc_client = lirc({
  path: '/var/run/lirc/lircd'
});
lirc_client.on('receive', function (remote, key, repeat) {
  // Debounce because Xbox triple sends the IR command for the
  // Samsung remote code I chose, even though the doubling option 
  // is off.
  if (key == lirc_key_on) {
    xboxon_debounce();
  } else if (key == lirc_key_off) {
    xboxoff_debounce();
  } else {
    log("Unexpected LIRC key " + key)
  }
});

log("Wait for CEC...")
var controller = new cec_controller();
controller.on('ready', (ready) => {
  log("...CEC ready")
  cec = ready;
});
controller.on('error', console.error);

process.on('SIGINT',() => {
  process.exit(1);
});
process.on('exit', function(code) {
  return log(`Exit with code ${code}`);
});
setInterval(() => {}, 0)


var xboxon_debounce = debounce(xboxon, 300, true);
var xboxoff_debounce = debounce(xboxoff, 300, true);

function xboxon() {
  log("Xbox ON");
  
  // Set active source then TV on
  sendCec("tx 5F:82:" + xbox_physical)
    .then(v => sendCec("on 0"));
}

function xboxoff() {
  log("Xbox OFF");

  // Set inactive source, but don't turn TV off to avoid
  // interupting other sources.
  sendCec("tx 5F:9D:" + xbox_physical);
}

async function sendCec(command) {
  if (cec) {
    return cec.command(command)
  } else {
    log("CEC not ready to send " + command);
    return Promise.resolve();
  }
}

function log(msg) {
  return console.log('xbox-cec:', msg)
}

