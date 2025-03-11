---
title: OverTheWire Krypton Level 01 -> 02
author: Michael McDonagh
pubDatetime: 2025-03-02T10:55:00Z
slug: overthewire-krypton-2
featured: false
draft: false
tags:
  - overthewire
  - krypton
  - cryptography
ogImage: ""
description: Solution for OverTheWire Krypton level 2 challenge.
---

## Level Info  

The password for level 2 is in the file `krypton2`.  
It is `encrypted` using a simple rotation.  
It is also in non-standard ciphertext format.  
When using alpha characters for cipher text it is normal to group the letters into 5 letter clusters, regardless of word boundaries.  
This helps obfuscate any patterns.  
This file has kept the plain text word boundaries and carried them to the cipher text. Enjoy!

## Walkthrough

Solution for the Overthewire.org [Krypton level 1 -> 2](https://overthewire.org/wargames/krypton/krypton1.html)

Login to krypton1 using the password from obtained from previous level

```bash
ssh krypton1@krypton.labs.overthewire.org -p 2231
```

Looking at the directory `/krypton/krypton1/` we can see 2 files krypton2 and README.  
README contains instructions for the level.

```text
Welcome to Krypton!

This game is intended to give hands on experience with cryptography
and cryptanalysis.  The levels progress from classic ciphers, to modern,
easy to harder.

Although there are excellent public tools, like cryptool,to perform
the simple analysis, we strongly encourage you to try and do these
without them for now.  We will use them in later excercises.

** Please try these levels without cryptool first **


The first level is easy.  The password for level 2 is in the file
'krypton2'.  It is 'encrypted' using a simple rotation called ROT13.
It is also in non-standard ciphertext format.  When using alpha characters for
cipher text it is normal to group the letters into 5 letter clusters,
regardless of word boundaries.  This helps obfuscate any patterns.

This file has kept the plain text word boundaries and carried them to
the cipher text.

Enjoy!
```

According to the README the contents of `krypton2` is encrypted using a rotation cipher called ROT13.  
A becomes N,  
B becomes O,  
    .  
    .  
    .  
Y becomes L,  
Z becomes M.

Using the `tr` command we can reverse the ROT13 and get the decrypted contents of `krypton2`.

```bash
krypton1@krypton:/krypton/krypton1$ cat krypton2
YRIRY GJB CNFFJBEQ EBGGRA

krypton1@krypton:/krypton/krypton1$ cat krypton2 | tr A-Z N-ZA-M
LEVEL TWO PASSWORD ROT***
```
