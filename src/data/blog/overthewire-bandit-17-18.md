---
title: OverTheWire Bandit Level 17 -> 18
author: Michael McDonagh
pubDatetime: 2025-03-01T22:20:00Z
slug: overthewire-bandit-18
featured: false
draft: false
tags:
  - overthewire
  - bandit
  - linux
ogImage: ""
description: Solution for OverTheWire Bandit level 18 challenge.
---

## Level Goal

There are 2 files in the homedirectory: `passwords.old` and `passwords.new`. The password for the next level is in `passwords.new` and is the only line that has been changed between passwords.old and passwords.new

`NOTE: if you have solved this level and see ‘Byebye!’ when trying to log into bandit18, this is related to the next level, bandit19`

---

## Walkthrough

Solution for the Overthewire.org [Bandit level 17 -> 18](https://overthewire.org/wargames/bandit/bandit18.html)

Login to the server using the password obtained from the previous level [Bandit level 16 -> 17](/posts/overthewire-bandit-17).  

username: `bandit17`  

```bash
ssh bandit17@bandit.labs.overthewire.org -p 2220
```

In this level we are given 2 files full of text that look like passwords.  
The password we are looking for is in `passwords.new` and it is the only line that is different to `passwords.old` file.

Checking how many lines in each file tells us there is 100 lines. Too many to check by hand.

```bash
bandit17@bandit:~$ wc -l passwords.new 
100 passwords.new

bandit17@bandit:~$ wc -l passwords.old 
100 passwords.old
```

Luckily linux has a tool for comparing files line by line.  
That tool is [diff](https://linux.die.net/man/1/diff).  

Diff takes 2 inputs and outputs the line numbers and the differences between them.

```bash
bandit17@bandit:~$ diff passwords.new passwords.old
42c42
< kfBf3e##########################
---
> w0Yfolrc5bwjS4qw5mq1nnQi6mF03bii
bandit17@bandit:~$
```
