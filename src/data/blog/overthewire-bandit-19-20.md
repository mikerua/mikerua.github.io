---
title: OverTheWire Bandit Level 19 -> 20
author: Michael McDonagh
pubDatetime: 2025-03-01T22:30:00Z
slug: overthewire-bandit-20
featured: false
draft: false
tags:
  - overthewire
  - bandit
  - linux
ogImage: ""
description: Solution for OverTheWire Bandit level 20 challenge.
---

## Level Goal

To gain access to the next level, you should use the `setuid binary` in the homedirectory.  
Execute it without arguments to find out how to use it.  
The password for this level can be found in the usual place (/etc/bandit_pass), after you have used the `setuid binary`.  

---

## Walkthrough

Solution for the Overthewire.org [Bandit level 19 -> 20](https://overthewire.org/wargames/bandit/bandit20.html)

Login to the server using the password obtained from the previous level [Bandit level 18 -> 19](/posts/overthewire-bandit-19).  

username: `bandit19`  

```bash
ssh bandit19@bandit.labs.overthewire.org -p 2220
```

After logging in we check what is in the home directory. We can see a single file `bandit20-do`.  
Running file on it tells us it is an executable file.

```bash
bandit19@bandit:~$ ls
bandit20-do

bandit19@bandit:~$ file bandit20-do 
bandit20-do: setuid ELF 32-bit LSB executable, Intel 80386, version 1 (SYSV), dynamically linked, interpreter /lib/ld-linux.so.2, for GNU/Linux 2.6.32, BuildID[sha1]=8e941f24b8c5cd0af67b22b724c57e1ab92a92a1, not stripped
```

We are told from the Level Goal that the file is a `setuid` file. A `setuid` (set user id) file allows a user to run commands with the permissions of the file owner or group.

Looking at the file owner and group we can see the owner is `bandit20` and group is `bandit19`.  Going by the who the file owner is and file's name we can assume running `bandit20-do` will allow us to run commands as `bandit20`.  

```bash
bandit19@bandit:~$ ls -al
total 28
drwxr-xr-x  2 root     root     4096 May  7  2020 .
drwxr-xr-x 41 root     root     4096 May  7  2020 ..
-rwsr-x---  1 bandit20 bandit19 7296 May  7  2020 bandit20-do
-rw-r--r--  1 root     root      220 May 15  2017 .bash_logout
-rw-r--r--  1 root     root     3526 May 15  2017 .bashrc
-rw-r--r--  1 root     root      675 May 15  2017 .profile
bandit19@bandit:~$
```

When we run the file it tells us how to use it correctly. The example given is the `id` command.  
`id` is used to see what the current user and group ids are.  
When we run `id` by itself we can see that uid, gid and group are `bandit19`.  

However when we run `./bandit-20 id` we get a new id, the euid(effective user id) is set to bandit20.  
This means that the `id` command was run as user bandit20.

```bash
bandit19@bandit:~$ ./bandit20-do 
Run a command as another user.
  Example: ./bandit20-do id

bandit19@bandit:~$ id
uid=11019(bandit19) gid=11019(bandit19) groups=11019(bandit19)

bandit19@bandit:~$ ./bandit20-do id
uid=11019(bandit19) gid=11019(bandit19) euid=11020(bandit20) groups=11019(bandit19)
```

Now that we can run commands as bandit20 we can simply read bandit20 password directly from `/etc/bandit_pass/bandit20`.

```bash
bandit19@bandit:~$ ./bandit20-do cat /etc/bandit_pass/bandit20
GbKksE##########################
```
