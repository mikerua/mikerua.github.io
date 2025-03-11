---
title: OverTheWire Bandit Level 33 -> 34
author: Michael McDonagh
pubDatetime: 2025-03-01T23:55:00Z
slug: overthewire-bandit-34
featured: false
draft: false
tags:
  - overthewire
  - bandit
  - linux
ogImage: ""
description: Solution for OverTheWire Bandit level 34 challenge.
---

## Level Goal

At this moment, level 34 does not exist yet.

---

## Walkthrough

Solution for the Overthewire.org [Bandit level 33 -> 34](https://overthewire.org/wargames/bandit/bandit34.html)

Login to the server using the password obtained from the previous level [Bandit level 32 -> 33](/posts/overthewire-bandit-33).  

username: `bandit33`  

```bash
ssh bandit33@bandit.labs.overthewire.org -p 2220
```

Using `ls` we can see a README.txt file in the home directory.
Catting this file will give a congratulation message.

```bash
bandit33@bandit:~$ cat README.txt
Congratulations on solving the last level of this game!

At this moment, there are no more levels to play in this game. However, we are constantly working
on new levels and will most likely expand this game with more levels soon.
Keep an eye out for an announcement on our usual communication channels!
In the meantime, you could play some of our other wargames.

If you have an idea for an awesome new level, please let us know!

The end!
```
