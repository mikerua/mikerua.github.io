---
title: TryHackMe - RootMe
author: Michael McDonagh
pubDatetime: 2025-03-03T23:20:19Z
slug: tryhackme-rootme
featured: false
draft: false
tags:
  - tryhackme
  - thm-rootme
  - thm-easy
  - git
ogImage: ""
description: A ctf for beginners, can you root me?.
---

## Rootme

TryHackMe Room Link: [Rootme](https://tryhackme.com/r/room/rrootme)

---

## Walkthrough

## Task 1 Deploy the machine

no questions

## Task 2 Reconnaissance

First, let's get information about the target

### Scan the machine, how many ports are open?

A: 2

Q: What version of Apache is running?
A: 2.4.29

Q: What service is running on port 22?
A: ssh

Q: Find directories on the web server using the GoBuster tool.
A: no question

Q: What is the hidden directory?
A: /panel

## Task 3 Getting a shell

Q: user.txt
A: THM{y0u_g0t_a_sh3ll}

## Task 4 Privilege escalation

Q: Search for files with SUID permission, which file is weird?
A: /usr/bin/python

Q: Find a form to escalate your privileges.
A: No Answer required

Q: root.txt
A: THM{pr1v1l3g3_3sc4l4t10n}
