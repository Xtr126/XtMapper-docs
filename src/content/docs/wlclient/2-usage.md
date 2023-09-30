---
title: Usage
description: Running the client.
---
Requires latest XtMapper APK for using with the client. You can download it from last successful build: [GitHub actions](https://github.com/Xtr126/XtMapper/actions)

    $ chmod a+x ./client
    $ ./client
Push client binary when container is running with adb

    $ adb push ./client /data/local/tmp
Or copy it (requires root privileges)

    # cp -a ./client ~/.local/share/waydroid/data/local/tmp/client
Enter waydroid shell 

    sudo waydroid shell
Execute binary and pipe in wayland events

    export XDG_RUNTIME_DIR=$(getprop waydroid.xdg_runtime_dir) 
    export WAYLAND_DISPLAY=$(getprop waydroid.wayland_display) 
    /data/local/tmp/client | sh /sdcard/Android/data/xtr.keymapper/files/xtMapper.sh --wayland-client
This will create an invisible wayland window named "XtMapper" from which keyboard and mouse input events are captured and then forwarded to XtMapper.  
For it to work as intended, it's size should be same as that of the waydroid window and overlay the waydroid window.  

![image](https://github.com/Xtr126/wayland-getevent/assets/80520774/bd0d3df7-eb92-4816-8c67-506175709f23)
