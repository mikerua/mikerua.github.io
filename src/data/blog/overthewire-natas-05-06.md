---
title: OverTheWire Natas Level 5 -> 6
author: Michael McDonagh
pubDatetime: 2025-03-03T20:45:00Z
slug: overthewire-natas-6
featured: false
draft: false
tags:
  - overthewire
  - natas
  - web
ogImage: ""
description: Solution for OverTheWire Natas level 6 challenge.
---

## Description

Username: natas6  

URL:      <http://natas6.natas.labs.overthewire.org>

---

## Solution

Solution for the Overthewire.org [Natas level 5 -> Level 6](https://overthewire.org/wargames/natas/natas6.html)

Visit the url `http://natas5.natas.labs.overthewire.org` in the browser and we get a prompt for login.

Use the username `natas6` and the password obtained from the previous challenge.

Once logged in we can see an input box asking for a secret and there is a link to view the source code.

![natas6 home page](@/assets/images/overthewire/natas/natas06_home.png)

Entering the incorrect secret gives us a `wrong secret` message.

![natas6 wrong secret](@/assets/images/overthewire/natas/natas06_wrong_secret.png)

Next let's check the source code link.

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
<script>var wechallinfo = { "level": "natas6", "pass": "<censored>" };</script></head>
<body>
<h1>natas6</h1>
<div id="content">

<?

include "includes/secret.inc";

    if(array_key_exists("submit", $_POST)) {
        if($secret == $_POST['secret']) {
        print "Access granted. The password for natas7 is <censored>";
    } else {
        print "Wrong secret";
    }
    }
?>

<form method=post>
Input secret: <input name=secret><br>
<input type=submit name=submit>
</form>

<div id="viewsource"><a href="index-source.html">View sourcecode</a></div>
</div>
</body>
</html>
```

There is a lot of html code we have seen before in other challenges but in the middle there is a php script that is interesting.

```php
<?
include "includes/secret.inc";

    if(array_key_exists("submit", $_POST)) {
        if($secret == $_POST['secret']) {
        print "Access granted. The password for natas7 is <censored>";
    } else {
        print "Wrong secret";
    }
    }
?>
```

This is the script that checks if the secret we inputted is the correct one.  
It is doing this by comparing our secret to a variable `$secret`.  
The script is also including a file `secret.inc` and we can check what is in that file by following the path.

The url is <http://natas6.natas.labs.overthewire.org/includes/secret.inc>

```php
<?
$secret = "FOEIUWGHFEEUHOFUOIU";
?>
```

The file contained the value of the secret. Entering the secret in the input box will give us the password for natas7.

![natas6 password](@/assets/images/overthewire/natas/natas06_password.png)

The password for natas7 is `7z3hEE**************************`
