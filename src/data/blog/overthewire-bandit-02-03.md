---
title: OverTheWire Bandit Level 2 -> 3
author: Michael McDonagh
pubDatetime: 2025-02-16T11:20:19Z
slug: overthewire-bandit-3
featured: false
draft: false
tags:
  - overthewire
  - bandit
  - linux
ogImage: ""
description: Solution for OverTheWire Bandit level 3 challenge.
---


## Level Goal

The password for the next level is stored in a file called `spaces in this filename` located in the home directory

---

## Walkthrough  

Solution for the Overthewire.org [Bandit level 2 -> 3](https://overthewire.org/wargames/bandit/bandit3.html)  

Login to the server using the password obtained from the previous level [Bandit level 1 -> 2](/posts/overthewire-bandit-2).

username: `bandit2`

```bash
ssh bandit2@bandit.labs.overthewire.org -p 2220
```

This time there is a file with spaces in the name.  

```bash
bandit2@bandit:~$ ls 
spaces in this filename 
```

Running `cat spaces in the filename` will cause errors as it will think each word in `spaces in the filename` is its own separate file.  

```bash
bandit2@bandit:~$ cat spaces in this filename
cat: spaces: No such file or directory 
cat: in: No such file or directory 
cat: this: No such file or directory
cat: filename: No such file or directory
```

Printing the contents of the file can be done 2 ways.  
One using `\` before each space to indicate to the terminal that the filename continues and the other is surrounding the file name with quotes `'` or `"`.

```bash
bandit2@bandit:~$ cat 'spaces in this filename'
UmHadQ##########################

bandit2@bandit:~$ cat spaces\ in\ this\ filename
UmHadQ##########################
```
