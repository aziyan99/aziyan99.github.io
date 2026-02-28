+++
title = 'Kbbireferences'
date = 2022-06-25T14:36:06Z
draft = false
tags = ['Project', 'PHP']
FeatureCaption = 'Cover Image for Kbbireferences'
+++

![GitHub Repo stars](https://img.shields.io/github/stars/aziyan99/kbbireferences?style=social) ![GitHub forks](https://img.shields.io/github/forks/aziyan99/kbbireferences?style=social) ![GitHub issues](https://img.shields.io/github/issues/aziyan99/kbbireferences?style=social)

Simple mediawiki extension

<a href="https://github.com/aziyan99/kbbireferences" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 10px 20px; margin-top: 15px; margin-bottom: 25px; background-color: #28a745; color: white; text-align: center; text-decoration: none; border-radius: 5px; font-weight: bold;">
  View Source on GitHub
</a>

---

## README

## KBBI References

Mediawiki extension for create anchor tag `a` to references KBBI (Kamus Besar Bahasa Indonesia). Mainly using word definition of KBBI from [https://kbbi.web.id/](https://kbbi.web.id/)

## Installation
1. Download the extension and extract it and then copy-paste the extracted folder at `{wiki-installation-path}/extensions`.
2. Open `LocalSettings.php` and add new code add the bottom
    ```php
    wfLoadExtension( 'KBBIReferences' ); 
    ```

## How to use
In editor using `{#kbbiref the_word | kbbi_link(optional) }`

```text
...

{{#kbbiref: hello | hallo }} 

{{#kbbiref: hello }}

Selamat {{ #kbbiref: siang }}, apa kabar?


Selamat {{ #kbbiref: siang | https://kbbi.web.id/siang}}, apa kabar?

....
```
