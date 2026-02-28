+++
title = 'Laravel Vue Starter'
date = 2021-03-27T20:05:32Z
draft = false
tags = ['Project', 'HTML']
FeatureCaption = 'Cover Image for Laravel Vue Starter'
+++

![GitHub Repo stars](https://img.shields.io/github/stars/aziyan99/laravel-vue-starter?style=social) ![GitHub forks](https://img.shields.io/github/forks/aziyan99/laravel-vue-starter?style=social) ![GitHub issues](https://img.shields.io/github/issues/aziyan99/laravel-vue-starter?style=social)

An starter app for laravel and vuejs

<a href="https://github.com/aziyan99/laravel-vue-starter" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 10px 20px; margin-top: 15px; margin-bottom: 25px; background-color: #28a745; color: white; text-align: center; text-decoration: none; border-radius: 5px; font-weight: bold;">
  View Source on GitHub
</a>

---

## README

<p align="center"><a href="javascript:void(0);" target="_blank"><img src="https://i.ibb.co/cX78VgF/laravel-vue-starter.png" width="100"></a></p>

<p align="center">
<img src="https://img.shields.io/github/issues/aziyan99/laravel-vue-starter">
<img src="https://img.shields.io/github/stars/aziyan99/laravel-vue-starter">
</p>


![ss1](https://i.ibb.co/zV5VDVV/laravel-vue-starter.png)



Simple implementation of laravel and vuejs starter with coreui admin template.


copy `.env-example` file and update the database credentials section according to yours.

First install the depedencies using composer and npm
```console
composer install && npm install
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
| superadmin@example.com | password | `super admin` |

ACL or access control level using `laravel/spatie` package


1. Deprecated: Return type of `Illuminate\Container\Container::offsetExists($key)`
   - Run `composer update`
   - Updating php version in `composer.json` [https://stackoverflow.com/questions/70245146/php-deprecated-issue-when-running-artisan-command](https://stackoverflow.com/questions/70245146/php-deprecated-issue-when-running-artisan-command)

