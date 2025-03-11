---
title: OverTheWire Natas Level 9 -> 10
author: Michael McDonagh
pubDatetime: 2025-03-03T22:45:00Z
slug: overthewire-natas-10
featured: false
draft: false
tags:
  - overthewire
  - natas
  - web
ogImage: ""
description: Solution for OverTheWire Natas level 10 challenge.
---

## Description

Username: natas10  

URL: <http://natas10.natas.labs.overthewire.org>

---

## Solution

Solution for the Overthewire.org [Natas level 9 -> Level 10](https://overthewire.org/wargames/natas/natas10.html)

Visit the url `http://natas10.natas.labs.overthewire.org` in the browser and we get a prompt for login.

Use the username `natas10` and the password obtained from the previous challenge.

Once logged in we can see a text box and a search button and a message telling us that there is added security. They are now filtering the input.

![](@assets/images/overthewire/natas/natas10_index.png)

Just like the previous challenge when entering text into the box and clicking search button the app appears to search a file for the text we entered.

![](@assets/images/overthewire/natas/natas10_search_hello.png)

What happens when we try the same method that was used in `natas9` ?  
When we enter '```;cat /etc/natas_webpass/natas10 #```' into the search box we do not get the password, we get the illegal character error message.

![](@assets/images/overthewire/natas/natas10_bad_input.png)

Checking the *View sourcecode* link will show php code used for the search button.

```php
<?
$key = "";

if(array_key_exists("needle", $_REQUEST)) {
    $key = $_REQUEST["needle"];
}

if($key != "") {
    if(preg_match('/[;|&]/',$key)) {
        print "Input contains an illegal character!";
    } else {
        passthru("grep -i $key dictionary.txt");
    }
}
?>
```

The php code takes our input and then makes a check for certain characters. If there is a `;`, `|` or `&` in the input we supply we get a message about illegal input else it uses `passthru` to execute the grep command with the text we entered.  

In the previous challenge we used a `;` to be able to start a new command but this time we get an error message.

Since we cannot use the same cannot use the same command as the `natas9` we will need to manipulate `grep` to search for the file instead.

The standard `grep` command is `grep <TEXT TO LOOK FOR> <PATH TO FILE>`.  
The 'TEXT TO LOOK FOR' does not need to be a specific word but can be a regular expression. This is helpful for us as we do not know password in natas11 password file.  

We want to make grep search for any text in the /etc/natas_webpass/natas11.  

By entering `. /etc/natas_webpass/natas11 #` into the search box we are making grep  

* `.` search for any text
* `/etc/natas_webpass/natas11` file path to search
* `#` comment out 'dictionary.txt' and stop grep from searching it.

![](@assets/images/overthewire/natas/natas10_password.png)

And we get the password.
If we didn't comment out dictionary.txt the entire dictionary would have been printed to the screen.

This technique will also work for the natas9 challenge.
