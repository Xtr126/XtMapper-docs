---
title: Linux subsystem
description: Setup a Linux development environment in Bliss OS.  
---
  
Provides 100% CPU,RAM,GPU performance same as running Linux natively. OpenGL and Vulkan works. X11 renders directly using KMS/DRM to screen. But you have access to two OS simultaneously this way with less resource consumption unlike other methods like VMs/containers.

- Have an Linux installation on the same machine.  
- A script for chroot into it  
- Fixing permissions on `/dev/input` and `/dev/dri` 
- Copying `/run/udev` from a booted Linux to the chroot rootfs or Xorg doesn’t recognize keyboard and mouse
```bash
/data/adb/ksu/bin/busybox openvt -s arch-chroot.sh
```

```bash title="arch-chroot.sh"
#!/data/adb/ksu/bin/busybox sh
USER=user
test -f /mnt/arch/pacman.conf && exec chroot /mnt/arch /bin/su $USER -l "$@"
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
#openvt -s chroot /mnt/arch /usr/bin/su $USER -l &
#chmod 777 /dev/tty2
chroot /mnt/arch /bin/chown -hR $USER /dev/input /dev/dri
ls /dev/nvme0n1p2 2>/dev/null || ln -s /dev/block/* /dev/
echo nameserver 192.168.1.1 > etc/resolv.conf
mkdir tmp/x
exec chroot /mnt/arch /bin/su $USER -l "$@"
```