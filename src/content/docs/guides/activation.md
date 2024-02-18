---
title: Activation
description: Documentation for activation process.
---
Open a [root shell](../../blissos/termux) in termux and run the script: 
```bash
sh /sdcard/Android/data/xtr.keymapper/files/xtMapper.sh
```
Use start button to start/stop service. When service is running, drag down notification panel and click on the notification to launch editor.

:::note[Alternate method]
This command is for XtMapper v2.x only.  
It may be changed at any time or might not work.  
```bash
/system/bin/app_process -Djava.library.path=$(echo /data/app/*/xtr.keymapper*/lib/x86_64) -Djava.class.path=$(echo /data/app/*/xtr.keymapper*/base.apk) / xtr.keymapper.server.RemoteService
```
This command is likely only needed if your Android ROM has storage issues and XtMapper can't write the script to storage. 
:::

## Why activate?
In Android, for security reasons user apps are not allowed to access system APIs required for injecting motion (touch) events.  
The script executes Xtmapper remote service with higher privileges (adb shell / root).  
The user app (XtMapper) communicates with remote service through Android binder/AIDL interface for IPC.