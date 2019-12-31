# xbox-cec

This project's initial goals are:

- Provide TV-on/off via CEC, rather than IR, whenever the Xbox One would blast IR TV on/off commands, for setups where the Xbox One is not near and cannot blast to the TV. This runs on a Raspberry Pi that has both an IR receiver and an HDMI cable connected to the HDMI bus, and is colocated with the Xbox One such that it can receiver IR blasts from it.
- Provide for hooks so custom CEC or IR commands appropriate to your setup can be added at each supported event besides TV on/off, e.g. raw CEC commands appropriate for your receiver that routes input between Xbox One and the TV, as in https://github.com/Pulse-Eight/libcec/issues/202.





