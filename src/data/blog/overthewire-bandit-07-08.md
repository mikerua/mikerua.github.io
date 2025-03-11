---
title: OverTheWire Bandit Level 7 -> 8
author: Michael McDonagh
pubDatetime: 2025-02-22T23:08:00Z
slug: overthewire-bandit-8
featured: false
draft: false
tags:
  - overthewire
  - bandit
  - linux
ogImage: ""
description: Solution for OverTheWire Bandit level 8 challenge.
---



## Level Goal

The password for the next level is stored in the file `data.txt` next to the word `millionth`.

---

## Walkthrough  

Login to the server using the password obtained from the previous level [Bandit level 6 -> 7](/posts/overthewire-bandit-7).  

username: `bandit7`  

```bash
ssh bandit7@bandit.labs.overthewire.org -p 2220
```

For this level we need to find the word `millionth` in the `data.txt` file and the password for level 8 is next to the word `millionth`.  
First thing we need to do is see what data is in `data.txt`.  

```bash
bandit7@bandit:~$ ls
data.txt
bandit7@bandit:~$ cat data.txt
binning WnfnFPqkuhl2nwHBohzn2C4L5W0gwcLq
abuts   v8PAwDdkGDdp5NsJ7ZFM5A7TJ5MkYDbm
fathead wBhCy0fqvbQdexz5kMKBtGoSWgXw7s0H
attacks 3GzwnGiZnBDdVuHivJk1pEfOOYu7uOTa
lopping H9hzviFp1QO4WF8EzcQNl5MDz5r1bzUC
tyrannosaurus   WxtYXVar4sgInHp7YUpTzOjdUw1Ww0x8
reservists      QDidoX6BN1MDTi0QwA6Vt82L9Rb64cm3
atrophy's       mSpCwP9VgcGRn1SCD8R9bb9cPBl2yqkW
bolt's  726RB3lt2RmeCtbWEQ8lhUAxVBJfepy0
Klondikes       wVh3ILxQAsKg8WNnFHp8GxtnSu213GbR
        *
        *
        *
Aymara  zSeUS0UyD8Q6a6YPwaClRBbk1x8kFBEc
waned   gL59r6xvewh5y8t0mgiNtHtCUMG8S6Id
conceded        TWLUptX3HbwD4qsYOQ9sENOnOiNy79sC
kilned  kLjrgoJvftIyUyotuOI4cxFcxQXbC6aS
Santayana       KKn1I4fuWdzKyvffp1aYrBDzQa3Tr3Pk
Antigua dRyNieqAg0OkCgrKVQFXMXS06vFArL55
heyday  UAGwMlFzylGa4fHpQZEelUQEZ5JlUpyX
praiseworthiness's      bjRB0uGXM4dH7ip9hHB3mbFBMMwlNKNq
separatism      p2167YTCJseAv4YhLZNb2fs7JivlDLUW
plan    PLz4ZXwX02fEe4oMd1I78wQXl4MIMxTf
confrontation   KlHScgMgzyBQYxBXkxsjKcQ2A5erDIjL
briquet's       aHc51xHj1t3ANF7jH26dd7mHWBfd8VKz
encapsulate     STOVYQEMWtFz54JtjJRrhDXgZcfVw8lS
wildfowls       PqcMofjmKj8NBvO9exdu7FY2NG6WUMzb
Finland xgXsIYgqUCMriMoT7W2dSwTG1DCvbRvU
bandit7@bandit:~$
```

When we `cat` the file a large amount of text appears on the screen and keeps printing new lines for several seconds.  
What we do learn from this is the structure of the file `<WORD> <PASSWORD>` and that the file contains a large amount of text.  

We can check how many lines are in the file using the `wc` (Word Count)command.  
Using `wc -l` (-l for line) to count the number of lines in data.txt we can see that there is too many to search one by one.  

```bash
bandit7@bandit:~$ wc -l data.txt
98567 data.txt
```

As the file has 98567 lines of text searching manually line by line will take too much time.  
We need a tool that can search for text within file.  

The `grep` (Global Regular Expression Print) command can be used to search files for specific words or string of text.  
Using `grep` we can find and print out the line containing the word `millionth`.

```bash
bandit7@bandit:~$ ls
data.txt
bandit7@bandit:~$ grep millionth data.txt 
millionth       cvX2JJ##########################
```
