---
title: OverTheWire Leviathan Level 3 -> 4
author: Michael McDonagh
pubDatetime: 2025-03-02T12:30:00Z
slug: overthewire-leviathan-4
featured: false
draft: false
tags:
  - overthewire
  - leviathan
  - linux
ogImage: ""
description: Solution for OverTheWire Leviathan level 4 challenge.
---

## Level Goal  

There is no information for this level, intentionally.

---

## Walkthrough  

Solution for the Overthewire.org [Leviathan level 4](https://overthewire.org/wargames/leviathan/leviathan4.html)

Login to the server using the password obtained from the previous level [Leviathan level 3](/posts/overthewire-leviathan-3).  

username: `leviathan4`  

```bash
ssh leviathan4@leviathan.labs.overthewire.org -p 2223
```

With no description given first thing we do is check what is in the home directory.

```bash
leviathan4@leviathan:~$ ls -al
total 24
drwxr-xr-x  3 root root       4096 Aug 26  2019 .
drwxr-xr-x 10 root root       4096 Aug 26  2019 ..
-rw-r--r--  1 root root        220 May 15  2017 .bash_logout
-rw-r--r--  1 root root       3526 May 15  2017 .bashrc
-rw-r--r--  1 root root        675 May 15  2017 .profile
dr-xr-x---  2 root leviathan4 4096 Aug 26  2019 .trash
```

There is a directory named `.trash`.  
Change directory into `.trash` and check what it contains.

```bash
leviathan4@leviathan:~$ cd .trash/
leviathan4@leviathan:~/.trash$ ls -al
dr-xr-x--- 2 root       leviathan4 4096 Aug 26  2019 .
drwxr-xr-x 3 root       root       4096 Aug 26  2019 ..
-r-sr-x--- 1 leviathan5 leviathan4 7352 Aug 26  2019 bin
```

There is an executable called `bin` and running it prints out 1's and 0's.

```bash
leviathan4@leviathan:~/.trash$ ./bin
01010100 01101001 01110100 01101000 00110100 01100011 01101111 01101011 01100101 01101001 00001010
```

The 1's and 0's are binary representation of ascii.  
We need to convert the binary back to ascii.

To do this we use Python3 and binascii library.

```bash
leviathan4@leviathan:~/.trash$ python3
Python 3.5.3 (default, Sep 27 2018, 17:25:39) 
[GCC 6.3.0 20170516] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import binascii
>>> n = int('0b0101010001101001011101000110100000110100011000110110111101101011011001010110100100001010' , 2)
>>> s = binascii.unhexlify('%x' % n).decode()
>>> print(s)
Tit*******
```
