+++
title = 'Moodle Local_Usergenerator'
date = 2022-08-23T09:18:56Z
draft = false
tags = ['Project', 'PHP']
FeatureCaption = 'Cover Image for Moodle Local_Usergenerator'
+++

![GitHub Repo stars](https://img.shields.io/github/stars/aziyan99/moodle-local_usergenerator?style=social) ![GitHub forks](https://img.shields.io/github/forks/aziyan99/moodle-local_usergenerator?style=social) ![GitHub issues](https://img.shields.io/github/issues/aziyan99/moodle-local_usergenerator?style=social)

A project by Raja Azian.

<a href="https://github.com/aziyan99/moodle-local_usergenerator" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 10px 20px; margin-top: 15px; margin-bottom: 25px; background-color: #28a745; color: white; text-align: center; text-decoration: none; border-radius: 5px; font-weight: bold;">
  View Source on GitHub
</a>

---

## README



Moodle local plugin to generate users

## Install

### Installing from zipped Repository file

1. Download this Repo as a zipped file
2. Install from Moodle **Site administration**, plugins menu
3. Refresh Moodle web page, and follow the instructions to install and upgrades the DB

### Installing by clonning Repository

1. Copy clonned plugin directory to Moodle local path: **<moodle_base_dir>/local**
2. Refresh Moodle web page, and follow the instructions to install and upgrades the DB

## Usage

To open the generator form, login as **administrator** and go to Site administration > Plugins > Local plugins > User
Generator. Fill the form information and submit the form.

### Form field description

1. Prefix, used to append prefix to generated username and email (ex: metc will produce metc0000, metc0001, ...)
2. Count, total generated users

Every generated user will have default password `Password@12345`.

