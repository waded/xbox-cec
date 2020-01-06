# xbox-cec

This service:

- enables TV-on/off over HDMI-CEC when Xbox One turns on/off. Although Xbox 
  One supports turning the TV on/off with IR, that's not enough in some systems:
- sends additional/alternative CEC commands, e.g. to switch inputs.
  People sometimes suggest universal remotes like Harmony Hub, but Harmony 
  requires a 3rd party service, can't trigger when you turn on the Xbox using
  its controllers, conflict with being able to use Xbox's Google Assistant integration, 
  and is more expensive. The downside is this setup occupies an additional HDMI
  input.

Not all receivers support CEC active source commands. Please run
through *Checking that active source works with an Xbox on my receiver* with a 
Pi you already have before buying anything!

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
  and "Off" when turning off, so xbox-cec gets both events. Don't use "Toggle", because xbox-cec doesn't try to track
  state of the system, and you'll want it to do different things for on vs. off.
- Explain OS, install cec-client, install/configure LIRC, deploy service (see [#1](https://github.com/waded/xbox-cec/issues/1))

## Checking that active source works with an Xbox on my receiver

See [#2](https://github.com/waded/xbox-cec/issues/2). xbox-cec can't help you check this just yet.

Alternatively, use `cec-client` to scan existing HDMI-CEC bus to determine device addresses:

`echo scan | cec-client -s -d 1`

Xbox One will not show up in the scan, since as of January 2020 it doesn't support CEC, but other 
CEC-enabled devices will. Note the `Address` of each. A TV might be at `0.0.0.0`, a CEC-enabled 
receiver at `1.0.0.0`, a CEC-enabled device on the receiver's first input at `1.1.0.0`, the second at 
`1.2.0.0`, and so on.

Then try broadcasting an active source command targeting the Xbox One's input, say the third:

`echo tx 5f:82:13:00 | cec-client -s -d 1` 

and see how your system responds. Physical input address `1.3.0.0` is expressed in this command
as `13:00`, with the remainder being opcode (`82` active source) and somewhat irrelevant 
source and destination (`5` receiver, `F` broadcast.)

## Setting up CEC-based input switching

TODO:
- Explain how to configure xbox-cec with custom CEC codes
- Explain how to determine physical address of the Xbox One (since Xbox will not respond 
  to scan)
- Explain alternatives if 0x82 doesn't work
