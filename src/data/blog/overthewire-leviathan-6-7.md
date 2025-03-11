---
title: OverTheWire Leviathan Level 6 -> 7
author: Michael McDonagh
pubDatetime: 2025-03-02T13:30:00Z
slug: overthewire-leviathan-7
featured: false
draft: false
tags:
  - overthewire
  - leviathan
  - linux
ogImage: ""
description: Solution for OverTheWire Leviathan level 7 challenge.
---
## Level Goal  

There is no information for this level, intentionally.

---

## Walkthrough  

Solution for the Overthewire.org [Leviathan level 7](https://overthewire.org/wargames/leviathan/leviathan7.html)

Login to the server using the password obtained from the previous level [Leviathan level 6](/posts/overthewire-leviathan-6).  

username: `leviathan7`  

```bash
ssh leviathan7@leviathan.labs.overthewire.org -p 2223
```

This is not an actual challenge so there is nothing to do except read a file.

Checking the home directory there is a file `CONGRATUALATION` and reading the file will give a congratulation message.

```bash
leviathan7@leviathan:~$ ls
CONGRATULATIONS

leviathan7@leviathan:~$ cat CONGRATULATIONS 
Well Done, you seem to have used a *nix system before, now try something more serious.
```

That is the Leviathan series of challenges complete.
