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
```bash
/system/bin/app_process -Djava.library.path=$(echo /data/app/*/xtr.keymapper*/lib/x86_64) -Djava.class.path=$(echo /data/app/*/xtr.keymapper*/base.apk) / xtr.keymapper.server.RemoteServiceShell
```
Use the above command if your Android ROM has storage issues and XtMapper can't write the script to storage.  
It was changed from RemoteService to RemoteServiceShell in v2.1.1.
:::

## Non-rooted devices 
Since v2.1.1 XtMapper supports non-rooted devices.
Install Shizuku and authorize XtMapper from Shizuku app. https://shizuku.rikka.app  
Additionally “Use Shizuku” should be enabled in XtMapper Settings > Misc.
A workaround using adb shell may be needed on certain devices: https://developer.android.com/about/versions/12/behavior-changes-all#test-untrusted-touch-events



## Why activate?
In Android, for security reasons user apps are not allowed to access system APIs required for injecting motion (touch) events.  
The script executes Xtmapper remote service with higher privileges (adb shell / root).  
The user app (XtMapper) communicates with remote service through Android binder/AIDL interface for IPC.
