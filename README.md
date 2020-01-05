# xbox-cec

This system:

- Enables TV-on/standby over HDMI-CEC when Xbox One turns on/off. Although the Xbox One supports doing this by IR/Kinect, maybe you don't want that setup, and this is just the setup for:
- Sends additional CEC commands during on/off, e.g. to change receiver input to the Xbox. This input switch the missing step in some home theatres. People sometimes suggest using universal remotes like Harmony Hub, but Harmony requires a 3rd party service, cannot trigger when you turn on an Xbox controller, can conflict with being able to use Xbox's wealth of Google Assistant and Alexa commands, and is more expensive than this solution. This system makes the power-on experience of the Xbox One in multi-input receiver setups similar to that of the Nintendo Switch and the PS4.

Caveat:
- Although most receivers likely support CEC active input routing, not all do. You might want to run through *Checking that input switch works on my receiver* with an existing Raspberry Pi before buying anything.

## Hardware you need:

This runs on a Raspberry Pi that has a GPIO-compatible IR sensor (e.g. TSOP38238, wired to 3.3v, Gnd, and GPIO [TODO]), and an HDMI cable connected to a receiver or the TV.

The IR sensor is located with the Xbox One so it can receive IR blasts from the Xbox. For the original Xbox One model, you may need a 3.5mm IR extension cable, but newer models have an IR emitter on the front panel. See https://beta.support.xbox.com/help/hardware-network/oneguide-live-tv/use-external-ir-with-xbox-one for more about IR extension.

## Setting up on/off

TODO:
- Explain software setup, SD card to ready
- Picture of general setup
- Explain Xbox One Device Settings needed (show pictures) and how to choose device to use as the "TV"
- Explain how to configure xbox-cec with GPIO pin and IR codes for the "TV"

## Setting up input switching

TODO:
- Explain CEC 0x82
- Explain how to determine CEC physical address of the Xbox One (since it will not respond to CEC scan)
- Explain alternatives if 0x82 doesn't work

## Checking that input switch works on my receiver

TODO:
- How to check this w/o getting deep into xbox-cec, using cec-client