---
title: OverTheWire Bandit Level 23 -> 24
author: Michael McDonagh
pubDatetime: 2025-03-01T22:50:00Z
slug: overthewire-bandit-24
featured: false
draft: false
tags:
  - overthewire
  - bandit
  - linux
  - cron
ogImage: ""
description: Solution for OverTheWire Bandit level 24 challenge.
---

## Level Goal

A program is running automatically at regular intervals from cron, the time-based job scheduler. Look in `/etc/cron.d/` for the configuration and see what command is being executed.

**NOTE:** This level requires you to create your own first shell-script. This is a very bcd ig step and you should be proud of yourself when you beat this level!

**NOTE 2:** Keep in mind that your shell script is removed once executed, so you may want to keep a copy around…

---

## Walkthrough

Solution for the Overthewire.org [Bandit level 23 -> 24](https://overthewire.org/wargames/bandit/bandit24.html)

Login to the server using the password obtained from the previous level [Bandit level 22 -> 23](/posts/overthewire-bandit-23).  

username: `bandit23`  

```bash
ssh bandit23@bandit.labs.overthewire.org -p 2220
```

This level is cron job related like the previous few levels so first thing to do is check the `/etc/cron.d` directory.

```bash
bandit23@bandit:~$ cd /etc/cron.d

bandit23@bandit:/etc/cron.d$ ls
cronjob_bandit15_root  cronjob_bandit22  cronjob_bandit24
cronjob_bandit17_root  cronjob_bandit23  cronjob_bandit25_root
```

This time the cronjob we need to investigate is `cronjob_bandit24`.  

```bash
bandit23@bandit:/etc/cron.d$ cat cronjob_bandit24

@reboot bandit24 /usr/bin/cronjob_bandit24.sh &> /dev/null
* * * * * bandit24 /usr/bin/cronjob_bandit24.sh &> /dev/null
```

The cronjob is running the script `cronjob_bandit24.sh` as user bandit24 every minute. So let's see what it is doing.  

```bash
bandit23@bandit:/etc/cron.d$ cat /usr/bin/cronjob_bandit24.sh 

#!/bin/bash

myname=$(whoami)

cd /var/spool/$myname
echo "Executing and deleting all scripts in /var/spool/$myname:"
for i in * .*;
do
    if [ "$i" != "." -a "$i" != ".." ];
    then
        echo "Handling $i"
        owner="$(stat --format "%U" ./$i)"
        if [ "${owner}" = "bandit23" ]; then
            timeout -s 9 60 ./$i-
        fi
        rm -f ./$i
    fi
done
```

The bash script is doing:

* Running `whoami` and storing the value in `myname` (bandit24 in this instance)
* Changing into the `/var/spool/bandit24` directory

* for each **file** in `/var/spool/bandit24` (files and hidden files)
  * if **file** is not `.` (current directory) and  **file** is not `..`(parent directory)
    * print 'Handling **file**' to the screen
    * Assign the name of the owner of the **file** to a variable "owner"
    * if "owner" equals 'bandit23'
      * wait 60 seconds and then run the **file**
    * delete **file**

Since we are bandit23, any file we create and place into `/var/spool/bandit24`  
will be run as user bandit24. The file is deleted after being run.

We can create a script to read the password file `/etc/bandit_pass/bandit24` and save it in a new file elsewhere.  

Create a file named `get_bandit24_pass` in `/tmp`.  
Write this line inside the file.

```bash
cat /etc/bandit_pass/bandit24 > /tmp/pass_for_bandit24
```

Give the file execute permission so it can be run and then copy it to the `/var/spool/bandit24` directory.

```bash
bandit23@bandit:/tmp$ chmod +x get_bandit24_pass

bandit23@bandit:/tmp$ cp get_bandit_pass /var/spool/bandit24/
```

Now wait 60 seconds and check for a file named `pass_for_bandit24` in tmp.
It will contain the password for bandit24.

```bash
bandit23@bandit:/tmp$ cat pass_for_bandit24 
UoMYTr##########################

```
