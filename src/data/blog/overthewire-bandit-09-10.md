---
title: OverTheWire Bandit Level 9 -> 10
author: Michael McDonagh
pubDatetime: 2025-02-22T23:12:00Z
slug: overthewire-bandit-10
featured: false
draft: false
tags:
  - overthewire
  - bandit
  - linux
ogImage: ""
description: Solution for OverTheWire Bandit level 10 challenge.
---

## Level Goal

The password for the next level is stored in the file `data.txt` in one of the few human-readable strings, preceded by several `=` characters.

---

## Walkthrough

Login to the server using the password obtained from the previous level [Bandit level 8 -> 9](/posts/overthewire-bandit-9).  

username: `bandit9`  

```bash
ssh bandit9@bandit.labs.overthewire.org -p 2220
```

Based on what the level goal tells us the file `data.txt` we will be searching will contain a mix of data and human-readable text.  
The password that we will be searching for is human-readable and is preceded by several `=` characters.  

First thing first lets see what the contents of `data.txt` looks like.

```bash
bandit9@bandit:~$ ls
data.txt

bandit9@bandit:~$ cat data.txt 
Llω;ßOܛǤXNdT$x7@D@o+DBM֢Z/,_w#5
                              Ўe&-ϢQ8J%fa
np6l
|cWW"&8f
VJ$S~d
      pkU;ֿvAmHtɘ3ߘ(ǟE'
                      ':uPעg
>'.9oc?D.\UU,L},
                )W[b;D51
                        cD^!`PKT5?)X爓F]2J-5|PrL{�DX
7<ʗE2Qk)>QGnW([>L[ŵ-GwJp_pTE}-��

v7[d4[Eed{s5d!۫*.d
                 CrAG1~趤b2%0`c*!`3r/ZȆڎxʟ}}$x?X7ҟjͽ黜`&
                                                        Q9܅J//M$a^;yzEt!pU~eϸ`Rn,IMTՁB$1,ɚџ|\{ɘV媼G74@[tk4ӶhobXQ��O`<!LVSXdKium��m\WB|{,xvdТxIY.}м&F,0fRV{l#@^SJp`EO%s~֬c}o?/
r-4
   GhG$========== the*2i"4kDsxz]+aƽg|Ax*_f^[Ro+OQf3,UtGy*
r\P0Z}آIǢك,ä(I%
        *
        *
        *
```

We can see alot of lines that look like gibberish (human unreadable).  
There is some lines of text that have multiple `=` in them.  
These are the lines we want to extract from the file.

We can do this manually searching the file line by line, it will be slow.  
A faster method is to use `strings` command.  
The `strings` command will find all human-readable strings in a file.

```bash
bandit9@bandit:~$ strings data.txt
Z/,_
WW"&8
2Qk)
xWa_
x?Xn
//M$
;yzEt!
WpU~e
`Rn,I
VSXdK
WB|{
GhG$
  *
  *
  *
```

Now that we can find all human-readable strings we can search these lines for the `=` characters that we know will precede the password.  
To search text for a specific word or characters we can use `grep` command again.

Running `grep` on the output of strings command will get the password for the next level.

```bash
bandit9@bandit:~$ strings data.txt | grep ====
========== the*2i"4
========== password
Z)========== is
&========== truKLd##########################
```
