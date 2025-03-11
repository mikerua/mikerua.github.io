---
title: OverTheWire Bandit Level 28 -> 29
author: Michael McDonagh
pubDatetime: 2025-03-01T23:20:00Z
slug: overthewire-bandit-29
featured: false
draft: false
tags:
  - overthewire
  - bandit
  - linux
  - git
ogImage: ""
description: Solution for OverTheWire Bandit level 29 challenge.
---

## Level Goal

There is a git repository at `ssh://bandit28-git@localhost/home/bandit28-git/repo`.  
The password for the user `bandit28-git` is the same as for the user `bandit28`.

Clone the repository and find the password for the next level.

---

## Walkthrough

Solution for the Overthewire.org [Bandit level 28 -> 29](https://overthewire.org/wargames/bandit/bandit29.html)

This is another **git** challenge. We will be cloning git repositories and then search the repo for a password.

Login to the server using the password obtained from the previous level [Bandit level 27 -> 28](/posts/overthewire-bandit-28).  

username: `bandit28`  

```bash
ssh bandit28@bandit.labs.overthewire.org -p 2220
```

Now that we are logged in we will create a working directory to clone the repository in to. When cloning the repository we use the same password we used to log into this level.

```bash
bandit28@bandit:~$ mkdir /tmp/bandit28
bandit28@bandit:~$ cd /tmp/bandit28

bandit28@bandit:/tmp/bandit28$ git clone ssh://bandit28-git@localhost/home/bandit28-git/repo
Cloning into 'repo'...

bandit28-git@localhost's password:
remote: Counting objects: 3, done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 3 (delta 0), reused 0 (delta 0)
Receiving objects: 100% (3/3), done.

bandit28@bandit:/tmp/bandit28$
```

After cloning the repository we change directory into `repo` and see what files are there.

```bash
bandit28@bandit:/tmp/bandit28$ ls
repo

bandit28@bandit:/tmp/bandit28$ cd repo/

bandit28@bandit:/tmp/bandit28/repo$ ls
README.md

```

Like the previous challenge there is only a single file in the git repository `README`. Unlike the previous challenge the password was removed from the `README` file.

```bash
bandit28@bandit:/tmp/bandit28/repo$ cat README.md
# Bandit Notes
Some notes for level29 of bandit.

## credentials

- username: bandit29
- password: xxxxxxxxxx

```

Since this is a git repository we can see the history of the `README.md`. Using the `git log` command we can see the list of commits made on the repository.

```bash
bandit28@bandit:/tmp/bandit28/repo$ git log
commit edd935d60906b33f0619605abd1689808ccdd5ee
Author: Morla Porla <morla@overthewire.org>
Date:   Thu May 7 20:14:49 2020 +0200

    fix info leak

commit c086d11a00c0648d095d04c089786efef5e01264
Author: Morla Porla <morla@overthewire.org>
Date:   Thu May 7 20:14:49 2020 +0200

    add missing data

commit de2ebe2d5fd1598cd547f4d56247e053be3fdc38
Author: Ben Dover <noone@overthewire.org>
Date:   Thu May 7 20:14:49 2020 +0200

    initial commit of README.md

```

Using `git log` we can see the author, date and a description message for each commit. The most recent commit is what we see when looking at the repo.

Git log shows 3 commits in the history of the repo.

- fix info leak (current position)
- add missing data
- initial commit of README.md

By reading the commit descriptions we can assume the password was removed in the `fix info leak` commit. We need to see what was in the other commits.

Using `git diff <commit id>` we can see what changes were made between the current commit and the commit id we enter.

We can use the commit id of the `add missing data` commit to see what was in the README before the info leak was fixed.

```bash
bandit28@bandit:/tmp/bandit28/repo$ git diff c086d11a00c0648d095d04c089786efef5e01264
diff --git a/README.md b/README.md
index 3f7cee8..5c6457b 100644
--- a/README.md
+++ b/README.md
@@ -4,5 +4,5 @@ Some notes for level29 of bandit.
 ## credentials

 - username: bandit29
-- password: bbc965##########################
+- password: xxxxxxxxxx

```

Having used `git diff` we can see that the password was removed from the README but we can still read it from the output of the diff.

## Alternate Solution

An alternate method to solve this challenge is to use `git checkout <commit id>` to revert the repository back to a previous state and then read the README file.

```bash
bandit28@bandit:/tmp/bandit28/repo$ git checkout c086d11a00c0648d095d04c089786efef5e01264
Note: checking out 'c086d11a00c0648d095d04c089786efef5e01264'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by performing another checkout.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -b with the checkout command again. Example:

  git checkout -b <new-branch-name>

HEAD is now at c086d11... add missing data

bandit28@bandit:/tmp/bandit28/repo$ cat README.md
# Bandit Notes
Some notes for level29 of bandit.

## credentials

- username: bandit29
- password: bbc965##########################

```
