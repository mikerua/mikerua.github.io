---
title: TryHackMe - Git Happens
author: Michael McDonagh
pubDatetime: 2025-02-22T23:20:19Z
slug: tryhackme-git-happens
featured: false
draft: false
tags:
  - tryhackme
  - thm-git-happens
  - thm-easy
  - git
ogImage: ""
description: Boss wanted me to create a prototype, so here it is! We even used something called "version control" that made deploying this really easy!.
---

## Description

TryHackMe Room Link: [Git Happens](https://tryhackme.com/room/githappens)  
Created by: [hydragyrum](https://tryhackme.com/r/p/hydragyrum)

Room Description: Boss wanted me to create a prototype, so here it is! We even used something called "version control" that made deploying this really easy!.

This room only has a single task, find the flag.  

## Task 1 Capture the flag

Find the Super Secret Password

---

## Walkthrough

We begin this challenge room by running a nmap scan to see what ports are open.

![nmap results](@/assets/images/tryhackme/git_happens/01-nmap.png)

From the nmap scan we can see 1 port open.  
Port 80 http  

The nmap scan also informs us that there is a `.git` directory on the website.

Checking the website only shows a login screen
![home page](@/assets/images/tryhackme/git_happens/02-home_page.png)

When we test logging in with  username `admin` and password `admin`  nothing appears to happen.  
There is no error message.

The nmap scan lists a `.git` directory lets check that now.

![.git directory](@/assets/images/tryhackme/git_happens/03-dot_git.png)

We can see the folder structure of a git repository.  
We can check each folder and file individually but it is better to download the git repo and check it locally with git.

To download the `.git` directory we can use [GitTools](https://github.com/internetwache/GitTools).  
Lets clone the GitTools repository to our local machine
![clone gittools repo](@/assets/images/tryhackme/git_happens/04-clone_gittools.png)

Now that we have the tools we can download the `.git` directory.  

![gitdump output](@/assets/images/tryhackme/git_happens/05-gitdump.png)

Now we can go into the newly created git folder and see what commits were made on this repository.
![git log output](@/assets/images/tryhackme/git_happens/06-git_log.png)

Looking at the messages for the commits we can see that the site was made more secure with each commit applied.  
So we want to be looking at the early commits before any security was applied.

We need to find a password so checking commits before any security was implemented is the best option.  
There are 2 commits availables  

- Made the login page, boss!
- inital commit

We use the checkout command to revert the repository back to an earlier commit.

![git checkout](@/assets/images/tryhackme/git_happens/07-git_checkout.png)

Once the checkout is completed we now have 2 files and 1 directory.  
Let's check what is in `index.html`.  
Scrolling through the html file we can see a `login()` at the end of the file and it contains the username and password in plaintext.

![image of password](@/assets/images/tryhackme/git_happens/08-index_password.png)

Entering the password on tryhackme will complete the room.
