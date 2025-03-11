---
title: OverTheWire Natas Level 0
author: Michael McDonagh
pubDatetime: 2025-03-02T15:30:00Z
slug: overthewire-natas-0
featured: false
draft: false
tags:
  - overthewire
  - natas
  - web
ogImage: ""
description: Solution for OverTheWire Natas level 0 challenge.
---

## Description  

Username: natas0  
Password: natas0  
URL:      <http://natas0.natas.labs.overthewire.org>

## Walkthrough

Solution for the Overthewire.org [Natas level 0](https://overthewire.org/wargames/natas/natas0.html)

Visit the url `http://natas0.natas.labs.overthewire.org` in the browser and we get a prompt for login.

![login page](@/assets/images/overthewire/natas/natas00_login.png)

Use the username `natas0` and password `natas0` to login and begin the challenge.

![home page](@/assets/images/overthewire/natas/natas00_home_page.png)

Since there is nothing to see on the site the next place to look is in the source code.

Right click on the webpage and click on `view page source`.

The password for natas1 is hidden as a comment in the source code of the page.

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
<script>var wechallinfo = { "level": "natas0", "pass": "natas0" };</script></head>
<body>
<h1>natas0</h1>
<div id="content">
You can find the password for the next level on this page.

<!--The password for natas1 is gtVrDu************************** -->
</div>
</body>
</html>
```

The password for natas1

```text
The password for natas1 is gtVrDu**************************
```
