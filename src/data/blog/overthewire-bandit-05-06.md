---
title: OverTheWire Bandit Level 5 -> 6
author: Michael McDonagh
pubDatetime: 2025-02-22T23:00:00Z
slug: overthewire-bandit-6
featured: false
draft: false
tags:
  - overthewire
  - bandit
  - linux
ogImage: ""
description: Solution for OverTheWire Bandit level 6 challenge.
---

## Level Goal

The password for the next level is stored in a file somewhere under the `inhere` directory and has all of the following properties:

* human-readable  
* 1033 bytes in size  
* not executable  

---

## Walkthrough

Solution for the Overthewire.org [Bandit level 5 -> 6](https://overthewire.org/wargames/bandit/bandit6.html)

Login to the server using the password obtained from the previous level [Bandit level 4 -> 5](/posts/overthewire-bandit-5).

username: `bandit5`

```bash
ssh bandit5@bandit.labs.overthewire.org -p 2220
```

Running `ls` on the inhere directory will give us 20 more directories.  
Each of those directories contains multiple files.  

```bash
bandit5@bandit:~$ ls inhere/
maybehere00  maybehere03  maybehere06  maybehere09  maybehere12  maybehere15  maybehere18
maybehere01  maybehere04  maybehere07  maybehere10  maybehere13  maybehere16  maybehere19
maybehere02  maybehere05  maybehere08  maybehere11  maybehere14  maybehere17

bandit5@bandit:~$ ls inhere/maybehere00
-file1  -file2  -file3  spaces file1  spaces file2  spaces file3
```

We could run `cat` on each file but that would take a long time to complete.  
Instead we use the `find` command.  
The `find` command can be used to search for files or directories in a directory hierarchy.  
Using `find` with specific options we can narrow the search to  

* find all files (`-type f`)  
* of size 1033 bytes (`-size 1033c`)  
* not executable (`-not -executable`).  

```bash
bandit5@bandit:~$ find ./inhere/ -type f -size 1033c -not -executable
./inhere/maybehere07/.file2
```

There is only 1 file with all 3 properties.  
As before `cat` the file to print its content to screen.

```bash
bandit5@bandit:~$ cat ./inhere/maybehere07/.file2
DXjZPU##########################
```
