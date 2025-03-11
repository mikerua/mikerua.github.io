---
title: OverTheWire Natas Level 8 -> 9
author: Michael McDonagh
pubDatetime: 2025-03-03T22:30:00Z
slug: overthewire-natas-9
featured: false
draft: false
tags:
  - overthewire
  - natas
  - web
ogImage: ""
description: Solution for OverTheWire Natas level 9 challenge.
---

## Description

Username: natas9  

URL: <http://natas9.natas.labs.overthewire.org>

---

## Solution

Solution for the Overthewire.org [Natas level 8 -> Level 9](https://overthewire.org/wargames/natas/natas9.html)

Visit the url `http://natas9.natas.labs.overthewire.org` in the browser and we get a prompt for login.

Use the username `natas9` and the password obtained from the previous challenge.

Once logged in we can see a text box and a search button

![](@assets/images/overthewire/natas/natas09_index.png)

When entering text into the box and clicking search button the app appears to search a file for the text we entered.

![](@assets/images/overthewire/natas/natas09_search.png)

Checking the *View sourcecode* link will show php code used for the search button.

```php
<?
    $key = "";

    if(array_key_exists("needle", $_REQUEST)) {
        $key = $_REQUEST["needle"];
    }

    if($key != "") {
        passthru("grep -i $key dictionary.txt");
    }
?>
```

The php code takes our input and uses `passthru` to execute a command.  
The command is using grep to search a file for the text we entered.  

Because the php script is not sanitizing our input before passing it to grep we can use `command injection` to insert our own command and have it be executed.

First we end the grep command by using a `;` and then we can type our own command like `cat` to read the password file. The `#` is to comment out everything after our command otherwise the entire contents of *dictionary.txt* would also be printed to the screen.

```bash
;cat /etc/natas_webpass/natas9 #
```

Entering the command into the search box and clicking on search will give the password.

![](@assets/images/overthewire/natas/natas09_password.png)
