---
title: OverTheWire Natas Level 6 -> 7
author: Michael McDonagh
pubDatetime: 2025-03-03T21:30:00Z
slug: overthewire-natas-7
featured: false
draft: false
tags:
  - overthewire
  - natas
  - web
ogImage: ""
description: Solution for OverTheWire Natas level 7 challenge.
---

## Description

Username: natas7

URL:      <http://natas7.natas.labs.overthewire.org>

---

## Solution

Solution for the Overthewire.org [Natas level 6 -> Level 7](https://overthewire.org/wargames/natas/natas7.html)

Visit the url `http://natas7.natas.labs.overthewire.org` in the browser and we get a prompt for login.

Use the username `natas7` and the password obtained from the previous challenge.

Once logged in we can see an a simple home page with 2 links.

![natas 7 index](@/assets/images/overthewire/natas/natas07_index.png)

Clicking on `Home` shows us the same page but with extra text and the url being different.

![natas7 home](@/assets/images/overthewire/natas/natas07_home.png)

And click on `About` shows gives us a very similar page to `Home`.

![natas7 about](@/assets/images/overthewire/natas/natas07_about.png)

When we check the source code of any of the three pages we get essentially the same code.

```html

<html>
<head>
<!-- This stuff in the header has nothing to do with the level -->
<link rel="stylesheet" type="text/css" href="http://natas.labs.overthewire.org/css/level.css">
<link rel="stylesheet" href="http://natas.labs.overthewire.org/css/jquery-ui.css" />
<link rel="stylesheet" href="http://natas.labs.overthewire.org/css/wechall.css" />
<script src="http://natas.labs.overthewire.org/js/jquery-1.9.1.js"></script>
<script src="http://natas.labs.overthewire.org/js/jquery-ui.js"></script>
<script src=http://natas.labs.overthewire.org/js/wechall-data.js></script><script src="http://natas.labs.overthewire.org/js/wechall.js"></script>
<script>var wechallinfo = { "level": "natas7", "pass": "7z3hEENjQtflzgnT29q7wAvMNfZdh0i9" };</script></head>
<body>
<h1>natas7</h1>
<div id="content">

<a href="index.php?page=home">Home</a>
<a href="index.php?page=about">About</a>
<br>
<br>
this is the front page

<!-- hint: password for webuser natas8 is in /etc/natas_webpass/natas8 -->
</div>
</body>
</html>
```

In each of the three pages there is a comment telling us the location of the password file on the server.

```html
<!-- hint: password for webuser natas8 is in /etc/natas_webpass/natas8 -->
```

Looking back at the urls in `Home` and `About` we can see there is a variable we can modify.

<http://natas7.natas.labs.overthewire.org/index.php?><b>page=home</b>

When we click on `Home` and `About` the value of the **page** variable changes.  
By using this can take advantage of it by using a technique call `Local File Inclusion` [link](https://www.aptive.co.uk/blog/local-file-inclusion-lfi-testing/) which allows us to enter the location of files on the server and be able to display them on the webpage.

We can test this by entering a file path that exists on all linux servers, the `/etc/passwd` file.

![natas7 lfi test](@/assets/images/overthewire/natas/natas07_lfi_passwd.png)

The local file inclusion succeeded so now we can use the file path given to us in the source code of the webpages to obtain the password.

![natas7 solution](@/assets/images/overthewire/natas/natas07_password.png)

Using the url of `http://natas7.natas.labs.overthewire.org/index.php?page=/etc/natas_webpass/natas8` we get the password.

```text
DBfUBf**************************
```
