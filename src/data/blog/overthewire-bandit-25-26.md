---
title: OverTheWire Bandit Level 25 -> 26
author: Michael McDonagh
pubDatetime: 2025-03-01T23:00:00Z
slug: overthewire-bandit-26
featured: false
draft: false
tags:
  - overthewire
  - bandit
  - linux
ogImage: ""
description: Solution for OverTheWire Bandit level 26 challenge.
---

## Level Goal

Logging in to bandit26 from bandit25 should be fairly easy… The shell for user bandit26 is not **/bin/bash**, but something else. Find out what it is, how it works and how to break out of it.

---

## Walkthrough

Solution for the Overthewire.org [Bandit level 25 -> 26](https://overthewire.org/wargames/bandit/bandit26.html)

Login to the server using the password obtained from the previous level [Bandit level 24 -> 25](/posts/overthewire-bandit-25).  

username: `bandit25`  

```bash
ssh bandit25@bandit.labs.overthewire.org -p 2220
```

When checking the home directory we can see an ssh key for bandit26.

```bash
bandit25@bandit:~$ ls
bandit26.sshkey
```

When using the ssh key to log into bandit26 we see a Bandit26 message and then the connection is closed.  

```bash
bandit25@bandit:~$ ssh -i bandit26.sshkey bandit26@localhost

  _                     _ _ _   ___   __
 | |                   | (_) | |__ \ / /
 | |__   __ _ _ __   __| |_| |_   ) / /_
 | '_ \ / _` | '_ \ / _` | | __| / / '_ \
 | |_) | (_| | | | | (_| | | |_ / /| (_) |
 |_.__/ \__,_|_| |_|\__,_|_|\__|____\___/
Connection to localhost closed.
bandit25@bandit:~$
```

According to the level description bandit26 is not running /bin/bash like the other levels. So what shell is bandit26 running ?  

We can find this out by checking `/etc/passwd` and finding user bandit26.

```bash
bandit25@bandit:~$ cat /etc/passwd | grep bandit26
bandit26:x:11026:11026:bandit level 26:/home/bandit26:/usr/bin/showtext
```

It looks like bandit26 is running `/usr/bin/showtext` instead of `/bin/bash`.  
Let's check what showtext is doing.

```bash
bandit25@bandit:~$ cat /usr/bin/showtext 
#!/bin/sh

export TERM=linux

more ~/text.txt
exit 0
```

Showtext is using `more` to display the contents of `text.txt` to the screen and then is exiting.

`more` is used to view file contents one screenful at a time.  
Through checking the man page we can find different options to use. One such option is `v` when used while `more` is still running. It allows us to open a `vi` editor which we can then read/edit other files.

```text
Extract from the more man page
       v
           Start up an editor at current line. The editor is taken from
           the environment variable VISUAL if defined, or EDITOR if
           VISUAL is not defined, or defaults to vi(1) if neither VISUAL
           nor EDITOR is defined.
```

The problem now is that `more` always closes thus we cannot use the `v` command.  
To solve this we need the message that is displayed to be bigger then the screen.  
This can be done through a combination of resizing the terminal window and increasing the font size

```bash
Terminal Window reized small and text font increased 
+--------------------------------------------+
|  _                     _ _ _   ___   __    |
| | |                   | (_) | |__ \ / /    |
| | |__   __ _ _ __   __| |_| |_   ) / /_    |
| | '_ \ / _` | '_ \ / _` | | __| / / '_ \   |
| | |_) | (_| | | | | (_| | | |_ / /| (_) |  |
|--More--(83%)                               |
+--------------------------------------------+
```

With the `more` program stopped from completing we can now use `v` to open a `vi` editor.

```bash
  1   _                     _ _ _   ___   __       
  2  | |                   | (_) | |__ \ / /
  3  | |__   __ _ _ __   __| |_| |_   ) / /_
  4  | '_ \ / _` | '_ \ / _` | | __| / / '_ \
<RO] [dec= 95] [hex=5F] [pos=0001:0003][16% of 6]
"~/text.txt" [readonly] 6L, 258C
```

Now we are in a vi editor we can use the `:set shell` command to change the shell and give us more control.

```bash
  1   _                     _ _ _   ___   __       
  2  | |                   | (_) | |__ \ / /
  3  | |__   __ _ _ __   __| |_| |_   ) / /_
  4  | '_ \ / _` | '_ \ / _` | | __| / / '_ \
~text.txt[RO] [dec= 95] [hex=5F] [pos=0001:0003][16% of 6]
:set shell=/bin/bash
```

Now still in vi we run `:shell`  to start the bash shell.

```bash
  1   _                     _ _ _   ___   __       
  2  | |                   | (_) | |__ \ / /
  3  | |__   __ _ _ __   __| |_| |_   ) / /_
  4  | '_ \ / _` | '_ \ / _` | | __| / / '_ \
~text.txt[RO] [dec= 95] [hex=5F] [pos=0001:0003][16% of 6]
:shell
bandit26@bandit:~$
```

Now we have a bash shell as `bandit26` we can read the password to make it easier to login to this level in future.

```bash
bandit26@bandit:~$ cat /etc/bandit_pass/bandit26
5czgV9##########################
```
