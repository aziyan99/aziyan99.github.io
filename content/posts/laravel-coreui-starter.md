+++
title = 'Laravel Coreui Starter'
date = 2022-04-21T19:03:51Z
draft = false
tags = ['Project', 'JavaScript']
FeatureCaption = 'Cover Image for Laravel Coreui Starter'
+++

![GitHub Repo stars](https://img.shields.io/github/stars/aziyan99/laravel-coreui-starter?style=social) ![GitHub forks](https://img.shields.io/github/forks/aziyan99/laravel-coreui-starter?style=social) ![GitHub issues](https://img.shields.io/github/issues/aziyan99/laravel-coreui-starter?style=social)

Simple laravel starter with coreui template

<a href="https://github.com/aziyan99/laravel-coreui-starter" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 10px 20px; margin-top: 15px; margin-bottom: 25px; background-color: #28a745; color: white; text-align: center; text-decoration: none; border-radius: 5px; font-weight: bold;">
  View Source on GitHub
</a>

---

## README

<p align="center"><a href="javascript:void(0);" target="_blank"><img src="https://i.ibb.co/qBHySrq/laravel-coreui-logo.png" width="100"></a></p>

<hr>

![ss1](https://i.ibb.co/JrrtgsJ/laravel-coreui.png)



Simple admin dashboard starter with laravel and coreui


copy `.env-example` file and update the database credentials section according to yours.

First install the depedencies using composer and npm
```console
composer install
```
next, generate the key
```console
php artisan key:generate
```
next, running the migration and seeder
```console
php artisan migrate:fresh --seed
```
last make a storage link
```console
php artisan storage:link
```
optionally, refresh cache
```console
php artisan cache:clear
```


|Email|Password|Role|
| ------ | ------ | ------ |
| admin@example.test | admin@example.test | `admin` |

ACL or access control level using is custom made by using `Gate`.


1. Deprecated: Return type of `Illuminate\Container\Container::offsetExists($key)`
   - Run `composer update`
   - Updating php version in `composer.json` [https://stackoverflow.com/questions/70245146/php-deprecated-issue-when-running-artisan-command](https://stackoverflow.com/questions/70245146/php-deprecated-issue-when-running-artisan-command)

