---
title: Wi-Fi hotspot
description: Enabling Wi-Fi hotspot functionality on Bliss OS and other Android-x86 based systems using the hostapd HAL from Cuttlefish
---

:::note[About]
Enabling Wi-Fi hotspot functionality on Bliss OS and other Android-x86 based systems using the hostapd HAL from Cuttlefish system images
:::

Bliss OS and other Android-x86 based systems offer a smooth and refined experience for desktop and laptop users, but they sometimes lack features present in a conformant OEM Android device. One such feature is the Wi-Fi hotspot functionality. While awaiting for Bliss OS developers to implement it properly, I discovered a workaround to allow users enabling Wi-Fi hotspot functionality using the hostapd HAL binaries extracted from Google's cuttlefish system images available at [Android CI](http://ci.android.com/).

:::danger[Important]
This guide is specifically for Android 14. Android 12 and earlier versions do not work as I have tested. Android 13 may work, but it has not been tested. Cuttlefish Android 14 GSI image includes the hostapd HAL but not Android 12. 
:::

### Prerequisites

Before you begin, ensure you have:
- A Bliss OS or Android-x86 system installed.
- Unpacked system.sfs to allow modification: https://docs.blissos.org/knowledgebase/troubleshooting/remount-system-as-read-write/.
- Extract the required files from cuttlefish images: [Android CI](http://ci.android.com/) or download a .zip containing the binaries from: https://t.me/blissx86/261552.
- A high degree of Linux terminal skills, as it involves complex file manipulations and system modifications.

### Steps to Enable Wi-Fi Hotspot

#### 1. Download the Required Files

The .zip file contains the necessary files:
- `com.android.wifi.hal.apex_payload`
- `com.google.cf.wifi.rc`
- `hostapd.log`
- `system/init/init.cutf_cvm.rc`
- `vendor/vintf/manifest/android.hardware.wifi.hostapd.xml`

#### 2. Prepare the System Image

1. **Resize the System Partition**

   - Unpack the `system.sfs` file as mentioned before: https://docs.blissos.org/knowledgebase/troubleshooting/remount-system-as-read-write/.
   - Resize the `system.img` file using the `resize2fs` command. Currently it is around 4GB in size, so we will increase its size to 5GB to accommodate the new files:

     ```sh
     resize2fs system.img 5G
     ```

2. **Mount the System Image**

   - Mount the resized `system.img` to a directory:

     ```sh
     mkdir /tmp/system_img
     mount -o loop system.img /tmp/system_img
     ```

#### 3. Install the Apex Payload containing the hostapd HAL

1. **Prepare the Directory**

   - Create the necessary directory for the Apex payload:

     ```sh
     mkdir -p /tmp/system_img/system/apex/com.android.wifi.hal
     ```

2. **Mount the Apex Payload**

   - Loop mount `com.android.wifi.hal.apex_payload` read-only and copy its contents preserving permissions and SELinux context:

     ```sh
     mkdir /tmp/apex_payload
     mount -o loop,ro com.android.wifi.hal.apex_payload /mnt/apex_payload
     cp -a /mnt/apex_payload/* /tmp/system_img/system/apex/com.android.wifi.hal/
     ```

#### 4. Edit init.rc files
`init.cutf_cvm.rc` contains the lines to be added to init.bliss_x86_64.rc for creating the necessary directories required for hostapd to function.  
`com.google.cf.wifi.rc` contains the lines to be added to init.bliss_x86_64.rc to start a hostapd service.

1. **Edit `/tmp/system_img/init.bliss_x86_64.rc` to include the hostapd service**
     ```sh
     ...
    service hostapd /apex/com.android.wifi.hal/bin/hw/hostapd
        interface aidl android.hardware.wifi.hostapd.IHostapd/default
        class main
        capabilities NET_ADMIN NET_RAW
        user wifi
        group wifi net_raw net_admin
        disabled
        oneshot
     ...
     ```

2. **Edit `/tmp/system_img/init.bliss_x86_64.rc` to add the code for creating /data/vendor/wifi/hostapd/sockets**
     ```diff lang="bash"
     on post-fs-data
        # Create the directories used by the Wireless subsystem
        mkdir /data/vendor/wifi 0771 wifi wifi

     +   mkdir /data/vendor/wifi/hostapd 0770 wifi wifi
     +   mkdir /data/vendor/wifi/hostapd/sockets 0770 wifi wifi

        mkdir /data/vendor/wifi/wpa 0770 wifi wifi
        mkdir /data/vendor/wifi/wpa/sockets 0770 wifi wifi
        mkdir /data/misc/dhcp 0770 dhcp dhcp
        mkdir /data/misc/hcid 0770 bluetooth bluetooth

     ```

3. **Modify the system VINTF Manifest**  
    - Copy `android.hardware.wifi.hostapd.xml` to the VINTF manifest directory:
    ```sh
    cp vendor/vintf/manifest/android.hardware.wifi.hostapd.xml /tmp/system_img/system/vendor/etc/vintf/manifest/android.hardware.wifi.hostapd.xml
    ```

Further reading:
1. https://source.android.com/docs/core/architecture/aidl/dynamic-aidl   
2. https://android.googlesource.com/platform/system/core/+/master/init/README.md  
3. https://source.android.com/docs/core/architecture/vintf/objects


#### 5. Apply Changes and Reboot

1. **Unmount and Repack**

   - Unmount the system image:

     ```sh
     umount /tmp/system_img
     ```

   - Repack `system.img` if necessary.

2. **Reboot Your System**

   - Restart your system for the changes to take effect. After rebooting, you should be able to use the Wi-Fi hotspot feature.
  
  
  
:::danger[Important] 
:::
This workaround provides a temporary solution for enabling Wi-Fi hotspot functionality on Bliss OS and Android-x86 systems till it is fixed. This is written solely for the purpose of sharing knowledge.  

**Hardware Limitations**

   - This workaround allows you to share a connection not being used by your Wi-Fi adapter, such as Ethernet or mobile data. However, not all hardware supports sharing the same Wi-Fi connection on the same adapter. Not all Wi-Fi adapters can function as both a station (client) and an access point (AP) simultaneously with Linux drivers.

   - To potentially overcome this limitation, hostapd can be configured to use a different Wi-Fi interface (e.g`wlan1` instead of `wlan0`). This can be done by modifying the configuration file provided to hostapd. It is yet to be investigated. https://source.android.com/docs/core/connect/wifi-sta-ap-concurrency
