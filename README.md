# xbox-cec

This service:

- **turns your TV on when your Xbox One turns on.** Although Xbox
  can turn TVs on (and off) by infrared (IR) signals, that's not enough in some systems,
  so this system also

- **sends additional customizable HDMI-CEC commands, for example to switch receiver input, after turning on the TV**
  
It's often suggested you use a universal remote, like Harmony Hub, to orchestrate input switching
and more, but Harmony won't respond when you turn on the Xbox using controllers, and Harmony's
Google/Alexa support can conflict with the [Xbox's own support for richer voice commands](https://support.xbox.com/en-US/browse/xbox-one/voice-and-digital-assistants).
  
Many game consoles already use CEC to switch inputs, so your Xbox
may be the last device that can't CEC itself to active sourciness. If you have
a Raspberry Pi and a free HDMI input you're within a few dollars (and this service) of what 
you need to fix it.

Not all receivers handle CEC active source commands in the same way. Please run
through *Testing that active source works with an Xbox on my receiver* with a 
Pi you already have before buying anything!

## Project status, contributions

I've (@waded) paused my work on this project, because as-is the source works for my setup, and I expect will continue to until I replace our Xbox One with Xbox Series X, since Microsoft confirmed Series X will have HDMI-CEC support, rather than continue with IR blasters (https://www.windowscentral.com/xbox-series-x-wont-have-spdif-optical-audio-or-ir-blaster).

Feel free to fork for your own purposes, and I'd be happy to review/test and consider approve of PRs if you provide good documentation!

## Hardware needed

This runs on a Raspberry Pi that has 
- a GPIO-compatible 38kHz IR receiver (e.g. TSOP38238, wired to the 3.3v, Ground, and 
  GPIO 17 pins)
- an HDMI cable connected to receiver or TV

The IR receiver must be located so it can receive IR blasts from the Xbox. 
For older Xbox One models you may need an IR extension cable, but newer models 
have an IR emitter in the front panel. See the 
[Xbox support article about IR extension](https://beta.support.xbox.com/help/hardware-network/oneguide-live-tv/use-external-ir-with-xbox-one).

## Set up CEC-based TV on/off and input switch

TODO:
- Explain Xbox One device control settings, with pictures, including choosing device 
  to use as "TV", but suggest using TV remote code T2051 and [the matching LIRC config](tv-for-xbox-cec.conf)
  making the steps easy. In Device power options, set Xbox to send "On" to TV when
  turning on, and "Off" when turning off.
- Install OS, install cec-client, install/configure LIRC, deploy service (see
  [#1](https://github.com/waded/xbox-cec/issues/1))  
- Determine physical address of Xbox One
- Configure xbox-cec with physical address (currently hardcoded in var `xbox_physical` to `12:00`)

## Testing that active source works with an Xbox on my receiver

xbox-cec can't help you test this just yet. See [#2](https://github.com/waded/xbox-cec/issues/2). 

You can use `cec-client` to test instead. Connect the HDMI cable between your Pi and Receiver,
boot your Pi, install `cec-client` (find a recent guide, but `sudo apt-get install cec-utils` is
usually all you need), then scan for devices:

`echo scan | cec-client -s -d 1`

Xbox will not show up in this scan, but other CEC-enabled devices should. Note `Address` 
of each. Your TV should be at address `0.0.0.0`, and if for example a CEC-enabled receiver's at 
`1.0.0.0`, then a device on the receiver's first HDMI input might be at `1.1.0.0`, the second at 
`1.2.0.0`, and so on.

Then try broadcasting an active source CEC command targeting the Xbox's input, using 
a command in this form:

`echo tx 5f:82:<hex words stating Xbox physical address> | cec-client -s -d 1` 

Say Xbox is on the 3rd HDMI input on the receiver, address `1.3.0.0` given the above example.
Physical addresses are expressed to cec-client as two hex words, `13:00` in this case.

So the complete command is:

`echo tx 5f:82:13:00 | cec-client -s -d 1` 

The remaining hex words in the tx command are opcode  (`82`, set active source),
destination (`f`, broadcast), and the somewhat irrelevant requesting source (`5`, 
receiver.)

If this command turned on your TV and switched the receiver over to HDMI 3, you're in
business! If not, make sure you have CEC turned on at all points between the TV and the Xbox.
Note CEC has many names, for example "Anynet+" on Samsung TVs.
