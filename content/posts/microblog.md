+++
title = 'Microblog'
date = 2021-04-20T14:48:36Z
draft = false
tags = ['Project', 'PHP']
FeatureCaption = 'Cover Image for Microblog'
+++

![GitHub Repo stars](https://img.shields.io/github/stars/aziyan99/microblog?style=social) ![GitHub forks](https://img.shields.io/github/forks/aziyan99/microblog?style=social) ![GitHub issues](https://img.shields.io/github/issues/aziyan99/microblog?style=social)

an ordinary blog

<a href="https://github.com/aziyan99/microblog" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 10px 20px; margin-top: 15px; margin-bottom: 25px; background-color: #28a745; color: white; text-align: center; text-decoration: none; border-radius: 5px; font-weight: bold;">
  View Source on GitHub
</a>

---

## README

*Revision History*
| Date | Version |
| :- | :- |
| April 16, 2021 | V1.0.0 |

## Introduction
Microblog is a minimalist content management system,including categories management, posts management, messages, and users management, other than that microblog also have seo-friendly URL by using slug. Microblog was built with laravel framework and livewire library using full page component. For the database, microblog using MySQL DBMS. List of current available features in microblog:
1. Categories management
2. Posts management
3. Messaging
4. Users management
5. Update general information of microblog
6. User profile update
5. Export excel of categories, posts, and users
## Requirements
Before install microblog, make sure your server have all of this requirements, for details view feel free to open and see `composer.json` file in the root of microblog directory. Basically microblog require all the depedencies to running laravel app, you can check for the requirement at the official laravel documentation.
```json
"require": {
        "php": "^7.3|^8.0",
        "fideloper/proxy": "^4.4",
        "fruitcake/laravel-cors": "^2.0",
        "guzzlehttp/guzzle": "^7.0.1",
        "laravel/framework": "^8.12",
        "laravel/tinker": "^2.5",
        "livewire/livewire": "^2.4",
        "maatwebsite/excel": "^3.1"
},
"require-dev": {
        "barryvdh/laravel-debugbar": "^3.5",
        "barryvdh/laravel-ide-helper": "^2.9",
        "facade/ignition": "^2.5",
        "fakerphp/faker": "^1.9.1",
        "laravel/sail": "^1.0.1",
        "mockery/mockery": "^1.4.2",
        "nunomaduro/collision": "^5.0",
        "phpunit/phpunit": "^9.3.3"
},
```
## Installations
**Before start the installtion make sure all depedencies has statisfied in your server or local development both of microblog requirements and laravel requirements**. Please check laravel [documentation](https://laravel.com/docs/8.x/deployment#server-requirements) for details also you need `PHPOffice PHPExcel >= 1.8.0`. 

Open your phpmyadmin or other database management application and create new database with the name is `microblog`, or you can using MySQL command line by typing:
```bash
CREATE DATABASE microblog;
```
Navigate to the root directory of microblog using terminal or command prompt in windows operating system by typing:
```bash
cd microblog
```
Install all depedencies using command `composer install`.
```bash
composer install
```
Setup and update `.env` file with your credentials. If the `.env` file doesn't exist, you can copied from `.env.example` file. After that change the value for key `DB_HOST=<your-database-host>`, `DB_PORT=<your-database-port>`, `DB_DATABASE=<your-database-name/microblog>`, `DB_USERNAME=<your-database-username>`, `DB_PASSWORD=<your-database-password>`. After that generate new `APP_KEY=` by command:
```bash
php artisan key:generate
```
Make a symlink to the storage
```bash
php artisan storage:link
```
Clearning cache and generate a new one
```bash
php artisan view:clear
```
```bash
php artisan route:clear
```
```bash
php artisan view:cache
```
```bash
php artisan route:cache
```
Running migration and seeder for initiating data.
```bash
php artisan migrate:fresh --seed
```
If you'r using laravel valet, now you can visit the site opening in browser at `http://microblog.test`, or you can builtin laravel server by using commang `php artisan server` and visit the site at `http://localhost:8000`.
```bash
php artisan serve
```
For login to the administrator site you can open the site at:
```bash
http://microblog.test/auth/login
```
or
```bash
http://localhost:8000/auth/login
```
Default credentials for login is:
```bash
Admin:
    - email: admin@example.com
    - password: password
Writer:
    - email: writer@example.com
    - password: password
```
**For deployment option please refer to laravel documentation about configuration either in `.env` file or not**
## Role and Permission
Microblog have only two role, `admin` and `writer`. Role `admin` has all access to site and resources while `writer` has only access to manage his posts and view other users posts, view list of categories data, messaging to other, and update his profile.
| Permission | admin | writer |
|:--- |:---: | :---: |
| View dashboard page | <input type="checkbox" checked/> | <input type="checkbox" checked/> |
| View all categories | <input type="checkbox" checked/> | <input type="checkbox" checked/> |
| Create new category | <input type="checkbox" checked/> | <input type="checkbox"/> |
| Edit category | <input type="checkbox" checked/> | <input type="checkbox"/> |
| Delete category | <input type="checkbox" checked/> | <input type="checkbox"/> |
| Export category to excel | <input type="checkbox" checked/> | <input type="checkbox" checked/> |
| View all post | <input type="checkbox" checked/> | <input type="checkbox" checked/> |
| Create new post | <input type="checkbox" checked/> | <input type="checkbox" checked/> |
| Edit post (owned post) | <input type="checkbox" checked/> | <input type="checkbox" checked/> |
| Delete post  (owned post) | <input type="checkbox" checked/> | <input type="checkbox" checked/> |
| Export posts to excel | <input type="checkbox" checked/> | <input type="checkbox" checked/> |
| Edit other users posts | <input type="checkbox" checked/> | <input type="checkbox"/> |
| Delete other users posts | <input type="checkbox" checked/> | <input type="checkbox"/> |
| Compose and read a message to other users | <input type="checkbox" checked/> | <input type="checkbox" checked/> |
| Delete all messages | <input type="checkbox" checked/> | <input type="checkbox"/> |
| Update Profile | <input type="checkbox" checked/> | <input type="checkbox" checked/> |
| View all categories | <input type="checkbox" checked/> | <input type="checkbox" checked/> |
| Create new user | <input type="checkbox" checked/> | <input type="checkbox"/> |
| Edit user | <input type="checkbox" checked/> | <input type="checkbox"/> |
| Delete user | <input type="checkbox" checked/> | <input type="checkbox"/> |
| Export user to excel | <input type="checkbox" checked/> | <input type="checkbox"/> |
| View and update setting | <input type="checkbox" checked/> | <input type="checkbox"/> |

For the role and permission logical and management, microblog using builtin laravel feature named **Gate** and **Policies**, feel free to check official laravel documentation about both of **Gate** and **Policies**.

## Usefull Links
- [https://laravel.com/docs/8.x/deployment#server-requirements](https://laravel.com/docs/8.x/deployment#server-requirements)
- [https://docs.laravel-excel.com/2.1/getting-started/requirements.html](https://docs.laravel-excel.com/2.1/getting-started/requirements.html)

## Contacts
|Email| `kadangsukakoding@gmail.com`|
| :- | :- | 
| Telegram | `@kadangsukakoding` |

