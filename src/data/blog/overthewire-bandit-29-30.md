---
title: OverTheWire Bandit Level 29 -> 30
author: Michael McDonagh
pubDatetime: 2025-03-01T23:30:00Z
slug: overthewire-bandit-30
featured: false
draft: false
tags:
  - overthewire
  - bandit
  - linux
  - git
ogImage: ""
description: Solution for OverTheWire Bandit level 30 challenge.
---

## Level Goal

There is a git repository at `ssh://bandit29-git@localhost/home/bandit29-git/repo`.  
The password for the user `bandit29-git` is the same as for the user `bandit29`.

Clone the repository and find the password for the next level.

---

## Walkthrough

Solution for the Overthewire.org [Bandit level 29 -> 30](https://overthewire.org/wargames/bandit/bandit30.html)

This is another **git** challenge. We will be cloning git repositories and then search the repo for a password.

Login to the server using the password obtained from the previous level [Bandit level 28 -> 29](/posts/overthewire-bandit-29).  

username: `bandit29`  

```bash
ssh bandit29@bandit.labs.overthewire.org -p 2220
```

After logging in to the server we create a working directory in `/tmp` and clone the git repo.  
The password is the same as the one used to login to this level.

```bash
bandit29@bandit:~$ mkdir /tmp/bandit29
bandit29@bandit:~$ cd /tmp/bandit29

bandit29@bandit:/tmp/bandit29$ git clone ssh://bandit29-git@localhost/home/bandit29-git/repo
Cloning into 'repo'...

bandit29-git@localhost's password:
remote: Counting objects: 16, done.
remote: Compressing objects: 100% (11/11), done.
remote: Total 16 (delta 2), reused 0 (delta 0)
Receiving objects: 100% (16/16), done.
Resolving deltas: 100% (2/2), done.

bandit29@bandit:/tmp/bandit29$ cd repo
```

First we check the `README.md` file to see what information it contains.

```bash
bandit29@bandit:/tmp/bandit29/repo$ cat README.md
# Bandit Notes
Some notes for bandit30 of bandit.

## credentials

- username: bandit30
- password: <no passwords in production!>
```

The `README.md` does not contain the password but it does give a clue to where the password is.  
The text `<no passwords in production!>` lets us know that there are more then one branch on this repo.

A `git branch` is a parallel line of work in a git repo that does not interfere with the main branch. It can later be merged into the main branch.

Using the `git branch` command we can see what the names of the other branches are.

```bash
bandit29@bandit:/tmp/bandit29/repo$ git branch
* master

```

Only one branch is listed meaning the other branches are not local to our machine.  
`git branch -a` will display all branches local and remote.

```bash
bandit29@bandit:/tmp/bandit29/repo$ git branch -a
* master
  remotes/origin/HEAD -> origin/master
  remotes/origin/dev
  remotes/origin/master
  remotes/origin/sploits-dev

```

We can see a `dev` branch is listed now.  
We change to different branches by using git checkout.

```bash
bandit29@bandit:/tmp/bandit29/repo$ git checkout remotes/origin/dev
Note: checking out 'remotes/origin/dev'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by performing another checkout.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -b with the checkout command again. Example:

  git checkout -b <new-branch-name>

HEAD is now at bc83328... add data needed for development

```

Now in the `dev` branch we can read the `README.md` to get the password.

```bash
bandit29@bandit:/tmp/bandit29/repo$ cat README.md
# Bandit Notes
Some notes for bandit30 of bandit.

## credentials

- username: bandit30
- password: 5b9057##########################
```
