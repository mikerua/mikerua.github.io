---
title: OverTheWire Leviathan Level 0 -> 1
author: Michael McDonagh
pubDatetime: 2025-03-02T11:30:00Z
slug: overthewire-leviathan-1
featured: false
draft: false
tags:
  - overthewire
  - leviathan
  - linux
ogImage: ""
description: Solution for OverTheWire Leviathan level 1 challenge.
---

## Level Goal  

There is no information for this level, intentionally.

---

## Walkthrough

Solution for the Overthewire.org [Leviathan level 1](https://overthewire.org/wargames/leviathan/leviathan1.html)

Login to the server using the password obtained from the previous level [Leviathan level 0](/posts/overthewire-leviathan-0).  

username: `leviathan1`

```bash
ssh leviathan1@leviathan.labs.overthewire.org -p 2223
```

With no description given first thing we do is check what is in the home directory.

```bash
leviathan1@leviathan:~$ ls -al
total 28
drwxr-xr-x  2 root       root       4096 Aug 26  2019 .
drwxr-xr-x 10 root       root       4096 Aug 26  2019 ..
-rw-r--r--  1 root       root        220 May 15  2017 .bash_logout
-rw-r--r--  1 root       root       3526 May 15  2017 .bashrc
-r-sr-x---  1 leviathan2 leviathan1 7452 Aug 26  2019 check
-rw-r--r--  1 root       root        675 May 15  2017 .profile
```

We can see an executable file named `check`.
Its setuid bit is checked meaning when we run the file we gain the same privileges as `leviathan2`

We run this file to see what it does.

```bash
leviathan1@leviathan:~$ ./check 
password: 

hello
Wrong password, Good Bye ...
```

Since we don't know the password it will tell us *'wrong password'*

We can use `ltrace` to debug the file and see what library calls it is making to further understand what it is doing.

```bash
leviathan1@leviathan:~$ ltrace ./check 
__libc_start_main(0x804853b, 1, 0xffffd784, 0x8048610 <unfinished ...>
printf("password: ")                                              = 10
getchar(1, 0, 0x65766f6c, 0x646f6700password: hello
)                                                                 = 104
getchar(1, 0, 0x65766f6c, 0x646f6700)                             = 101
getchar(1, 0, 0x65766f6c, 0x646f6700)                             = 108
strcmp("hel", "sex")                                              = -1
puts("Wrong password, Good Bye ..."Wrong password, Good Bye ...
)                                                                 = 29
+++ exited (status 0) +++

leviathan1@leviathan:~$
```

We can see that the program is:

- Printing the text 'password'
- Getting the input from the user
- Comparing the first 3 characters of our input to the text 'sex'
- Since we inputted the wrong password we get the 'Wrong password' message.

Based on the `strcmp` we can understand the password needed is *'sex'*.

Let's run the file again and enter the correct password.

```bash
leviathan1@leviathan:~$ ./check 
password: sex
$
```

We are given a new terminal prompt. Using the `id` command we can see we have uid of leviathan2.

```bash
$ id
uid=12002(leviathan2) gid=12001(leviathan1) groups=12001(leviathan1)
```

Since we are leviathan2 now we can read the password directly from the `leviathan_pass` directory.

```bash
$ cat /etc/leviathan_pass/leviathan2
oug*******
```
