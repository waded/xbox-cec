# xbox-cec

This system:

- Allows TV-on/standby to be sent over HDMI-CEC whenever Xbox One turns on/off. This is useful in its own right if you don't want to position the Xbox's IR blaster to reach the TV, but let's face it, that's not why we want CEC support on the Xbox One.
- Allows custom CEC commands during the on/off events, e.g. to change receiver input to the Xbox. This input switch the missing step in many setups, and a reason people tend to suggest using a Harmony Hub with Xbox, but Harmony requires a 3rd party service, cannot trigger when you turn on an Xbox controller or use the Xbox's Google Assistant or Alexa support, and is more expensive.

## What you need:

This runs on a Raspberry Pi that has a GPIO IR sensor, and an HDMI cable connected to the receiver. 

The IR sensor is located with the Xbox One so it can receive IR blasts from the Xbox (you may need an IR blaster cable, but newer Xbox One models have the blaster built-into the front panel)

The Xbox device control settings are configured to send TV on/off commands over IR (you choose brand of TV, then configure the script to detect those signals.)

