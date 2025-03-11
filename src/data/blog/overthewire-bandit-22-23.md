---
title: OverTheWire Bandit Level 22 -> 23
author: Michael McDonagh
pubDatetime: 2025-03-01T22:45:00Z
slug: overthewire-bandit-23
featured: false
draft: false
tags:
  - overthewire
  - bandit
  - linux
  - cron
ogImage: ""
description: Solution for OverTheWire Bandit level 23 challenge.
---

## Level Goal

A program is running automatically at regular intervals from `cron`, the time-based job scheduler. Look in `/etc/cron.d/` for the configuration and see what command is being executed.

`NOTE:` Looking at shell scripts written by other people is a very useful skill. The script for this level is intentionally made easy to read. If you are having problems understanding what it does, try executing it to see the debug information it prints.

---

## Walkthrough

Solution for the Overthewire.org [Bandit level 22 -> 23](https://overthewire.org/wargames/bandit/bandit23.html)

Login to the server using the password obtained from the previous level [Bandit level 21 -> 22](/posts/overthewire-bandit-22).  

username: `bandit22`  

```bash
ssh bandit22@bandit.labs.overthewire.org -p 2220
```

Like the previous level we are looking for a job in the `/etc/cron.d` directory.

```bash
bandit22@bandit:~$ cd /etc/cron.d
bandit22@bandit:/etc/cron.d$ ls -l
total 24
-rw-r--r-- 1 root root  62 May 14  2020 cronjob_bandit15_root
-rw-r--r-- 1 root root  62 Jul 11  2020 cronjob_bandit17_root
-rw-r--r-- 1 root root 120 May  7  2020 cronjob_bandit22
-rw-r--r-- 1 root root 122 May  7  2020 cronjob_bandit23
-rw-r--r-- 1 root root 120 May 14  2020 cronjob_bandit24
-rw-r--r-- 1 root root  62 May 14  2020 cronjob_bandit25_root
```

Last time we used `cronjob_bandit22` so this time we use `cronjob_bandit23`.  

```bash
bandit22@bandit:/etc/cron.d$ cat cronjob_bandit23
@reboot bandit23 /usr/bin/cronjob_bandit23.sh &> /dev/null
* * * * * bandit23 /usr/bin/cronjob_bandit23.sh &> /dev/null

bandit22@bandit:/etc/cron.d$ 
```

It looks like `/usr/bin/cronjob_bandit23.sh` is running each minute and with user `bandit23's` permissions.

We go to `/usr/bin/cronjob_bandit23.sh` and read what it is doing.

```bash
#!/bin/bash

myname=$(whoami)
mytarget=$(echo I am user $myname | md5sum | cut -d ' ' -f 1)

echo "Copying passwordfile /etc/bandit_pass/$myname to /tmp/$mytarget"

cat /etc/bandit_pass/$myname > /tmp/$mytarget
```

Let's take the script line by line:

- `#!/bin/bash` Tells linux how to run the file
- `myname=$(whoami)` Run the whoami command and store the value in myname variable
- `mytarget=$(echo I am user $myname | md5sum | cut -d ' ' -f 1)`
  - `echo I am user $myname` Print text to the terminal screen
  - `md5sum` Create a hash digest (unique identifier) of the text
  - `cut -d ' ' -f 1` Split the text up by space and return the first part.
  - Store the result in the mytarget variable
- `echo "Copying passwordfile /etc/bandit_pass/$myname to /tmp/$mytarget"` Print text to the screen informing user what is happening
- `cat /etc/bandit_pass/$myname > /tmp/$mytarget` Finally copying a password from /etc/bandit_pass to a file in /tmp.

If we run the script now `myname` will contain `bandit22`. It will then create a hash and copy the password stored in `/etc/bandit_pass/bandit22` to a file in `/tmp` using the hash as its name.

```bash
bandit22@bandit:~$ /usr/bin/cronjob_bandit23.sh
Copying passwordfile /etc/bandit_pass/bandit22 to /tmp/8169b67bd894ddbb4412f91573b38db3

bandit22@bandit:~$ cat /tmp/8169b67bd894ddbb4412f91573b38db3
Yk7owG##########################
bandit22@bandit:~$
```

`Bandit22's` password is something we already know. When the cronjob runs the bash script it is doing so as user `bandit23`, so whoami would return `bandit23` and the script would then save `bandit23's` password in a file in /tmp.

We can find out what the file name is by running this line of the bash script.

```bash
echo I am user $myname | md5sum | cut -d ' ' -f 1)
```

When we replace $myname with bandit23 we get the name of the file in /tmp containing the password.

```bash
bandit22@bandit:~$ echo I am user bandit23 | md5sum | cut -d ' ' -f 1
8ca319486bfbbc3663ea0fbe81326349

bandit22@bandit:~$ cat /tmp/8ca319486bfbbc3663ea0fbe81326349
jc1udX##########################
```
