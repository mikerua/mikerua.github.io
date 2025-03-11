---
title: OverTheWire Natas Level 0 -> 1
author: Michael McDonagh
pubDatetime: 2025-03-02T15:30:00Z
slug: overthewire-natas-1
featured: false
draft: false
tags:
  - overthewire
  - natas
  - web
ogImage: ""
description: Solution for OverTheWire Natas level 1 challenge.
---

## Description  

Username: natas1  
URL:      <http://natas1.natas.labs.overthewire.org>

## Walkthrough

Solution for the Overthewire.org [Natas level 0 -> Level 1](https://overthewire.org/wargames/natas/natas1.html)

Visit the url `http://natas1.natas.labs.overthewire.org` in the browser and we get a prompt for login.

Use the username `natas1` and the password obtained from the previous challenge.

![](@/assets/images/overthewire/natas/natas01_home_page.png)

There is a message on the site stating that right clicking has been disabled. 

If we do try to right click the webpage we get an error message.

![](@/assets/images/overthewire/natas/natas01_rightClick.png)

So we need to use an alternative method to view the page source.

On a Windows machine we can use `Ctrl + U` keyboard shortcut to view page source.

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
<script>var wechallinfo = { "level": "natas1", "pass": "gtVrDuiDfck831PqWsLEZy5gyDz1clto" };</script></head>
<body oncontextmenu="javascript:alert('right clicking has been blocked!');return false;">
<h1>natas1</h1>
<div id="content">
You can find the password for the
next level on this page, but rightclicking has been blocked!

<!--The password for natas2 is ZluruA************************** -->
</div>
</body>
</html>
```

Like the first challenge the password is a comment in the source code

```text
The password for natas2 is ZluruA**************************
```
