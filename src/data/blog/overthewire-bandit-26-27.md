---
title: OverTheWire Bandit Level 26 -> 27
author: Michael McDonagh
pubDatetime: 2025-03-01T23:05:00Z
slug: overthewire-bandit-27
featured: false
draft: false
tags:
  - overthewire
  - bandit
  - linux
ogImage: ""
description: Solution for OverTheWire Bandit level 27 challenge.
---

## Level Goal

Good job getting a shell! Now hurry and grab the password for bandit27!

---

## Walkthrough

Solution for the Overthewire.org [Bandit level 26 -> 27](https://overthewire.org/wargames/bandit/bandit27.html)

Login to the server using the steps in the previous level [Bandit level 25 -> 26](/posts/overthewire-bandit-26).

Having completed bandit level 25 -> 26 we now have a bash shell on bandit26.

The first thing to do is check the home directory.

```bash
bandit26@bandit:~$ ls -al
total 36
drwxr-xr-x  3 root     root     4096 May  7  2020 .
drwxr-xr-x 41 root     root     4096 May  7  2020 ..
-rwsr-x---  1 bandit27 bandit26 7296 May  7  2020 bandit27-do
-rw-r--r--  1 root     root      220 May 15  2017 .bash_logout
-rw-r--r--  1 root     root     3526 May 15  2017 .bashrc
-rw-r--r--  1 root     root      675 May 15  2017 .profile
drwxr-xr-x  2 root     root     4096 May  7  2020 .ssh
-rw-r-----  1 bandit26 bandit26  258 May  7  2020 text.txt
```

There is a `bandit27-do` file and it has the setuid bit set.  
```-rwsr-x---  1 bandit27 bandit26 7296 May  7  2020 bandit27-do```

This means we can use `bandit27-do` to run files with elevated priviledges.

```bash
bandit26@bandit:~$ ./bandit27-do
Run a command as another user.
  Example: ./bandit27-do id

bandit26@bandit:~$ ./bandit27-do id
uid=11026(bandit26) gid=11026(bandit26) euid=11027(bandit27) groups=11026(bandit26)
```

`bandit27-do` takes another command as its argument and then runs that command as user bandit27.  
When running `bandit27-do id` we can see the euid is bandit27.

All we need to do now is read the password file for bandit27.

```bash
bandit26@bandit:~$ ./bandit27-do cat /etc/bandit_pass/bandit27
3ba311##########################
```
