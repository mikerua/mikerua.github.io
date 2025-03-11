---
title: OverTheWire Bandit Level 3 -> 4
author: Michael McDonagh
pubDatetime: 2025-02-21T22:05:19Z
slug: overthewire-bandit-4
featured: false
draft: false
tags:
  - overthewire
  - bandit
  - linux
ogImage: ""
description: Solution for OverTheWire Bandit level 4 challenge.
---

## Level Goal

The password for the next level is stored in a hidden file in the `inhere` directory.

---

## Walkthrough

Solution for the Overthewire.org [Bandit level 3 -> 4](https://overthewire.org/wargames/bandit/bandit4.html)  

Login to the server using the password obtained from the previous level [Bandit level 2 -> 3](/posts/overthewire-bandit-3).

username: `bandit3`

```bash
ssh bandit3@bandit.labs.overthewire.org -p 2220
```

Change directory into `inhere`, running `ls` command will show no files.  

```bash
bandit3@bandit:~$ ls
inhere
bandit3@bandit:~$ cd inhere/
bandit3@bandit:~/inhere$ ls  

```

Running `ls -a` will let us see all files including hidden files.  
`ls` list all files  
`-a` all files including hidden files  
We can then see a file named `.hidden`.  
The you can print to screen using `cat` command.

```bash
bandit3@bandit:~/inhere$ ls -a
.  ..  .hidden
bandit3@bandit:~/inhere$ cat ./.hidden
pIwrPr##########################
```
