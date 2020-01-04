# xbox-cec

This project's initial goals are:

- Allow TV-on/off to be sent over CEC when the Xbox One turns on/off. This is useful in its own right if the Xbox isn't within IR blaster reach of the TV.
- Provide for additional CEC commands to be sent during the on/off events, e.g. to change receiver input to the Xbox. This input switch the missing link in many setups, and a reason people tend to suggest using a Harmony Hub with Xbox, but Harmony requires internet connection and a 3rd party service, cannot trigger when you turn on an Xbox controller or use the Xbox's Google Assistant or Alexa support, and is more expensive.

 This this intended to run on a Raspberry Pi that has an IR receiver connected to GPIO, and HDMI cable connected to the HDMI bus. The IR receiver located with the Xbox One so that it can receive IR blasts from the Xbox, and the Xbox device control settings are configured to send a TV on/off command over IR (you choose your brand of TV, then configure the script to detect that brand's on/off signals.)
