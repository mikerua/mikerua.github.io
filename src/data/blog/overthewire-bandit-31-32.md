---
title: OverTheWire Bandit Level 31 -> 32
author: Michael McDonagh
pubDatetime: 2025-03-01T23:45:00Z
slug: overthewire-bandit-32
featured: false
draft: false
tags:
  - overthewire
  - bandit
  - linux
  - git
ogImage: ""
description: Solution for OverTheWire Bandit level 32 challenge.
---

## Level Goal

There is a git repository at `ssh://bandit31-git@localhost/home/bandit31-git/repo`.  
The password for the user `bandit31-git` is the same as for the user `bandit31`.

Clone the repository and find the password for the next level.

---

## Walkthrough

Solution for the Overthewire.org [Bandit level 31 -> 32](https://overthewire.org/wargames/bandit/bandit32.html)

Login to the server using the password obtained from the previous level [Bandit level 30 -> 31](/posts/overthewire-bandit-31).  

username: `bandit31`  

```bash
ssh bandit31@bandit.labs.overthewire.org -p 2220
```

After logging in to the server we create a working directory in `/tmp` and clone the git repo.  
The password is the same as the one used to login to this level.

```bash
bandit31@bandit:~$ mkdir /tmp/bandit31
bandit31@bandit:~$ cd /tmp/bandit31

bandit31@bandit:/tmp/bandit31$ git clone ssh://bandit31-git@localhost/home/bandit31-git/repo
Cloning into 'repo'...

bandit31-git@localhost's password:
remote: Counting objects: 4, done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 4 (delta 0), reused 0 (delta 0)
Receiving objects: 100% (4/4), done.
```

First we change directory into the repo and check the `README.md` file

```bash
bandit31@bandit:/tmp/bandit31$ cd repo/
bandit31@bandit:/tmp/bandit31/repo$ cat README.md
This time your task is to push a file to the remote repository.

Details:
    File name: key.txt
    Content: 'May I come in?'
    Branch: master

```

For this challenge we need to write `May I come in?` to a file named `key.txt` and then commit and push the change to the remote repository.

First thing is to create the file and write the text into it.

```bash
bandit31@bandit:/tmp/bandit31/repo$ echo 'May I come in?' > key.txt
```

Commiting the file

```bash
bandit31@bandit:/tmp/bandit31/repo$ git add key.txt
The following paths are ignored by one of your .gitignore files:
key.txt
Use -f if you really want to add them.

```

When adding `key.txt` we are informed that it will be ignored because of the `.gitignore` file.  
We can either edit the `.gitignore` file and remove the line containing `key.txt` or we can use the `-f` to force git to add the file.

```bash
bandit31@bandit:/tmp/bandit31/repo$ git add -f key.txt
bandit31@bandit:/tmp/bandit31/repo$ git commit -m 'adding key.txt'
[master 559b881] adding key
 1 file changed, 1 insertion(+)
 create mode 100644 key.txt
```

With `key.txt` committed to the git repository we now need to push the commit to the remote.  

```bash
bandit31@bandit:/tmp/bandit31/repo$ git push
Could not create directory '/home/bandit31/.ssh'.
The authenticity of host 'localhost (127.0.0.1)' can't be established.
ECDSA key fingerprint is SHA256:98UL0ZWr85496EtCRkKlo20X3OPnyPSB5tB5RPbhczc.
Are you sure you want to continue connecting (yes/no)? yes
Failed to add the host to the list of known hosts (/home/bandit31/.ssh/known_hosts).
This is a OverTheWire game server. More information on http://www.overthewire.org/wargames

bandit31-git@localhost's password: 
Counting objects: 3, done.
Delta compression using up to 2 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 322 bytes | 0 bytes/s, done.
Total 3 (delta 0), reused 0 (delta 0)
remote: ### Attempting to validate files... ####
remote:
remote: .oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.
remote:
remote: Well done! Here is the password for the next level:
remote: 56a9bf##########################
remote:
remote: .oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.
remote:
To ssh://localhost/home/bandit31-git/repo
 ! [remote rejected] master -> master (pre-receive hook declined)
error: failed to push some refs to 'ssh://bandit31-git@localhost/home/bandit31-git/repo'
```

After pushing the commit we get a message with the password for the next challenge.
