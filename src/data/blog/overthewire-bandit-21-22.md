---
title: OverTheWire Bandit Level 21 -> 22
author: Michael McDonagh
pubDatetime: 2025-03-01T22:40:00Z
slug: overthewire-bandit-22
featured: false
draft: false
tags:
  - overthewire
  - bandit
  - linux
  - cron
ogImage: ""
description: Solution for OverTheWire Bandit level 22 challenge.
---


## Level Goal

A program is running automatically at regular intervals from `cron`, the time-based job scheduler. Look in `/etc/cron.d/` for the configuration and see what command is being executed.

---

## Walkthrough

Solution for the Overthewire.org [Bandit level 21 -> 22](https://overthewire.org/wargames/bandit/bandit22.html)

Login to the server using the password obtained from the previous level [Bandit level 20 -> 21](/posts/overthewire-bandit-21).  

username: `bandit21`  

```bash
ssh bandit21@bandit.labs.overthewire.org -p 2220
```

For this challenge we need to find the cron jobs that are running, these are located in `/etc/cron.d`.  
Let's change the directory to `/etc/cron.d` and see what files are stored there.

```bash
bandit21@bandit:~$ cd /etc/cron.d

bandit21@bandit:/etc/cron.d$ ls -l
total 24
-rw-r--r-- 1 root root  62 May 14  2020 cronjob_bandit15_root
-rw-r--r-- 1 root root  62 Jul 11  2020 cronjob_bandit17_root
-rw-r--r-- 1 root root 120 May  7  2020 cronjob_bandit22
-rw-r--r-- 1 root root 122 May  7  2020 cronjob_bandit23
-rw-r--r-- 1 root root 120 May 14  2020 cronjob_bandit24
-rw-r--r-- 1 root root  62 May 14  2020 cronjob_bandit25_root

bandit21@bandit:/etc/cron.d$
```

There are multiple files but the one we need for this challenge is `cronjob_bandit22`. Let's read what it is doing.

```bash
bandit21@bandit:/etc/cron.d$ cat cronjob_bandit22

@reboot bandit22 /usr/bin/cronjob_bandit22.sh &> /dev/null
* * * * * bandit22 /usr/bin/cronjob_bandit22.sh &> /dev/null
```

According to `cronjob_bandit22` user `bandit22` is running the script `/usr/bin/cronjob_bandit22.sh` every minute.  
What is cronjob_bandit22.sh doing ?

```bash
bandit21@bandit:/etc/cron.d$ cat /usr/bin/cronjob_bandit22.sh 

#!/bin/bash
chmod 644 /tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv
cat /etc/bandit_pass/bandit22 > /tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv
```

The bash script is giving read permission to everyone and only the owner has write permission to the file `/tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv`. It then writing the contents of `/etc/bandit_pass/bandit22` to that file.  
So it is writing the password we need into a file a new file.

We cannot read `/etc/bandit_pass/bandit22` as bandit21 does not have permission but the cronjob has written the password to a file we do have read permissions to. All we need to do is read the file the cronjob created.

```bash
bandit21@bandit:~$ cat /tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv
Yk7owG##########################
 
```
