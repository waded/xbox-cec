/boot/config.txt
Uncomment:
#dtoverlay=gpio-ir,gpio_pin=17

Install LIRC this way:
https://www.instructables.com/id/Setup-IR-Remote-Control-Using-LIRC-for-the-Raspber/
up to and including "Step 2: Download .conf File for Your Remote". Here's a remote file.

sudo vi /etc/lirc/lircd.conf.d/tv-for-xbox-cec.conf
pi@raspberrypi:~ $ sudo systemctl restart lircd.service