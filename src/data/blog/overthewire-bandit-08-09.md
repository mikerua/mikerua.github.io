---
title: OverTheWire Bandit Level 8 -> 9
author: Michael McDonagh
pubDatetime: 2025-02-22T23:10:00Z
slug: overthewire-bandit-9
featured: false
draft: false
tags:
  - overthewire
  - bandit
  - linux
ogImage: ""
description: Solution for OverTheWire Bandit level 9 challenge.
---

## Level Goal

The password for the next level is stored in the file `data.txt` and is the only line of text that occurs only once.

---

## Walkthrough  

Login to the server using the password obtained from the previous level [Bandit level 7 -> 8](/posts/overthewire-bandit-8).  

username: `bandit8`  

```bash
ssh bandit8@bandit.labs.overthewire.org -p 2220
```

For this level we need to search all lines of text in the a file and find the single line that is unique (only occurs once) in the file.  

```bash
bandit8@bandit:~$ ls
data.txt

bandit8@bandit:~$ cat data.txt 
VkBAEWyIibVkeURZV5mowiGg6i3m7Be0
zdd2ctVveROGeiS2WE3TeLZMeL5jL7iM
sYSokIATVvFUKU4sAHTtMarfjlZWWj5i
ySvsTwlMgnUF0n86Fgmn2TNjkSOlrV72
NLWvtQvL7EaqBNx2x4eznRlQONULlCYZ
LfrBHfAh0pP9bgGAZP4QrVkut3pysAYC
U0NYdD3wHZKpfEg9qGQOLJimAJy6qxhS
flyKxCbHB8uLTaIB5LXqQNuJj3yj00eh
TThRArdF2ZEXMO47TIYkyPPLtvzzLcDf
cIPbot7oYveUPNxDMhv1hiri50CqpkTG
        *
        *
        *
iwE0KTeKQ8PWihqvjUnpu52YZeIO8Pqb
qaWWAOOquC3yHnfJI4zvPWzCBdfHQ8wa
0N65ZPpNGkUJePzFxctCRZRXVrCbUGfm
cR6riSWC0ST7ALZ2i1e47r3gc0QxShGo
TKUtQbeYnEzzYIne7BinoBx2bHFLBXzG
8NtHZnWzCA8HswoJSCU7Ojg8nP3eKpsA
SzwgS2ADSjP6ypOzp2bIvdqNyusRtrHj
5AdqWjoJOEdx5tJmZVBMo0K2e4arD3ZW
gqyF9CW3NNIiGW27AtWVNPqp3i1fxTMY
flyKxCbHB8uLTaIB5LXqQNuJj3yj00eh
w4zUWFGTUrAAh8lNkS8gH3WK2zowBEkA
bandit8@bandit:~$
```

Printing the contents of the file to the screen we can see there is lot of lines of text and each line is made up of one password.  
Using `wc -l` we can see how many lines are in the file.

```bash
bandit8@bandit:~$ wc -l data.txt 
1001 data.txt
```

1001 lines is too much to check manually.  
Before we can eliminate the duplicated lines we need to group them together.  
`sort` command can sort the contents of a file and print to screen.

```bash
bandit8@bandit:~$ sort data.txt
07KC3ukwX7kswl8Le9ebb3H3sOoNTsR2
07KC3ukwX7kswl8Le9ebb3H3sOoNTsR2
07KC3ukwX7kswl8Le9ebb3H3sOoNTsR2
07KC3ukwX7kswl8Le9ebb3H3sOoNTsR2
07KC3ukwX7kswl8Le9ebb3H3sOoNTsR2
07KC3ukwX7kswl8Le9ebb3H3sOoNTsR2
07KC3ukwX7kswl8Le9ebb3H3sOoNTsR2
07KC3ukwX7kswl8Le9ebb3H3sOoNTsR2
07KC3ukwX7kswl8Le9ebb3H3sOoNTsR2
07KC3ukwX7kswl8Le9ebb3H3sOoNTsR2
0efnqHY1ZTNRu4LsDX4D73DsxIQq7RuJ
0efnqHY1ZTNRu4LsDX4D73DsxIQq7RuJ
0efnqHY1ZTNRu4LsDX4D73DsxIQq7RuJ
0efnqHY1ZTNRu4LsDX4D73DsxIQq7RuJ
0efnqHY1ZTNRu4LsDX4D73DsxIQq7RuJ
        *
        *
        *
```

Now we have grouped all duplicated lines we can elimiate the doubles.  
`uniq` command will let us eliminated duplicated lines so we only see single occurences of each line.  
We `sort` the data and pipe that to `uniq` to remove all the doubles.

```bash
bandit8@bandit:~$ sort data.txt | uniq
07KC3ukwX7kswl8Le9ebb3H3sOoNTsR2
0efnqHY1ZTNRu4LsDX4D73DsxIQq7RuJ
0N65ZPpNGkUJePzFxctCRZRXVrCbUGfm
0Xo6DLyK5izRqEtBA7sW2SRmlAixWYSg
10XitczY5Dz7UMoseKIeFWSzzwQrylfw
1ETSsKgjfQj1cJeFzXLJWzKzza3iWcJa
1T6qw9I32d71cS3TTvwmVp1WsxPFDJ9I
2bFz9F0yRwxGzVCZ4Er04bk00qfUrzWb
2CxmtCkpNL5ZjuoNzAtShkPXf5T43W7s
337o85y4OymIh99WPUtotkb114evfAkC
33xpPQhjt4Q2mqtX4sCVRwH2Zyh82E8R
4SMqyZZztep75cte6xxKpVL49pKUkV8N
5AdqWjoJOEdx5tJmZVBMo0K2e4arD3ZW
5cO8XuoQWrzsyeOWDht8zgUIVWSRDaeC
6PF22p6O8TphCTZot9ApZx8VfGuo8rd5
        *
        *
        *
```

Eventhough we have removed all doubled lines we still have not narrowed down the search to the one line that is entirely unique.  
The man page of `uniq` shows an option for unique lines.

```text
Excerpt form the man page of uniq

       -u, --unique
              only print unique lines
```

Combining the `sort` and `uniq -u` we can get the single line of text in `data.txt` that is entirely unique.

```bash
bandit8@bandit:~$ sort data.txt | uniq -u
UsvVyF##########################
```
