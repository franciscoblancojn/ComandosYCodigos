#!/bin/bash
sudo fuser -vki  /var/lib/dpkg/lock
sudo rm -f /var/lib/dpkg/lock
sudo dpkg --configure –a
sudo apt-get autoremove
sleep 1s
echo Más información en: https://ayudalinux.com/como-solucionar-el-error-no-se-pudo-bloquear-var-lib-dpkg-lock/
