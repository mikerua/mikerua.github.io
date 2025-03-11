---
title: OverTheWire Bandit Level 14 -> 15
author: Michael McDonagh
pubDatetime: 2025-02-27T23:50:00Z
slug: overthewire-bandit-15
featured: false
draft: false
tags:
  - overthewire
  - bandit
  - linux
ogImage: ""
description: Solution for OverTheWire Bandit level 15 challenge.
---

## Level Goal

The password for the next level can be retrieved by submitting the password of the current level to `port 30000 on localhost`.

---

## Walkthrough

Solution for the Overthewire.org [Bandit level 14 -> 15](https://overthewire.org/wargames/bandit/bandit15.html)

So our challenge for this level is to send the password to port 30,000 on this machine.

Since we used an ssh private key to log into this level the first thing we need to do is get the password.  
All passwords for the bandit series of challenges are located in `/etc/bandit_pass/`.  
The password for bandit14 is in a file names bandit14
We can get the password for the current level by reading the /etc/bandit_pass/bandit14 file.  

```bash
bandit14@bandit:~$ cat /etc/bandit_pass/bandit14
4wcYUJ##########################
```

Now that we have the password we can move on to the next part opening a connection to port 30,000 on localhost.  
We can use a tool called [netcat (nc)](https://linux.die.net/man/1/nc) to open connections to specific ports.

The way to make a connection with netcat is to write it in this format `nc <hostname> <portNumber>`.  
For this level the hostname will be localhost and the port 30000.  

```bash
bandit14@bandit:~$ nc localhost 30000 
4wcYUJ##########################
Correct!
BfMYro##########################
```

When we use netcat and open the connection to port 30000 we can type in the password.  
Afterwards we get a Correct! or Wrong! response depending on whether the correct password was entered.  
