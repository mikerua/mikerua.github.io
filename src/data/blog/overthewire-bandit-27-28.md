---
title: OverTheWire Bandit Level 27 -> 28
author: Michael McDonagh
pubDatetime: 2025-03-01T23:10:00Z
slug: overthewire-bandit-28
featured: false
draft: false
tags:
  - overthewire
  - bandit
  - linux
ogImage: ""
description: Solution for OverTheWire Bandit level 28 challenge.
---

## Level Goal

There is a git repository at `ssh://bandit27-git@localhost/home/bandit27-git/repo`.  
The password for the user `bandit27-git` is the same as for the user `bandit27`.

Clone the repository and find the password for the next level.

---

## Walkthrough

Solution for the Overthewire.org [Bandit level 27 -> 28](https://overthewire.org/wargames/bandit/bandit28.html)

These next few challenges are `git` related. We will be cloning git repositories and then search the repo for a password.

Login to the server using the password obtained from the previous level [Bandit level 26 -> 27](/posts/overthewire-bandit-27).

username: `bandit27`  

```bash
ssh bandit27@bandit.labs.overthewire.org -p 2220
```

Now that we are logged in we will create a working directory to clone the repository in to. When cloning the repository we use the same password we used to log into this level.

```bash
bandit27@bandit:~$ mkdir /tmp/bandit27
bandit27@bandit:~$ cd /tmp/bandit27

bandit27@bandit:/tmp/bandit27$ git clone ssh://bandit27-git@localhost/home/bandit27-git/repo
Cloning into 'repo'...

bandit27-git@localhost's password:
remote: Counting objects: 3, done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 3 (delta 0), reused 0 (delta 0)
Receiving objects: 100% (3/3), done.

bandit27@bandit:/tmp/bandit27$
```

After cloning the repository we change directory into `repo` and see what files are there.

```bash
bandit27@bandit:/tmp/bandit27$ ls
repo

bandit27@bandit:/tmp/bandit27$ cd repo/

bandit27@bandit:/tmp/bandit27/repo$ ls
README

```

We can see that there is only one file `README` and reading the file will give us the password.

```bash
bandit27@bandit:/tmp/bandit27/repo$ cat README 
The password to the next level is: 0ef186##########################
```
