---
title: OverTheWire Bandit Level 12 -> 13
author: Michael McDonagh
pubDatetime: 2025-02-27T23:30:00Z
slug: overthewire-bandit-13
featured: false
draft: false
tags:
  - overthewire
  - bandit
  - linux
ogImage: ""
description: Solution for OverTheWire Bandit level 13 challenge.
---

## Level Goal

The password for the next level is stored in the file `data.txt`,  
which is a hexdump of a file that has been repeatedly compressed.  
For this level it may be useful to create a directory under /tmp in which you can work using mkdir.  

For example: mkdir /tmp/myname123.  
Then copy the datafile using cp, and rename it using mv (read the manpages!)

---

## Walkthrough

Solution for the Overthewire.org [Bandit level 12 -> 13](https://overthewire.org/wargames/bandit/bandit13.html)

Login to the server using the password obtained from the previous level [Bandit level 11 -> 12](/posts/overthewire-bandit-12).  

username: `bandit12`

```bash
ssh bandit12@bandit.labs.overthewire.org -p 2220
```

The `data.txt` file in located in the home directory when you login.  
Running `head data.txt` will let us see 10 lines of what the contents  
of the file looks like.

```bash
bandit12@bandit:~$ ls
data.txt

bandit12@bandit:~$ head data.txt 
00000000: 1f8b 0808 0650 b45e 0203 6461 7461 322e  .....P.^..data2.
00000010: 6269 6e00 013d 02c2 fd42 5a68 3931 4159  bin..=...BZh91AY
00000020: 2653 598e 4f1c c800 001e 7fff fbf9 7fda  &SY.O...........
00000030: 9e7f 4f76 9fcf fe7d 3fff f67d abde 5e9f  ..Ov...}?..}..^.
00000040: f3fe 9fbf f6f1 feee bfdf a3ff b001 3b1b  ..............;.
00000050: 5481 a1a0 1ea0 1a34 d0d0 001a 68d3 4683  T......4....h.F.
00000060: 4680 0680 0034 1918 4c4d 190c 4000 0001  F....4..LM..@...
00000070: a000 c87a 81a3 464d a8d3 43c5 1068 0346  ...z..FM..C..h.F
00000080: 8343 40d0 3400 0340 66a6 8068 0cd4 f500  .C@.4..@f..h....
00000090: 69ea 6800 0f50 68f2 4d00 680d 06ca 0190  i.h..Ph.M.h.....
```

As the description said the file `data.txt` is a hexdump of a file.  
A hexdump is the hexadecimal representation of a file.  
Before we can work on data.txt we need create a temporary folder to act as a working directory and then copy the data.txt file into the temp folder.  

```bash
bandit12@bandit: mkdir /tmp/bandit_123
bandit12@bandit: cp data.txt /tmp/bandit_123/
bandit12@bandit: cd /tmp/bandit_123
```

Now we can work on the file. First thing is to reverse the hexdump to obtain the original file.  
We use the [xxd](https://linux.die.net/man/1/xxd) command for this.  
`xxd` normally creates a hexdump of the given input, we use the `-r` option to revert the hexdump back into its original state.

```bash
bandit12@bandit:/tmp/bandit_123$ xxd -r data.txt data.out
```

Now we run `file` on `data.out` to find out what type of file it is.  
This instance the file is a [gzip](https://linux.die.net/man/1/gzip) compressed file.  
Now we rename the file from `data.out` to `data1.gz` so we can uncompressed the file using [gunzip](https://linux.die.net/man/1/gzip).  
We can use either of these commands to decompress the compressed file.  
`gzip -d data.gz` or `gunzip data.gz`

```bash
bandit12@bandit:/tmp/bandit_123$ file data.out
data.out: gzip compressed data, was "data2.bin", last modified: Thu May  7 18:14:30 2020, max compression, from Unix

bandit12@bandit:/tmp/bandit_123$ mv data.out data1.gz
bandit12@bandit:/tmp/bandit_123$ gunzip data1.gz
```

After uncompressing the `data1.gz` we get a new file `data1`. Again we run `file` to see what file type we are dealing with now.  
It is a compressed file again this time a [bzip2](https://linux.die.net/man/1/bzip2) file.  
We rename the file giving it a [bzip2](https://linux.die.net/man/1/bzip2) extension and decompress.  
We use the command `bzip2 -d data.bz2` to decompress the file.

```bash
bandit12@bandit:/tmp/bandit_123$ ls
data1  data1.out data.txt

bandit12@bandit:/tmp/bandit_123$ file data1
data1:     bzip2 compressed data, block size = 900k

bandit12@bandit:/tmp/bandit_123$ mv data1 data2.bz2
bandit12@bandit:/tmp/bandit_123$ bzip2 -d data2.bz2
```

Running file on the newly decompressed file tells us it is another gzip file.  
Again we rename it adding the *.gz* extension and then decompress.

```bash
bandit12@bandit:/tmp/bandit_123$ ls
data2 data.txt

bandit12@bandit:/tmp/bandit_123$ file data2
data2.out: gzip compressed data, was "data4.bin", last modified: Thu May  7 18:14:30 2020, max compression, from Unix

bandit12@bandit:/tmp/bandit_123$ mv data2 data3.gz
bandit12@bandit:/tmp/bandit_123$ gunzip data3.gz
```

Running file on the new file tells us it is a [POSIX tar archive](https://linux.die.net/man/1/tar)  
POSIX tar archives use the *.tar* extension.  
Rename the file adding the *.tar* extension and then decompress.  
We use the command `tar xvf data.tar` to decompress the file.  
`x` for extract.  
`v` for list all files extracted.  
`f` to let the tar command know to use an input file.

```bash
bandit12@bandit:/tmp/bandit_123$ ls
data3  data.txt

bandit12@bandit:/tmp/bandit_123$ file data3
data3: POSIX tar archive (GNU)

bandit12@bandit:/tmp/bandit_123$ mv data3 data4.tar

bandit12@bandit:/tmp/bandit_123$ tar xvf data4.tar
data5.bin
```

The `file` command tells us that data5.bin is another tar archive.
Rename data5.bin giving it the *.tar* extension and then extract the file again with the `tar` command

```bash
bandit12@bandit:/tmp/bandit_123$ file data5.bin
data5.bin: POSIX tar archive (GNU)

bandit12@bandit:/tmp/bandit_123$ mv data5.bin data5.tar

bandit12@bandit:/tmp/bandit_123$ tar xvf data5.tar
data6.bin
```

File command tells us that data6.bin is another bzip2 compressed file.  
Rename from data6.bin to data6.bz2.
Uncompress data6.bz2.

```bash
bandit12@bandit:/tmp/bandit_123$ file data6.bin
data6.bin: bzip2 compressed data, block size = 900k

bandit12@bandit:/tmp/bandit_123$ mv data6.bin data6.bz2

bandit12@bandit:/tmp/bandit_123$ bzip2 -d data6.bz2
```

File command tells us that data6 is another tar archive.  
Rename from data6 to data6.tar.
Uncompress data6.tar.

```bash
bandit12@bandit:/tmp/bandit_123$ ls
data4.tar  data5.tar  data6  data.txt

bandit12@bandit:/tmp/bandit_123$ file data6
data6: POSIX tar archive (GNU) 

bandit12@bandit:/tmp/bandit_123$ mv data6 data6.tar

bandit12@bandit:/tmp/bandit_123$ tar xvf data6.tar
data8.bin
```

File command tells us that data8.bin is another gzip compressed file.  
Rename from data8.bin to data8.gz.
Uncompress data8.gz.

```bash
bandit12@bandit:/tmp/bandit_123$ ls
data4.tar  data5.tar  data6.tar  data8.bin  data.txt

bandit12@bandit:/tmp/bandit_123$ file data8.bin
data8.bin: gzip compressed data, was "data9.bin", last modified: Thu May  7 18:14:30 2020, max compression, from Unix

bandit12@bandit:/tmp/bandit_123$ mv data8.bin data8.gz
bandit12@bandit:/tmp/bandit_123$ gunzip data8.gz
```

After all that decompressing we finally have a text file.
File command tells us that `data8` is a ASCII text file.  
Cat `data8` in order to read the password.

```bash
bandit12@bandit:/tmp/bandit_123$ ls
data4.tar  data5.tar  data6.tar  data8  data.txt

bandit12@bandit:/tmp/bandit_123$ file data8
data8: ASCII text 

bandit12@bandit:/tmp/bandit_123$ cat data8 
The password is 8ZjyCR##########################
```

## Extra

Having gone through all that file, rename and extract commands, I wondered if I could improve it and create a single line command to solve this challenge.

Checking the gunzip and bzip2 man pages I saw an option to output to stdout instead of creating a file.

```bash
-c --stdout
```

The same option for tar command is  

```bash
-O, --to-stdout
```

By outputing the results to standard out (terminal screen) we can pipe the output of one command into the next.

```bash
xxd -r data.txt | gunzip -c | bzip2 -cd | gunzip -c | tar -xO | tar -xO | bzip2 -cd | tar -xO | gunzip -c

The password is 8ZjyCR##########################
```
