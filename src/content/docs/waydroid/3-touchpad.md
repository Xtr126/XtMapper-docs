---
title: Touchpad
description: Touchpad specifics for waydroid.
---
Direct touchmap mode feature doesn't work for waydroid since uinput is not avaiable in the container, but we can use a simple udev hack.  
That  is, replacing `ID_INPUT_TOUCHPAD` with `ID_INPUT_TOUCHSCREEN` in the udev database.  
Here's a single-line command to do that easily:
```bash
 sudo find /run/udev -type f -exec sed -i 's/ID_INPUT_TOUCHPAD/ID_INPUT_TOUCHSCREEN/g' {} \;
```
To revert:
```bash
 sudo find /run/udev -type f -exec sed -i 's/ID_INPUT_TOUCHSCREEN/ID_INPUT_TOUCHPAD/g' {} \;
```
On Plasma, you can enable "Touch points" from System Settings > Window Management > Desktop effects to visualize touches.
