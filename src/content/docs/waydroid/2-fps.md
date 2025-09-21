---
title: Refresh rate
description: Change refresh rate or FPS of waydroid.
---

## Override the refresh rate of waydroid
Add `--refresh-mhz <value in mHz>` to your cage_xtmapper.sh command-line to override the refresh rate.  
For example to force a 30Hz refresh for waydroid or to lock to 30FPS: 
```bash
cage_xtmapper.sh ... --refresh-mhz 30000
```
## How to find your display's native refresh rate
Run `cage_xtmapper.sh --print-output-info` in a terminal to print refresh rate, width and height of outputs.
```bash
~ ❯❯❯ cage_xtmapper.sh --print-output-info
== Output mode ==
Width: 1366
Height: 768
Refresh: 60000 mHz (60.0 Hz)
Flags: CURRENT (0x1)
== Output mode ==
Width: 1920
Height: 1080
Refresh: 60000 mHz (60.0 Hz)
Flags: CURRENT (0x1)
```

## Technical
wlroots wayland backend uses forced adaptive sync and the refresh rate is always zero.

But Waydroid assumes a 60hz refresh rate by default and locks it to 60hz if compositor didn't provide a mode with a refresh rate higher than 60000 (mHz).

https://github.com/waydroid/android_hardware_waydroid/blob/922d7a5238706a3560a9fd9afa36356c436d01a8/hwcomposer/wayland-hwc.cpp#L1381

https://github.com/waydroid/android_hardware_waydroid/blob/922d7a5238706a3560a9fd9afa36356c436d01a8/hwcomposer/hwcomposer.cpp#L723

cage-xtmapper patches wlroots and cage to allow overriding the refresh rate, using the value from the `XTMAPPER_REFRESH` environment variable. 


