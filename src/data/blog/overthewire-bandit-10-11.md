---
title: OverTheWire Bandit Level 10 -> 11
author: Michael McDonagh
pubDatetime: 2025-02-27T23:12:00Z
slug: overthewire-bandit-11
featured: false
draft: false
tags:
  - overthewire
  - bandit
  - linux
ogImage: ""
description: Solution for OverTheWire Bandit level 11 challenge.
---

## Level Goal

The password for the next level is stored in the file `data.txt`, which contains base64 encoded data.

---

## Walkthrough

Solution for the Overthewire.org [Bandit level 10 -> 11](https://overthewire.org/wargames/bandit/bandit11.html)

Login to the server using the password obtained from the previous level [Bandit level 9 -> 10](/posts/overthewire-bandit-10).

username: `bandit10`

```bash
ssh bandit10@bandit.labs.overthewire.org -p 2220
```

After logging in we can find the `data.txt` file located in the current directory.

```bash
bandit10@bandit:~$ ls
data.txt
```

Running the `file` command tells us it is a text file.

```bash
bandit10@bandit:~$ file data.txt
data.txt: ASCII text
```

But when trying to read the contents of the file it is unreadable to humans.

```bash
bandit10@bandit:~$ cat data.txt
VGhlIHBhc3N3b3JkIGlzIElGdWt3S0dzRlc4TU9xM0lSRnFyeEUxaHhUTkViVVBSCg==
```

As the level goal said the contents of `data.txt` has been encoded using base64. Linux has a command line tool for encoding and decoding base64.  

`base64` is the command. Checking the [manual](https://man7.org/linux/man-pages/man1/base64.1.html) page for base64 we can see how to decode data.txt.

```text
BASE64(1)                                           User Commands                                           BASE64(1)

NAME
       base64 - base64 encode/decode data and print to standard output

SYNOPSIS
       base64 [OPTION]... [FILE]

DESCRIPTION
       Base64 encode or decode FILE, or standard input, to standard output.

       With no FILE, or when FILE is -, read standard input.

       Mandatory arguments to long options are mandatory for short options too.

       -d, --decode
              decode data
```

The `-d` option will allow us to decode base64 back into its original format which in this case is ASCII text.  

Running the following command will give the password for the next level.

```bash
bandit10@bandit:~$ cat data.txt | base64 -d
The password is IFukwK##########################
```
