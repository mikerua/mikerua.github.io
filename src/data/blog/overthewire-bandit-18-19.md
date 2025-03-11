---
title: OverTheWire Bandit Level 18 -> 19
author: Michael McDonagh
pubDatetime: 2025-03-01T22:25:00Z
slug: overthewire-bandit-19
featured: false
draft: false
tags:
  - overthewire
  - bandit
  - linux
ogImage: ""
description: Solution for OverTheWire Bandit level 19 challenge.
---


## Level Goal

The password for the next level is stored in a file `readme` in the home directory.  
Unfortunately, someone has modified `.bashrc` to log you out when you log in with SSH.  

---

## Walkthrough

Solution for the Overthewire.org [Bandit level 18 -> 19](https://overthewire.org/wargames/bandit/bandit19.html)

Login to the server using the password obtained from the previous level [Bandit level 17 -> 18](/posts/overthewire-bandit-18).  

username: `bandit18`  

```bash
ssh bandit18@bandit.labs.overthewire.org -p 2220
```

When we log into bandit18 we get the usual messages we have seen on previous levels of Bandit but before we can enter any commands we see a `ByeBye !` message and then the connection is closed.

```bash
ssh bandit18@bandit.labs.overthewire.org -p 2220
This is a OverTheWire game server. More information on http://www.overthewire.org/wargames

bandit18@bandit.labs.overthewire.org\'s password: 
Linux bandit.otw.local 5.4.8 x86_64 GNU/Linux 

      ,----..            ,----,          .---.
     /   /   \         ,/   .`|         /. ./|
    /   .     :      ,`   .'  :     .--'.  ' ;
   .   /   ;.  \   ;    ;     /    /__./ \ : |
  .   ;   /  ` ; .'___,/    ,' .--'.  '   \' .
  ;   |  ; \ ; | |    :     | /___/ \ |    ' '
  |   :  | ; | ' ;    |.';  ; ;   \  \;      :
  .   |  ' ' ' : `----'  |  |  \   ;  `      |
  '   ;  \; /  |     '   :  ;   .   \    .\  ;
   \   \  ',  /      |   |  '    \   \   ' \ |
    ;   :    /       '   :  |     :   '  |--"
     \   \ .'        ;   |.'       \   \ ;
  www. `---` ver     '---' he       '---" ire.org


Welcome to OverTheWire!

If you find any problems, please report them to Steven or morla on
irc.overthewire.org.

--[ Playing the games ]--

  This machine might hold several wargames.
  If you are playing "somegame", then:

    * USERNAMES are somegame0, somegame1, ...
    * Most LEVELS are stored in /somegame/.
    * PASSWORDS for each level are stored in /etc/somegame_pass/.

  Write-access to homedirectories is disabled. It is advised to create a
  working directory with a hard-to-guess name in /tmp/.  You can use the
  command "mktemp -d" in order to generate a random and hard to guess
  directory in /tmp/.  Read-access to both /tmp/ and /proc/ is disabled
  so that users can not snoop on eachother. Files and directories with
  easily guessable or short names will be periodically deleted!

  Please play nice:

    * don't leave orphan processes running
    * don't leave exploit-files laying around
    * don't annoy other players
    * don't post passwords or spoilers
    * again, DONT POST SPOILERS!
      This includes writeups of your solution on your blog or website!

--[ Tips ]--

  This machine has a 64bit processor and many security-features enabled
  by default, although ASLR has been switched off.  The following
  compiler flags might be interesting:

    -m32                    compile for 32bit
    -fno-stack-protector    disable ProPolice
    -Wl,-z,norelro          disable relro

  In addition, the execstack tool can be used to flag the stack as
  executable on ELF binaries.

  Finally, network-access is limited for most levels by a local
  firewall.

--[ Tools ]--

 For your convenience we have installed a few usefull tools which you can find
 in the following locations:

    * gef (https://github.com/hugsy/gef) in /usr/local/gef/
    * pwndbg (https://github.com/pwndbg/pwndbg) in /usr/local/pwndbg/
    * peda (https://github.com/longld/peda.git) in /usr/local/peda/
    * gdbinit (https://github.com/gdbinit/Gdbinit) in /usr/local/gdbinit/
    * pwntools (https://github.com/Gallopsled/pwntools)
    * radare2 (http://www.radare.org/)
    * checksec.sh (http://www.trapkit.de/tools/checksec.html) in /usr/local/bin/checksec.sh

--[ More information ]--

  For more information regarding individual wargames, visit
  http://www.overthewire.org/wargames/

  For support, questions or comments, contact us through IRC on
  irc.overthewire.org #wargames.

  Enjoy your stay!

Byebye !
Connection to bandit.labs.overthewire.org closed.
```

So it appears we cannot enter any commands as the `.bashrc` runs after we login and it logs us out immediately.  

So what can we do ? Well we know where the file with password is located, according to the description it is located in the home directory.

`/home/bandit18/readme`

We need a way to read the file since we can't stay logged in.  
When checking the man page for SSH we can see it is not just for logging into remote machines. The description says that SSH can also be used to execute commands on remote machines instead of logging in.

```text
SSH DESCRIPTION

ssh (SSH client) is a program for logging into a remote machine and for executing 
commands on a remote machine. It is intended to provide secure encrypted  
communications between two un‐trusted hosts over an insecure network.  
X11 connections, arbitrary TCP ports and UNIX-domain sockets can also be  
forwarded over the secure channel.

ssh connects and logs into the specified destination, which may be  
specified as either [user@]hostname or  
a URI of the form ssh://[user@]hostname[:port].  
The user must prove his/her identity to the remote machine using one of  
several methods (see below).

If a command is specified, it is executed on the remote host instead of a  
login shell.
```

This is exactly the functionalty we need to read the `readme` file.  
Now we can test this by passing the `ls` command to SSH.  

```bash
ssh bandit18@bandit.labs.overthewire.org -p 2220 "ls"             
This is a OverTheWire game server. More information on http://www.overthewire.org/wargames

bandit18@bandit.labs.overthewire.org's password: 
readme
```

Now we have verified that commands can be passed to SSH and know that `readme` is located in home directory we pass `cat readme` to SSH to read the file and get the password for bandit19.

```bash
ssh bandit18@bandit.labs.overthewire.org -p 2220 "cat readme"
This is a OverTheWire game server. More information on http://www.overthewire.org/wargames

bandit18@bandit.labs.overthewire.org's password:
IueksS##########################
```
