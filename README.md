# xbox-cec

This project's initial goals are:

- Provide TV-on/off during Xbox on/off via CEC, rather than IR. This runs on a Raspberry Pi that has an IR receiver and HDMI cable connected to the HDMI bus, and is colocated with the Xbox One so that it can receive IR blasts from the Xbox.
- Provide for hooks so additional CEC commands can be sent during Xbox on/off events, e.g. CEC commands to change receiver input route, as in https://github.com/Pulse-Eight/libcec/issues/202.

# Setup

The script currently uses a FLIRC USB keyboard to receive IR.

The FLIRC keyboard is programmed as follows:
A - TV power off
B - TV power on




