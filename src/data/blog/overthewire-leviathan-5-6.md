---
title: OverTheWire Leviathan Level 5 -> 6
author: Michael McDonagh
pubDatetime: 2025-03-02T13:00:00Z
slug: overthewire-leviathan-6
featured: false
draft: false
tags:
  - overthewire
  - leviathan
  - linux
ogImage: ""
description: Solution for OverTheWire Leviathan level 6 challenge.
---

## Level Goal  

There is no information for this level, intentionally.

---

## Walkthrough  

Solution for the Overthewire.org [Leviathan level 6](https://overthewire.org/wargames/leviathan/leviathan6.html)

Login to the server using the password obtained from the previous level [Leviathan level 5](/posts/overthewire-leviathan-5).  

username: `leviathan6`  

```bash
ssh leviathan6@leviathan.labs.overthewire.org -p 2223
```

Check the home directory.

```bash
leviathan6@leviathan:~$ ls -al
total 28
drwxr-xr-x  2 root       root       4096 Aug 26  2019 .
drwxr-xr-x 10 root       root       4096 Aug 26  2019 ..
-rw-r--r--  1 root       root        220 May 15  2017 .bash_logout
-rw-r--r--  1 root       root       3526 May 15  2017 .bashrc
-r-sr-x---  1 leviathan7 leviathan6 7452 Aug 26  2019 leviathan6
-rw-r--r--  1 root       root        675 May 15  2017 .profile
```

There is an executable file `leviathan6` with the suid bit set.
When we run `leviathan6` it tells us it expects a 4 digit code.

```bash
leviathan6@leviathan:~$ ./leviathan6 
usage: ./leviathan6 <4 digit code>
```

We can brute force this using a bash script to generate all digits from 0000 to 9999

```bash
leviathan6@leviathan:~$ for i in {0000..9999}; do ./leviathan6 $i; done
```

Now just wait while all digits are tested. When the correct one is used we get a new shell.

```bash
Wrong
Wrong
Wrong
Wrong
Wrong
Wrong
$
```

Using `id` we can see we have a shell as `leviathan7`. We can read the password file directly.

```bash
$ id
uid=12007(leviathan7) gid=12006(leviathan6) groups=12006(leviathan6)

$ cat /etc/leviathan_pass/leviathan7
ahy*******
```
