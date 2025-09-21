---
title: Disable logging
description: Disable colored logcat output in the terminal.
---
To disable colored logcat output to the terminal, add `--xtmapper-args --no-logcat` to the end of the cage_xtmapper.sh command-line. Note that all arguments after `--xtmapper-args` will be passed to the [XtMapper app_process](../../guides/activation).
```bash
cage_xtmapper.sh ... --xtmapper-args --no-logcat
```
