---
title: OverTheWire Bandit Level 15 -> 16
author: Michael McDonagh
pubDatetime: 2025-03-01T22:00:00Z
slug: overthewire-bandit-16
featured: false
draft: false
tags:
  - overthewire
  - bandit
  - linux
ogImage: ""
description: Solution for OverTheWire Bandit level 16 challenge.
---

## Level Goal

The password for the next level can be retrieved by submitting the password of the current level to `port 30001 on localhost` using SSL encryption.

`Helpful note: Getting “HEARTBEATING” and “Read R BLOCK”? Use -ign_eof and read the “CONNECTED COMMANDS” section in the manpage. Next to ‘R’ and ‘Q’, the ‘B’ command also works in this version of that command…`

---

## Walkthrough

Solution for the Overthewire.org [Bandit level 15 -> 16](https://overthewire.org/wargames/bandit/bandit16.html)

Login to the server using the password obtained from the previous level [Bandit level 14 -> 15](/posts/overthewire-bandit-15).  

username: `bandit15`  

```bash
ssh bandit15@bandit.labs.overthewire.org -p 2220
```

Similar to previous challenge we need to open a connection to a port on localhost, the difference this time is that we need to use encryption.  

Unfortunately netcat(nc) does not use encryption so we cannot use it for this challenge.

There is an improved version of netcat called [ncat](https://nmap.org/ncat/).  
One of the improvements was support for SSL encryption.  

The usage of nc and ncat is identical, we only need to add one option to add the SSL support.  
Adding the `--ssl` option will enable the SSL encryption support.

Like the previous level we open a connection to localhost on port 30001 and enter the password for the current level.

```bash
bandit15@bandit:~$ ncat --ssl localhost 30001
BfMYro##########################
Correct!
cluFn7##########################

bandit15@bandit:~$ 
```
