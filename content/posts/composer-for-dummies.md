---
title: "Composer Untuk Awam (Undone)"
date: 2022-02-20T21:29:54+07:00
draft: false
tags: ['Composer', 'PHP']
---

Don't Repeat Yourself (DRY) adalah salah satu principle dalam software engineering untuk menghindari pengulangan penulisan koding yang sama dalam satu software pattern dengan menggantikannya kode yang berulang menjadi satu abstract class atau dengan data normalization. Walaupun demikian DRY sendiri jika diartikan dalam artian yang luas, bisa dipahami sebagai untuk tidak menulis mengulangi pembuatan suatu kode untuk suatu fungsionalitas dimana kode untuk satu fungsionalitas tadi sudah pernah dibuat oleh orang lain.

Sebagian programmer adalah orang yang malas, akibatnya dari pada menulis kode yang sama secara berulang untuk satu fungsionalitas yang sama mereka membuat library-libray dan package-package untuk menjalankan satu fungsionalitas tadi sehingga ketika ingin membuat sebuah fungsionalitas yang sama kembali mereka tidak perlu menulis ulang koding yang sama tetapi mereka cukup menggunakan libraries atau packages yang sudah dibuat sebelumnya.

# Apa itu Composer?
Composer adalah sebuah alat (_tools_) untuk mengatur **depedency** pada bahasa pemrograman PHP. Dengan composer kita bisa mendeklarasikan library apa saja yang projek kita butuhkan, lalu composer akan mengaturnya, baik untuk meng-install, meng-update, atau menghapus library-library yang sudah kita deklarasikan. Perlu diingat composer bukan manajemen paket (package manager) seperti **Yup** ataupun **Apt** pada sistem operasi berbasis UNIX. Memang benar composer digunakan untuk memanajemen library-library tetapi ruang lingkup composer hanya terbatas pada projek saja dalam satu folder (*vendor*) bukan untuk keseluruhan sistem operasi.

Untuk bisa menggunakan composer setidaknya kita membutuhkan PHP versi 5.3.2 keatas sehingga jika PHP yang digunakan versi 3.3.2 kebawah kita tidak bisa menggunakan composer untuk memanajemen libray-libray PHP pada projek kita. Composer juga akan memberitahukan ketika ada library-library yang tidak kompatibel dengan projek kita. Pada akhirnya dengan menggunakan composer kita tidak perlu lagi menginstall library yang dibutuhkan langsung dari source code langsung (zip), kita cukup mendeklarasikan library apa yang dibutuhkan kemudian composer akan meng-installnya. Konsekuensi dengan tidak meng-install library dari source code adalah kita akan membutuhkan version control system (VCS) seperti Git, SVN, Fossil, ataupun Hg tergantung bagaimana library yang kita butuhkan menggunakan (VCS) yang mana (walaupun sekarang sebagian besar paket dan library PHP menggunakan Git sebagai VCS-nya).

# Menginstall Composer
Cara terbaik untuk menginstall composer adalah dengan mengikuti petunjuk penginstalasi composer dari website official composer di [getcomposer.org](https://getcomposer.org/doc/00-intro.md). Terdapat dua opsi penginstalan composer opsi untuk menginstall secara lokal (project bases) atau secara global, sangat direkomendasikan untuk menginstall composer secara global.
> Perlu dicatat, sebelum menginstall composer pastikan sudah mengintal PHP karena untuk menjalankan composer membutuhkan interpreter dari bahasa pemrograman PHP.

## Sitem Operasi Keluarga *NIX
Menginstall composer pada keluarga sistem operasi bisa melalui executeable file dari [installer composer](https://getcomposer.org/installer) atau kita bisa mengotomisasi penginstallan dengan:
```sh
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === '906a84df04cea2aa72f40b5f787e49f22d4c2f19492ac310e8cba5b96ac8b64115ac402c8cd292b8a03482574915d1a8') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
```

Perintah diatas akan mendownloadkan sebuah file baru dengan nama `composer.phar` dan membuat composer bisa kita gunakan secara lokal (satu projek). PHAR (PHP archive) sendiri adalah binary file kompress dari kodingan PHP yang bisa kita jalankan lewat terminal.

Untuk menjalan composer kita bisa menggunakan perintah:
```sh
php composer.phar <command>
```

Langkah terbaik adalah memindahkan composer kedalam `PATH` dari sistem operasi kita sehingga kita tidak perlu mendownload composer lagi ketika memulai projek baru (install secara global).
```sh
sudo mv composer.phar /usr/local/bin/composer
```

## Sistem Operasi Windows
Pada sistem operasi windows penginstallan composer diawali dengan mendownload [installer](https://getcomposer.org/Composer-Setup.exe) composer untuk sistem operasi window. Kemudian menjalankan installernya.
> Perlu dicatat, sebelum menginstall composer pastikan sudah mengintal PHP karena untuk menjalankan composer membutuhkan interpreter dari bahasa pemrograman PHP.

> Silahkan daftarkan composer kedalam path pada sistem operasi windows melalui environment variables kemudian pilih system variables


Jika proses penginstalasi compser berhasil maka ketika kita menjalan perintah:
```sh
composer
```
pada terminal, kita akan mendapatkan output yang lebih kurang seperi ini:
```sh
Output
______
/ ____/___ ____ ___ ____ ____ ________ _____
/ / / __ \/ __ `__ \/ __ \/ __ \/ ___/ _ \/ ___/
/ /___/ /_/ / / / / / / /_/ / /_/ (__ ) __/ /
\____/\____/_/ /_/ /_/ .___/\____/____/\___/_/
/_/
Composer version 1.0-dev (9859859f1082d94e546aa75746867df127aa0d9e) 2015-08-17 14:57:00
Usage:
command [options] [arguments]
Options:
--help (-h) Display this help message
--quiet (-q) Do not output any message
--verbose (-v|vv|vvv) Increase the verbosity of messages: 1 for normal output, 2 for more
verbose output and 3 for debug
--version (-V) Display this application version
--ansi Force ANSI output
--no-ansi Disable ANSI output
--no-interaction (-n) Do not ask any interactive question
--profile Display timing and memory usage information
--working-dir (-d) If specified, use the given directory as working directory.
....
```

# Autoloading Dengan Composer
Untuk library yang sudah menggunakan `autoloading`, composer akan meng-generate file `autoload.php` yang ada pada `vendor/autoload.php`. Sehingga untuk menggunakan library yang sudah diinstall kita cukup me-load library-nya dengan:
```php
require_once __DIR__ . '/vendor/autoload.php';
```
> require_once digunakan karena secara proses require_once akan mengecek apakah file sudah diload sebelumnya, jika sudah maka tidak perlu diload lagi, jika belum maka proses load file akan dilakukan.

Hal ini sangat memudahkan programmer untuk menggunakan library yang sudah diinstall. Sebagai contoh jika projek kita menggunakan library `Monolog` kita bisa langsung menggunakannya seperti:
```php
$log = new Monolog\Logger('name');
$log->pushHandler(new Monolog\Handler\StreamHandler('app.log', Monolog\Logger::WARNING));
$log->addWarning('Foo');
```
Kita juga bisa menambahkan kode kita kedalam `autoloading`-nya composer dengan menambahkan attribut kedalam file `composer.json`:
```json
{
    "autoload": {
        "psr-4": {"MyCode\\": "src/"}
    }
}
```
> psr-4 merupakan bagian dari PHP Standard Recommendation (PSR) bagian 4 yang mengatur tentang autoloading

# Perintah Composer yang Sering Digunakan
Sebelum jauh membahas tentang perintah-perintah composer yang sering digunakan sebaiknya kita kenalan dulu dengan file `composer.json`. Pada umumnya file `composer.json` yang digenerate oleh composer akan terlihat seperti:
```json
{
    "name": "laravel/laravel",
    "type": "project",
    "description": "The Laravel Framework.",
    "keywords": ["framework", "laravel"],
    "license": "MIT",
    "require": {
        "php": "^8.0.2",
        "guzzlehttp/guzzle": "^7.2",
        "laravel/framework": "^9.2",
        "laravel/sanctum": "^2.14.1",
        "laravel/tinker": "^2.7"
    },
    "require-dev": {
        "fakerphp/faker": "^1.9.1",
        "laravel/sail": "^1.0.1",
        "mockery/mockery": "^1.4.4",
        "nunomaduro/collision": "^6.1",
        "phpunit/phpunit": "^9.5.10",
        "spatie/laravel-ignition": "^1.0"
    },
    "autoload": {
        "psr-4": {
            "App\\": "app/",
            "Database\\Factories\\": "database/factories/",
            "Database\\Seeders\\": "database/seeders/"
        }
    },
    "autoload-dev": {
        "psr-4": {
            "Tests\\": "tests/"
        }
    },
    "scripts": {
        "post-autoload-dump": [
            "Illuminate\\Foundation\\ComposerScripts::postAutoloadDump",
            "@php artisan package:discover --ansi"
        ],
        "post-update-cmd": [
            "@php artisan vendor:publish --tag=laravel-assets --ansi --force"
        ],
        "post-root-package-install": [
            "@php -r \"file_exists('.env') || copy('.env.example', '.env');\""
        ],
        "post-create-project-cmd": [
            "@php artisan key:generate --ansi"
        ]
    },
    "extra": {
        "laravel": {
            "dont-discover": []
        }
    },
    "config": {
        "optimize-autoloader": true,
        "preferred-install": "dist",
        "sort-packages": true
    },
    "minimum-stability": "dev",
    "prefer-stable": true
}
```
File `composer.json` diatas adalah contoh dari file [composer](https://github.com/laravel/laravel/blob/9.x/composer.json) pada projek [Laravel](https://laravel.com/) versi 9.x.

Bagian-bagian pada file `composer.json` terbagi menjadi 3 kategori besar: deskripsi projek, dependencies, dan konfigurasi.

Bagian **deskripsi** merupakan bagian yang berisi informasi dari projek yang sedang dikerjakan bagian ini berisi informasi seperti: nama projek, tipe projek, keterangan, keywords, dan lisensi yang digunakan.

Bagian **depedencies** merupakan bagian yang digunakan untuk mendeklarasikan libraries atau packages yang digunakan. Bagian ini termasuk: `require` dan `require-dev`. `require` dan `require-dev` sama-sama berperan sebagai tempat pendeklarasian libraries atau packages yang digunakan yang nantinya akan composer install, yang menjadi perbedaan adalah segala libraries atau packages yang dideklarasikan pada `require-dev` hanya akan digunakan pada proses development saja sehingga ketika projek memasuki area production packages atau libraries yang dideklarasikan di `require-dev` tidak akan diinstall oleh composer. Sebaliknya packages atau libraries yang didekalarasikan pada `require` akan diinstall oleh composer baik untuk proses development ataupun production.
> Perbedaan area menjalankan koding umumnya terbagi menjadi 3: development, staging, dan production. Untuk membuat composer mengetahui koding yang dibuat akan dijalankan pada area yang mana, biasanya dibuat sebuah environment variabel yang berisi status area yang digunakan saat ini.

Bagian **konfigurasi** biasanya berisi konfigurasi serta keterangan bagaimana composer harus men-treat projek kita. Bagian ini dimulai dari `autoload` sampai dengan `prefer-stable`. Bagian `autoload` dan `autoload-dev` merupakan bagian yang akan menginformasikan kepada composer untuk meng-autoloading sebuah file PHP ke PHP autoload.
> Penjelasan lebih detail tentang keterangan dan kegunaan masing-masing bagian pada file composer.json bisa dilihat pada [The composer.json Schema](https://getcomposer.org/doc/04-schema.md)

## Init
Perintah `composer init` adalah perintah untuk menginisialisasi projek composer dalam satu folder.
```sh
cd path/to/composer-project
```

```sh
composer init
```

Perintah ini akan menampilkan prompt yang harus dilengkapi seperti nama project, author, keywords, dan lain-lain. Silahkan lengkapi sesuai kebutuhan.

```sh

                                            
  Welcome to the Composer config generator  
                                            


This command will guide you through creating your composer.json config.

Package name (<vendor>/<name>) [budiganteng/composer-pemula]:

... 
```
Perintah `composer init` akan membuat satu file baru dengan nama `composer.json`. File `composer.json` ini berisi informasi dari projek kita, mulai dari nama projek hingga depedencies yang digunakan.

## Require
Perintah `composer require` merupakan perintah yang digunakan untuk menginstall satu atau lebih library. Seperti contoh ketika mau menginstall library `Guzzle`:
```sh
composer require guzzlehttp/guzzle
```
perintah ini akan menambahkan attribut baru dalam file `composer.json` pada bagian `require`.
```json
{
     "require": {
        "guzzlehttp/guzzle": "^7.4"
    }
}
```