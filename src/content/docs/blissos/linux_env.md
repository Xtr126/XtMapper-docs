---
title: Linux subsystem
description: Setup a Linux development environment in Bliss OS.  
---
  
Provides 100% CPU,RAM,GPU performance same as running Linux natively. OpenGL and Vulkan works. X11 renders directly using KMS/DRM to screen.  
But you have access to two OS simultaneously this way with less resource consumption unlike other methods like VMs/containers.

- Have an Linux installation on the same machine.  
- Copying `/run/udev` from a booted Linux to the chroot rootfs or Xorg doesn’t recognize keyboard and mouse  

Boot into the Linux installation and copy /run/udev 

```bash
cp -a /run/udev ~/Documents  
```
Then after rebooting and chroot into linux from Android, symlink it to /run
```bash
sudo ln -s ~/Documents/udev /run/ 
```

Make a script for chroot into it, this can be taken for reference.  
```bash title="arch-chroot.sh"
#!/data/adb/ksu/bin/busybox sh
USER=user
# Already mounted
test -f /mnt/arch/etc/os-release && exec chroot /mnt/arch /bin/su $USER -l "$@"
[ ! -d /mnt/arch ] && mkdir /mnt/arch
mount /dev/block/nvme0n1p2 /mnt/arch -o noatime
mount /dev/block/nvme0n1p1 /mnt/arch/boot
cd /mnt/arch

mount -t proc proc proc/ -o nosuid,noexec,nodev
mount -t sysfs sys sys/ -o nosuid,noexec,nodev
mount -o bind /dev dev/ -o mode=0755,nosuid
mount -o bind /system/lib/modules usr/lib/modules
mount -o rw,nosuid,noexec,gid=5,mode=620,ptmxmode=000 -t devpts devpts dev/pts
mount -t tmpfs tmpfs tmp/

mkdir dev/shm && mount -t tmpfs shmfs dev/shm -o rw,nosuid,nodev,inode64
chmod 777 tmp dev/shm

# For X11 server
chroot /mnt/arch /bin/chown -hR $USER /dev/input /dev/dri /dev/tty1
ls /dev/nvme0n1p2 2>/dev/null || ln -s /dev/block/* /dev/
# Usually your router IP address, required for networking
echo nameserver 192.168.1.1 > etc/resolv.conf 
exec chroot /mnt/arch /bin/su $USER -l "$@"
```
openvt works only on Bliss 15.10/14.10.1/16.9 and newer.  
In a [root shell](../termux):
```bash
/data/adb/ksu/bin/busybox openvt -s arch-chroot.sh
```
Now you should enter a tty with the login shell.  
Use Alt+F7 / ALt+F1 / Alt+(left/right) arrow keys to switch between Android and Linux.  
If you have [xinitrc](https://wiki.archlinux.org/title/xinit) configured:
```bash
dbus-run-session startx
```
Ctrl+Alt+F7 / Ctrl+Alt+F1 to switch between Android and Linux.
