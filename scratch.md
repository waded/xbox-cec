/boot/config.txt
Uncomment:
#dtoverlay=gpio-ir,gpio_pin=17

Install LIRC this way:
https://www.instructables.com/id/Setup-IR-Remote-Control-Using-LIRC-for-the-Raspber/
up to and including "Step 2: Download .conf File for Your Remote". Here's a remote file.

sudo vi /etc/lirc/lircd.conf.d/SamsungTVOnOff.conf
pi@raspberrypi:~ $ sudo systemctl restart lircd.service

begin remote

  name  SamsungTVOnOff
  bits           16
  flags SPACE_ENC|CONST_LENGTH
  eps            30
  aeps          100

  header       4493  4410
  one           595  1624
  zero          595   509
  ptrail        589
  pre_data_bits   16
  pre_data       0xE0E0
  gap          107567
  toggle_bit_mask 0x0
  frequency    38000

      begin codes
          KEY_POWER                   0x9966 #On
          KEY_POWER2                  0x19E6 #Off
      end codes

end remote