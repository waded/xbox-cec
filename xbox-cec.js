let CECMonitor = require("@senzil/cec-monitor").CECMonitor;
let lirc = require("lirc-client");

// Config placeholders
const xbox_physical = "12:00";
const ir_on = "KEY_POWER";
const ir_off = "KEY_POWER2";

log("Starting");

log("Enabling LIRC");
let lirc_client = lirc({
  path: "/var/run/lirc/lircd"
});
lirc_client.on("receive", function (remote, key, repeat) {
  if (repeat == "00") {
    if (key == ir_on) {
      xboxon();
    } else if (key == ir_off) {
      xboxoff();
    } else {
      log("Unexpected IR key", key);
    }
  }
});

log("Wait for CEC...");
let monitor = new CECMonitor("xbox-cec", {});
monitor.once(CECMonitor.EVENTS._READY, () => {
  log("...CEC ready");
});

process.on("exit", code => {
  log("Exit with code", code);
});

function xboxon() {
  log("Xbox ON");

  // Set active source then ensure TV on
  monitor
    .WaitForReady()
    .then(() => monitor.WriteRawMessage("tx 5F:82:" + xbox_physical))
    .then(() => monitor.WriteRawMessage("on 0"));
}

function xboxoff() {
  log("Xbox OFF");

  // Do nothing, to avoid interupting other sources
}

function log(...params) {
  console.log("xbox-cec:", ...params);
}
