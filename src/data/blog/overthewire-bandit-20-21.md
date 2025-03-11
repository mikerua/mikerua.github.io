---
title: OverTheWire Bandit Level 20 -> 21
author: Michael McDonagh
pubDatetime: 2025-03-01T22:35:00Z
slug: overthewire-bandit-21
featured: false
draft: false
tags:
  - overthewire
  - bandit
  - linux
ogImage: ""
description: Solution for OverTheWire Bandit level 21 challenge.
---

## Level Goal

There is a setuid binary in the homedirectory that does the following:  
it makes a connection to localhost on the port you specify as a commandline argument.  
It then reads a line of text from the connection and compares it to the password in the previous level (bandit20).  
If the password is correct, it will transmit the password for the next level (bandit21).

`NOTE:` Try connecting to your own network daemon to see if it works as you think

---

## Walkthrough

Solution for the Overthewire.org [Bandit level 20 -> 21](https://overthewire.org/wargames/bandit/bandit21.html)

Login to the server using the password obtained from the previous level [Bandit level 19 -> 20](/posts/overthewire-bandit-20).  

username: `bandit20`  

```bash
ssh bandit20@bandit.labs.overthewire.org -p 2220
```

Like the previous level we will be using a setuid binary file. We can run it to find out how to use it correctly.

```bash
bandit20@bandit:~$ ls
suconnect

bandit20@bandit:~$ ./suconnect 
Usage: ./suconnect <portnumber>
This program will connect to the given port on localhost using TCP. If it receives the correct password from the other side, the next password is transmitted back.        

bandit20@bandit:~$
```

So `suconnect` will accept a port number as an argument and try to receive the password from a TCP connection on the port, if the password is correct `suconnect` will send the new password to the back as a reply.

One problem is that currently there is nothing for `suconnect` to connect to. The challenge is for us to create a TCP connection for `suconnect` to connect to.

We can do this using `netcat (nc)`. We can open a listener with netcat on a specific port and on a second terminal instance we run the `suconnect` binary. Once the connection is made we send the password using netcat and `suconnect` should reply with the new password.

```bash
Terminal 1
bandit20@bandit:~$ nc -l -p 4444

-------------------------------------------------

Terminal 2
bandit20@bandit:~$ ./suconnect 4444

```

On  Terminal 1 we have run netcat with the `-l` for listening and `-p` for port number.  
On Terminal 2 we ran the `suconnect` with the same port number used for netcat.

```bash
Terminal 1

bandit20@bandit:~$ nc -lp 4444
GbKksE##########################
gE269g##########################
bandit20@bandit:~$ 

----------------------------------------------------
Terminal 2

bandit20@bandit:~$ ./suconnect 4444
Read: GbKksE########################## 
Password matches, sending next password

bandit20@bandit:~$
```

## Alternative

Alternatively we can create the TCP server using a python script in place of using netcat.

In the python file we specify the `host` 127.0.0.1, `port` 4444 and the password to be sent. When the script is run it will open a TCP connection on port 4444 and wait for something to connect, when it receives the connection from suconnect the python script will send the password and receive the new password back.

```python
#!/usr/bin/env python3

import socket

HOST = '127.0.0.1' # localhost
PORT = 4444 # use the same port number with suconnect

# Password for bandit20
PASSWORD = 'GbKksE##########################' 

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()
    conn, addr = s.accept()
    with conn:
        conn.sendall(bytes(PASSWORD, "utf-8"))
        data = conn.recv(1024)
        print(data.decode('utf-8'))
```

Again we will need 2 terminals open one to run the python script and the other to run suconnect.

```bash
Terminal 1

bandit20@bandit:~$ python3 tcp_server.py
gE269g##########################

bandit20@bandit:~$
----------------------------------------------
Terminal 2

bandit20@bandit:~$ ./suconnect 4444
Read: GbKksE########################## 
Password matches, sending next password

bandit20@bandit:~$
```
