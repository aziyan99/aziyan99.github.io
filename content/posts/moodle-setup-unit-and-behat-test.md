---
title: "Setup Unit Test dan Behat (Acceptance) Test Pada Moodle"
date: 2023-03-24T21:28:52+07:00
draft: false
tags:
  [
    "Moodle",
    "PHPUnit",
    "Unit Test",
    "Behat",
    "Acceptance Test",
    "PHP",
    "Software Testing",
  ]
---

### 1. Kondisi Awal

1. Moodle sudah terinstall dan berkerja seharusnya
2. Sudah menjalankan `composer install` untuk menginstall depedencies php dari moodlenya
3. Os terbaru yang [support dan sudah terinstall moodle](https://moodledev.io/general/releases)
4. Browser terbaru (Rekomendasi: Chrome atau Firefox)
5. WebDriver dari browser yang digunakan (Firefox: geckodriver, Chrome: chromedriver)
6. Selenium terbaru (Optional, but recommended)
7. Java Runtime Environment (JRE) terbaru (Required if using Selenium)
8. Meng-clone repository [git clone https://github.com/andrewnicols/moodle-browser-config](git clone https://github.com/andrewnicols/moodle-browser-config) pada folder yang bisa diakses oleh moodle (Jika menggunakan OS berbasis UNIX, _directory permission_)

> 3 sampai 7 kebutuhan untuk menjalankan Acceptance (Behat) Test

### 2a. Pengaturan `config.php` Untuk Unit Test

1. Buat sebuah folder baru untuk menyimpan moodledata untuk instance PHPUnit dengan akses sama dengan folder moodledata pada umumnya (misal: `phpu_moodledata`).
2. Buka file `config.php` pada root folder moodle (bukan folder moodledata)
3. Tambahkan kode konfigurasi untuk PHPUnit sebelum baris kode `require_once(__DIR__ . '/lib/setup.php');` :

```
$CFG->phpunit_prefix = 'phpu_';
$CFG->phpunit_dataroot = '<lokasi-folder>/phpu_moodledata';
```

4. Kemudian jalankan perintah `php <lokasi-moodle>\admin\tool\phpunit\cli\init.php` melalui terminal (pastikan versi php yang digunakan sama dengan versi php yang digunakan untuk men-serve moodle). Perintah ini harus dijalankan ketika ada perubahan pada konfigurasi PHPUnit pada file `config.php`. Setelah perintah dijalankan moodle akan menginisialisasi instance PHPUnit (proses ini termasuk dengan membuat tabel-tabel baru pada database dengan prefix `phpu_`). Kita juga bisa membuat moodle menggunakan database yang berbeda untuk instance PHPUnit-nya dengan menambahkan konfigurasi database untuk PHPUnit:

```
$CFG->phpunit_dbtype    = 'pgsql';      // 'pgsql', 'mariadb', 'mysqli', 'mssql', 'sqlsrv' or 'oci'
$CFG->phpunit_dblibrary = 'native';     // 'native' only at the moment
$CFG->phpunit_dbhost    = '127.0.0.1';  // eg 'localhost' or 'db.isp.com' or IP
$CFG->phpunit_dbname    = 'mytestdb';     // database name, eg moodle
$CFG->phpunit_dbuser    = 'postgres';   // your database username
$CFG->phpunit_dbpass    = 'some_password';   // your database password
```

### 3a. Mejalankan Unit Test (PHPUnit)

1. Untuk menjalankan test jalankan perintah `vendor/bin/phpunit`.
2. (Opsional) Untuk menjalankan satu test spesifik pada plugin bisa dilakukan dengan perintah

```
// Menjalankan semua testcase pada satu class test
vendor/bin/phpunit <lokasi-plugin>/tests/filename.php
```

```
// Menjalankan satu testcase pada satu class test
vendor/bin/phpunit --filter <testcase> <lokasi-plugin>/tests/filename.php
```

### 2b. Pengaturan `config.php` Untuk Acceptance Test (Behat Test)

1. Buat sebuah folder baru untuk menyimpan moodledata untuk instance Behat dengan akses sama dengan folder moodledata pada umumnya (misal: `beh_moodledata`).
2. Buka file `config.php` pada root folder moodle (bukan folder moodledata)
3. Tambahkan kode konfigurasi untuk PHPUnit sebelum baris kode `require_once(__DIR__ . '/lib/setup.php');` :

```

...

$CFG->behat_dataroot = '<lokasi-folder>/beh_moodledata';
$CFG->behat_wwwroot = 'http://behatlocal.moodle.com';
$CFG->behat_prefix = 'beh_';
$CFG->behat_increasetimeout = 20; // (opsional) untuk pc 'low specs'
require_once('/path/to/moodle-browser-config/init.php'); // repository yang di-clone pada baian 1 tahap ke-8

...

```

> You will need to set the `behat_wwwroot` to your Moodle site, but it must use a different value to your `$CFG->wwwroot`. One common way to do this is to use `127.0.0.1` for behat, but localhost for standard use. Alternatively you can add an additional hostname in your `/etc/hosts` file and use this instead. If you use Docker, then you may be able to use `host.docker.internal` where your site is hosted on the docker host

4. Kemudian jalankan perintah `php <lokasi-moodle>\admin\tool\behat\cli\init.php` melalui terminal (pastikan versi php yang digunakan sama dengan versi php yang digunakan untuk men-serve moodle). Perintah ini harus dijalankan ketika ada perubahan pada konfigurasi `Behat` pada file `config.php`. Setelah perintah dijalankan moodle akan menginisialisasi instance Behat (proses ini termasuk dengan membuat tabel-tabel baru pada database dengan prefix `beh_`). Perintah ini ketika selesai akan memberikan perintah yang akan kita gunakan untuk menjalankan `Behat` test.

### 3b. Mejalankan Acceptance Test (Behat)

1. Pastikan perintah yang dijalankan pada bagian **2b** tahap ke-4 berhasil dan mengembalikan perintah yang lebih kurang :

```
vendor/bin/behat --config <lokasi-folder>/beh_moodledata/behatrun/behat/behat.yml
```

2. Jalankan perintah yang diberikan pada bagian **3b** tahap ke-1 untuk menjalankan acceptance (behat) test
3. (Opsional) Untuk menjalankan satu test spesifik pada plugin bisa dilakukan dengan perintah

```
// Menjalankan semua testcase yang punya tags @local_myplugin
vendor/bin/behat --config <lokasi-folder>/beh_moodledata/behatrun/behat/behat.yml --tags=@local_myplugin
```

### Referensi

1. [https://moodledev.io/general/development/tools/phpunit](https://moodledev.io/general/development/tools/phpunit)
2. [https://moodledev.io/general/development/tools/behat/running](https://moodledev.io/general/development/tools/behat/running)
3. [https://docs.moodle.org/dev/PHPUnit_integration](https://docs.moodle.org/dev/PHPUnit_integration)
4. [https://docs.moodle.org/dev/Writing_PHPUnit_tests](https://docs.moodle.org/dev/Writing_PHPUnit_tests)
5. [https://moodledev.io/general/development/tools/behat/writing](https://moodledev.io/general/development/tools/behat/writing)
6. [https://moodledev.io/general/development/tools/behat](https://moodledev.io/general/development/tools/behat)
7. [https://docs.moodle.org/dev/Acceptance_testing](https://docs.moodle.org/dev/Acceptance_testing)
