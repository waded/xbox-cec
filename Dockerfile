FROM homeassistant/armv7-homeassistant-base:5.4 
MAINTAINER Wade Dorrell <wade@dorrells.org>

RUN apk --no-cache add \ 
  raspberrypi raspberrypi-libs eudev-libs p8-platform \
  build-base cmake eudev-dev raspberrypi-dev p8-platform-dev
 
RUN \
  cd \ 
  && git clone -b libcec-4.0.4 https://github.com/Pulse-Eight/libcec \
  && mkdir libcec/build \ 
  && cd libcec/build \ 
  && cmake -DCMAKE_INSTALL_PREFIX:PATH=/usr/local -DRPI_INCLUDE_DIR=/opt/vc/include -DRPI_LIB_DIR=/opt/vc/lib .. \
  && make -j4 \
  && make install

ENV LD_LIBRARY_PATH=/opt/vc/lib:${LD_LIBRARY_PATH}
