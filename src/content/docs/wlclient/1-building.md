---
title: Building
description: Building the client form source.
---
You will need to have some system dependencies such as a C compiler installed for compiling it from source with make.  

    # Arch Linux
    sudo pacman -S wayland-protocols libxkbcommon
    
    # Ubuntu
    sudo apt install wayland-protocols libwayland-client0 libwayland-dev libxkbcommon-dev


Download the source
```
git clone https://github.com/Xtr126/wayland-getevent
cd wayland-getevent
```
Run make to build the client binary

    $ make

A script build.sh is included to download all dependencies and build without requiring libxkbcommon, wayland to be installed on system. Requires meson and ninja. 

    $ ./build.sh
You can also download executable binary from last successful build: [GitHub actions](https://github.com/Xtr126/wayland-getevent/actions)
