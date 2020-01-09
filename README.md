# xbox-cec

This service:

- **enables TV-on/off over HDMI-CEC when an Xbox One turns on/off.** Although Xbox One
  can turn TV on/off by sending infrared (IR) remote signals, that's not enough in some systems,
  so it also:
- **sends additional CEC commands e.g. to switch receiver inputs when the Xbox One turns on/off.**
  It's often suggested you use a universal remote, e.g. Harmony Hub, to do this and more, but
  remote commands don't trigger when you turn on the Xbox using controllers or voice/assistant, 
  and can conflict with the Xbox's deeper voice/assistant commands (e.g. the "there are two devices
  named Xbox" problem.) It's also increasingly common that devices use CEC to switch inputs,
  so your Xbox may be the last device standing that needs such help.

Not all receivers handle CEC active source commands in the same way. Please run
through *Checking that active source works with an Xbox on my receiver* with a 
Pi you already have before buying anything!

## Hardware needed

This runs on a Raspberry Pi that has 
- a GPIO-compatible 38kHz IR receiver (e.g. TSOP38238, wired to the 3.3v, Ground, and 
  GPIO 17 pins)
- an HDMI cable connected to receiver or TV

The IR receiver must be located with/near the Xbox One so it can receive the Xbox IR blasts. 
For the original Xbox One model you may need an IR extension cable if you don't use Kinect, 
but newer models have an IR emitter in the front panel. See the 
[Xbox support article about IR extension](https://beta.support.xbox.com/help/hardware-network/oneguide-live-tv/use-external-ir-with-xbox-one).

## Setting up CEC-based on/off

TODO:
- Explain Xbox One device control settings, with pictures, including choosing device 
  to use as "TV", but suggest using remote code T2051 and [a corresponding LIRC config](tv-for-xbox-cec.conf)
  to make the remainder of the steps easy. In Device power options, set Xbox to send "On" to TV when
  turning on, and "Off" when turning off, so xbox-cec gets both events. Don't use "Toggle" so that
  xbox-cec  can do different things at on vs. off (it doesn't try to track state of the Xbox.)
- Explain OS, install cec-client, install/configure LIRC, deploy service (see
  [#1](https://github.com/waded/xbox-cec/issues/1))

## Checking that active source works with an Xbox on my receiver

See [#2](https://github.com/waded/xbox-cec/issues/2). xbox-cec can't help you check this just yet.

Alternatively, use `cec-client` to scan existing HDMI-CEC bus to determine device addresses:

`echo scan | cec-client -s -d 1`

Xbox One will show up in the scan, since as of January 2020  doesn't support CEC (thus this
service), but other CEC-enabled devices should. Note `Address` of each. A TV might be at address `0.0.0.0`,
a CEC-enabled receiver at `1.0.0.0`, a device on the receiver's first input at `1.1.0.0`, the second at 
`1.2.0.0`, and so on.

Then try broadcasting an active source CEC command targeting the Xbox's input on the receiver, 
say the third input:

`echo tx 5f:82:13:00 | cec-client -s -d 1` 

and see how your receiver responds. Physical address `1.3.0.0` is expressed as
as `13:00`, with the remainder being opcode (`82` active source), somewhat irrelevant 
source (`5` receiver), and destination (`F` broadcast.)

## Setting up CEC-based input switching

TODO:
- Determining CEC physical address of the Xbox One
- Configuring xbox-cec with custom CEC codes if not opcode 82
