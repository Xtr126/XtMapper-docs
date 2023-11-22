---
title: Accessing a root shell
description: How to get access to a root shell on termux in Bliss OS
---
This page describes how to get access to a root shell on Bliss OS for debugging purposes. 

## 1. Open KernelSU from app drawer
![image](../../assets/launcher_kernelsu.png)


## 2. Find Termux in apps list 
![image](../../assets/kernelsu_termux.png)
:::note
Enable `Show system apps` from the 3-dot menu if Termux is not visible.
:::
### Enable superuser
![image](../../assets/kernelsu_termux_root.png)

## 3. Launch Termux from app drawer
![image](../../assets/launcher_termux.png)
### Running commands as root
Type `su` and enter for a root shell.  
Some useful commands available on Bliss OS are listed below:
- `/system_ext/bin/htop` Process viewer
- `/system_ext/bin/nano` Edit text files
- `alsa_mixer` Audio configuration

![image](../../assets/termux_su.png)
