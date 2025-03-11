---
title: OverTheWire Bandit Level 16 -> 17
author: Michael McDonagh
pubDatetime: 2025-03-01T22:10:00Z
slug: overthewire-bandit-17
featured: false
draft: false
tags:
  - overthewire
  - bandit
  - linux
ogImage: ""
description: Solution for OverTheWire Bandit level 17 challenge.
---

## Level Goal

The credentials for the next level can be retrieved by submitting the password of the current level to `a port on localhost in the range 31000 to 32000`. First find out which of these ports have a server listening on them. Then find out which of those speak SSL and which don’t. There is only 1 server that will give the next credentials, the others will simply send back to you whatever you send to it.

---

## Walkthrough

Solution for the OverTheWire.org [Bandit level 16 -> 17](https://overthewire.org/wargames/bandit/bandit17.html)

Login to the server using the password obtained from the previous level [Bandit level 15 -> 16](/posts/overthewire-bandit-16).  

username: `bandit16`  

```bash
ssh bandit16@bandit.labs.overthewire.org -p 2220
```

This level has multiple steps to find the password.  

1. Find what ports are open between 31000 and 32000
2. Find which ports are using SSL encryption
3. Get next password by sending current password to the correct port.

We use a network mapper to check each port for their open/closed status and what service is running on the ports.  
The network mapper we will use is [nmap](https://nmap.org/) and it was developed by the same people as the ncat tool used in the previous level.

Nmap can check what service is running on ports as well as whether they are open or closed.

The nmap command to find open ports between 31000 and 32000 and what service is running is

`nmap -sV -p 31000-32000 localhost`  

* `-sV`   Version detection
* `-p 31000-320000`   only check ports 31000 - 320000
* `localhost`    the target for the network mapping scan

Running the command will give us this output.

```bash
bandit16@bandit:~$ nmap -sV -p 31000-32000 localhost

Starting Nmap 7.40 ( https://nmap.org ) at 2021-09-23 00:58 CEST
Nmap scan report for localhost (127.0.0.1)
Host is up (0.00031s latency).
Not shown: 996 closed ports
PORT      STATE SERVICE     VERSION
31046/tcp open  echo
31518/tcp open  ssl/echo
31691/tcp open  echo
31790/tcp open  ssl/unknown
31960/tcp open  echo
1 service unrecognized despite returning data. If you know the service/version, please submit the following fingerprint at https://nmap.org/cgi-bin/submit.cgi?new-service :
SF-Port31790-TCP:V=7.40%T=SSL%I=7%D=9/23%Time=614BB50A%P=x86_64-pc-linux-g
SF:nu%r(GenericLines,31,"Wrong!\x20Please\x20enter\x20the\x20correct\x20cu
SF:rrent\x20password\n")%r(GetRequest,31,"Wrong!\x20Please\x20enter\x20the
SF:\x20correct\x20current\x20password\n")%r(HTTPOptions,31,"Wrong!\x20Plea
SF:se\x20enter\x20the\x20correct\x20current\x20password\n")%r(RTSPRequest,
SF:31,"Wrong!\x20Please\x20enter\x20the\x20correct\x20current\x20password\
SF:n")%r(Help,31,"Wrong!\x20Please\x20enter\x20the\x20correct\x20current\x
SF:20password\n")%r(SSLSessionReq,31,"Wrong!\x20Please\x20enter\x20the\x20
SF:correct\x20current\x20password\n")%r(TLSSessionReq,31,"Wrong!\x20Please
SF:\x20enter\x20the\x20correct\x20current\x20password\n")%r(Kerberos,31,"W
SF:rong!\x20Please\x20enter\x20the\x20correct\x20current\x20password\n")%r
SF:(FourOhFourRequest,31,"Wrong!\x20Please\x20enter\x20the\x20correct\x20c
SF:urrent\x20password\n")%r(LPDString,31,"Wrong!\x20Please\x20enter\x20the
SF:\x20correct\x20current\x20password\n")%r(LDAPSearchReq,31,"Wrong!\x20Pl
SF:ease\x20enter\x20the\x20correct\x20current\x20password\n")%r(SIPOptions
SF:,31,"Wrong!\x20Please\x20enter\x20the\x20correct\x20current\x20password
SF:\n");

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 89.60 seconds
bandit16@bandit:~$
```

The scan shows us that there is 5 ports open and that only 2 of them are using SSL.

31046/tcp open  echo  
`31518/tcp open  ssl/echo`  
31691/tcp open  echo  
`31790/tcp open  ssl/unknown`  
31960/tcp open  echo  

Port 31518 will repeat anything we send it back to us.  
The port we need is port 31790.  

Like the previous levels we use ncat to open a SSL encrypted connection to port 31790 on localhost and send the password for the current level.

```bash
bandit16@bandit:~$ ncat --ssl localhost 31790 
cluFn7w##########################
Correct!

-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEAvmOkuifmMg6HL2YPIOjon6iWfbp7c3jx34YkYWqUH57SUdyJ
imZzeyGC0gtZPGujUSxiJSWI/oTqexh+cAMTSMlOJf7+BrJObArnxd9Y7YT2bRPQ
Ja6Lzb558YW3FZl87ORiO+rW4LCDCNd2lUvLE/GL2GWyuKN0K5iCd5TbtJzEkQTu
DSt2mcNn4rhAL+JFr56o4T6z8WWAW18BR6yGrMq7Q/kALHYW3OekePQAzL0VUYbW
JGTi65CxbCnzc/w4+mqQyvmzpWtMAzJTzAzQxNbkR2MBGySxDLrjg0LWN6sK7wNX
x0YVztz/zbIkPjfkU1jHS+9EbVNj+D1XFOJuaQIDAQABAoIBABagpxpM1aoLWfvD
KHcj10nqcoBc4oE11aFYQwik7xfW+24pRNuDE6SFthOar69jp5RlLwD1NhPx3iBl
J9nOM8OJ0VToum43UOS8YxF8WwhXriYGnc1sskbwpXOUDc9uX4+UESzH22P29ovd
d8WErY0gPxun8pbJLmxkAtWNhpMvfe0050vk9TL5wqbu9AlbssgTcCXkMQnPw9nC
YNN6DDP2lbcBrvgT9YCNL6C+ZKufD52yOQ9qOkwFTEQpjtF4uNtJom+asvlpmS8A
vLY9r60wYSvmZhNqBUrj7lyCtXMIu1kkd4w7F77k+DjHoAXyxcUp1DGL51sOmama
+TOWWgECgYEA8JtPxP0GRJ+IQkX262jM3dEIkza8ky5moIwUqYdsx0NxHgRRhORT
8c8hAuRBb2G82so8vUHk/fur85OEfc9TncnCY2crpoqsghifKLxrLgtT+qDpfZnx
SatLdt8GfQ85yA7hnWWJ2MxF3NaeSDm75Lsm+tBbAiyc9P2jGRNtMSkCgYEAypHd
HCctNi/FwjulhttFx/rHYKhLidZDFYeiE/v45bN4yFm8x7R/b0iE7KaszX+Exdvt
SghaTdcG0Knyw1bpJVyusavPzpaJMjdJ6tcFhVAbAjm7enCIvGCSx+X3l5SiWg0A
R57hJglezIiVjv3aGwHwvlZvtszK6zV6oXFAu0ECgYAbjo46T4hyP5tJi93V5HDi
Ttiek7xRVxUl+iU7rWkGAXFpMLFteQEsRr7PJ/lemmEY5eTDAFMLy9FL2m9oQWCg
R8VdwSk8r9FGLS+9aKcV5PI/WEKlwgXinB3OhYimtiG2Cg5JCqIZFHxD6MjEGOiu
L8ktHMPvodBwNsSBULpG0QKBgBAplTfC1HOnWiMGOU3KPwYWt0O6CdTkmJOmL8Ni
blh9elyZ9FsGxsgtRBXRsqXuz7wtsQAgLHxbdLq/ZJQ7YfzOKU4ZxEnabvXnvWkU
YOdjHdSOoKvDQNWu6ucyLRAWFuISeXw9a/9p7ftpxm0TSgyvmfLF2MIAEwyzRqaM
77pBAoGAMmjmIJdjp+Ez8duyn3ieo36yrttF5NSsJLAbxFpdlc1gvtGCWW+9Cq0b
dxviW8+TFVEBl1O4f7HVm6EpTscdDxU+bCXWkfjuRb7Dy9GOtt9JPsX8MBTakzh3
vBgsyi/sN3RqRBcGU40fOoZyfAMT8s1m/uYv52O6IgeuZ/ujbjY=
-----END RSA PRIVATE KEY-----
```

Instead of a password we get a large amount of base64 encoded data.  
This data is a RSA Private Key.

By copy and pasting the base64 data and the surrounding '-----BEGIN RSA PRIVATE KEY-----' and '-----END RSA PRIVATE KEY-----' into a new file we can create a usuable ssh private key like we used in [level 13 -> 14]({% post_url 2021-11-13-overthewire-bandit-14 %})

It doesn't matter what name you give the file. I named it ssh_key.  
Before we can use the ssh_key to login to the next level we need to change it's permissions so that only we(the user) can read and write.

```bash
bandit16@bandit:~$ chmod 600 ssh_key

bandit16@bandit:~$ ssh -i ssh_key bandit17@localhost

bandit17@bandit:~$
```

Now that we are logged into bandit17 we have completed the level but we should retrieve the password to make it easier to log into bandit17 in future.

All passwords are located in /etc/bandit_pass/ but you can only read the file with same name as the level you are logged into.

```bash
bandit17@bandit:~$ cat /etc/bandit_pass/bandit17
xLYVMN##########################
```
