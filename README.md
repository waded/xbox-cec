# xbox-cec

This service:

- Enables TV-on/off over HDMI-CEC when Xbox One turns on/off. Although Xbox 
  One supports turning the TV on/off with IR, that's not enough in some systems:
- Sends additional/alternative CEC commands, e.g. to change active source to the Xbox.
  People sometimes suggest using universal remotes like Harmony Hub, but Harmony 
  requires a 3rd party service, cannot trigger when you turn on an Xbox controller, 
  can conflict with being able to use Xbox's Google Assistant support, and is more 
  expensive. The downside is this solution occupies an HDMI input on the receiver
  in addition to the Xbox's input.

Although most receivers likely support CEC active source, not all do. Please run
through *Checking that active source works with an Xbox on my receiver* with a 
Pi you already have before buying anything.

## Hardware you need:

This runs on a Raspberry Pi that has 
- a GPIO-compatible 38kHz IR receiver (e.g. TSOP38238, wired to the 3.3v, Ground, and 
  GPIO 17 pins)
- an HDMI cable connected to a receiver (or TV)

The IR receiver is located with the Xbox One so it can receive IR blasts from the Xbox. 
For the original Xbox One model you may need a 3.5mm IR extension cable, but newer models 
have an IR emitter in the front panel. See the [Xbox support article about IR extension](https://beta.support.xbox.com/help/hardware-network/oneguide-live-tv/use-external-ir-with-xbox-one).

## Setting up CEC-based on/off

TODO:
- Explain Xbox One device control settings, with pictures, including choosing device 
  to use as "TV", but suggest using remote code T2051 and LIRC config [tv-for-xbox-cec.conf](tv-for-xbox-cec.conf) to
  make the remainder of the steps easy. In Device power options, set the Xbox to send "On" to TV when turning on,
  and "Off" when turning off, so xbox-cec gets both events. Don't use "Toggle."
- Explain OS, install cec-client, install/configure LIRC, deploy service (see [#1](https://github.com/waded/xbox-cec/issues/1))

## Checking that active source works with an Xbox on my receiver

See [#2](https://github.com/waded/xbox-cec/issues/2): xbox-cec can't help you check this just yet.

You can use cec-client to scan existing HDMI-CEC bus to determine device addresses (the Xbox will not show up,
but other CEC_supporting devices will), and then try transmitting e.g. 5f:82:12:00 (for an Xbox One at address 1.2.0.0, 
the receiver being 1.0.0.0) and see if your system responds appropriately.

## Setting up CEC-based input switching

TODO:
- Explain how to configure xbox-cec with custom CEC codes
- Explain how to determine physical address of the Xbox One (since Xbox will not respond 
  to scan)
- Explain alternatives if 0x82 doesn't work
