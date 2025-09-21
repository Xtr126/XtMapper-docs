---
title: Customize window
description: Customization options for cage_xtmapper window.
---
## Use a custom width/height
By default the fullscreen width and height of the output is used.
Add `--window-width <width> --window-height <height>` to your cage_xtmapper.sh command-line to use a custom width and height.  
For example to use a 1280x720 window size:
```bash
cage_xtmapper.sh ... --window-width 1280 --window-height 720
```
## Show title bar
cage-xtmapper patches wlroots to not show the title bar by default for a borderless experience.
To show the title bar, add `--window-show-title-bar` to your cage_xtmapper.sh command-line.  
```bash
cage_xtmapper.sh ... --window-show-title-bar
```