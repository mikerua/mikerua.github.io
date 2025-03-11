---
title: OverTheWire Natas Level 2 -> 3
author: Michael McDonagh
pubDatetime: 2025-03-02T17:30:00Z
slug: overthewire-natas-3
featured: false
draft: false
tags:
  - overthewire
  - natas
  - web
ogImage: ""
description: Solution for OverTheWire Natas level 3 challenge.
---

## Description  

Username: natas3  
URL:      <http://natas3.natas.labs.overthewire.org>

## Walkthrough

Solution for the Overthewire.org [Natas level 2 -> Level 3](https://overthewire.org/wargames/natas/natas3.html)

Visit the url `http://natas3.natas.labs.overthewire.org` in the browser and we get a prompt for login.

Use the username `natas3` and the password obtained from the previous challenge.

The home page has a message stating nothing on the page.

![Natas 03 home page](@/assets/images/overthewire/natas/natas03_home_page.png)

Next we check the source code `Ctrl+U`

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
<script>var wechallinfo = { "level": "natas3", "pass": "sJIJNW6ucpu6HPZ1ZAchaDtwd7oGrD14" };</script></head>
<body>
<h1>natas3</h1>
<div id="content">
There is nothing on this page
<!-- No more information leaks!! Not even Google will find it this time... -->
</div>
</body></html>
```

This time there is no password or images in the source code.  

We are given a clue as to where to look next in the comment.

```text
No more information leaks!! Not even Google will find it this time...
```

The way to stop Google from indexing a site is to use a `robots.txt` file. The file is used to stop web crawlers from visiting the whole site or specific folders.

![Natas 03 Robots.txt](@/assets/images/overthewire/natas/natas03_robots_txt.png)

We can see from the `robots.txt` that there is another directory to look into `/s3cr3t/`.

The `/s3cr3t/` directory contains a single document.

![Natas 03 secret link](@/assets/images/overthewire/natas/natas03_s3cr3t.png)

Reading `users.txt` will give us the password for the next challenge.

```text
natas4:Z9tkRk**************************
```
