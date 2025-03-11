---
title: OverTheWire Bandit Level 6 -> 7
author: Michael McDonagh
pubDatetime: 2025-02-22T23:05:00Z
slug: overthewire-bandit-7
featured: false
draft: false
tags:
  - overthewire
  - bandit
  - linux
ogImage: ""
description: Solution for OverTheWire Bandit level 7 challenge.
---

## Level Goal

The password for the next level is stored `somewhere on the server` and has all of the following properties:

* owned by user bandit7
* owned by group bandit6
* 33 bytes in size

---

## Walkthrough

Login to the server using the password obtained from the previous level [Bandit level 5 -> 6](/posts/overthewire-bandit-6).  

username: `bandit6`  

```bash
ssh bandit6@bandit.labs.overthewire.org -p 2220
```

Similar to the previous level we need to use the `find` command to search for a file with specific properties.  

Use `find` again to search the whole server `/`  
Looking for files not directories `-type f`  
Files owned by the user bandit7 `-user bandit7`  
Files owned by the group bandit6 `-group bandit6`  
Files with a size of 33 bytes `-size 33c`.  

```bash
bandit6@bandit:~$ find / -type f -user bandit7 -group bandit6 -size 33c
/var/lib/dpkg/info/bandit7.password
bandit6@bandit:~$ cat /var/lib/dpkg/info/bandit7.password
HKBPTKQ##########################
```
