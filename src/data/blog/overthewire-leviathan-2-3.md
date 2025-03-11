---
title: OverTheWire Leviathan Level 2 -> 3
author: Michael McDonagh
pubDatetime: 2025-03-02T12:15:00Z
slug: overthewire-leviathan-3
featured: false
draft: false
tags:
  - overthewire
  - leviathan
  - linux
ogImage: ""
description: Solution for OverTheWire Leviathan level 3 challenge.
---

## Level Goal  

There is no information for this level, intentionally.

---

## Walkthrough  

Solution for the Overthewire.org [Leviathan level 3](https://overthewire.org/wargames/leviathan/leviathan3.html)

Login to the server using the password obtained from the previous level [Leviathan level 2](/posts/2022-03-02-overthewire-leviathan-2).  

username: `leviathan3`  

```bash
ssh leviathan3@leviathan.labs.overthewire.org -p 2223
```

With no description given first thing we do is check what is in the home directory.

```bash
leviathan3@leviathan:~$ ls -al
total 32
drwxr-xr-x  2 root       root        4096 Aug 26  2019 .
drwxr-xr-x 10 root       root        4096 Aug 26  2019 ..
-rw-r--r--  1 root       root         220 May 15  2017 .bash_logout
-rw-r--r--  1 root       root        3526 May 15  2017 .bashrc
-r-sr-x---  1 leviathan4 leviathan3 10288 Aug 26  2019 level3
-rw-r--r--  1 root       root         675 May 15  2017 .profile
```

There is an executable named `level3` with its setuid bit set.

```bash
leviathan3@leviathan:~$ ./level3 
Enter the password> hello
bzzzzzzzzap. WRONG
```

`level3` asks for a password when run.  
Since we don't know the password we get the wrong message.  

Next run `level3` with ltrace to see what it is doing.

```bash
leviathan3@leviathan:~$ ltrace ./level3 
__libc_start_main(0x8048618, 1, 0xffffd784, 0x80486d0 <unfinished ...>
strcmp("h0no33", "kakaka")                               = -1
printf("Enter the password> ")                           = 20
fgets(Enter the password> hello
"hello\n", 256, 0xf7fc55a0)                              = 0xffffd590
strcmp("hello\n", "snlprintf\n")                         = -1
puts("bzzzzzzzzap. WRONG"bzzzzzzzzap. WRONG
)                                                        = 19
+++ exited (status 0) +++
```

The file is first comparing 2 string for no apparent reason.  
Then is prompts for a password.  
Compares the password we entered to the text 'snlprintf'.  

It seems the password `level3` is expecting is **snlprintf**.

Running the file again and inputting the correct password will give us a shell prompt.

```bash
leviathan3@leviathan:~$ ./level3 
Enter the password> snlprintf                
[You've got shell]!
$
```

Now we can use `id` to see who we are which is leviathan4.  
Using leviathan4 privileges we can read the password directly from `/etc/leviathan_pass`

```bash
$ id
uid=12004(leviathan4) gid=12003(leviathan3) groups=12003(leviathan3)

$ cat /etc/leviathan_pass/leviathan4
vuH*******
```
