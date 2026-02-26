+++
date = '2025-07-12T10:18:16+07:00'
draft = false
title = 'Laravel: Deploy ke Shared Hosting Biasa (Non-cPanel)'
locale = "id_ID"
tags = ['Laravel', 'PHP', 'Deployment', 'Shared Hosting']
+++

Bicara soal *deploy* Laravel ke *Shared Hosting* itu hampir selalu identik dengan **cPanel**. Tapi nyatanya, nggak semua penyedia *hosting* pakai cPanel. Ada yang pakai DirectAdmin, Plesk, atau bahkan panel kustom buatan mereka sendiri.

Nah, gimana ceritanya kalau kita ketemu panel *random* yang konfigurasinya serba dikunci? *Core concept* penyelesaian dari teka-teki ini sebenarnya simpel: **pisahin *logic* Laravel dari dokumen web publik (document root).**

Cara deploy ini sifatnya lebih "Brute Force" daripada [cara modifikasi `index.php` ala cPanel](/posts/laravel-deploy-ke-cpanel/), tapi sangat efektif. *Here we go!*

## Konsep Memisahkan Folder

Pada *setup* normalnya Laravel, struktur direktori terlihat kek gini:
```text
/laravel-app
  ├── app
  ├── bootstrap
  ├── ...
  └── public (<- Document Root Server)
```

Di *Shared Hosting* generik, kita nggak bisa leluasa merubah yang mana *document root* utama kita. Bisa itu terkurung secara absolut di `public_html/`, `htdocs/`, atau `www/`.

Jadi, kita harus misahin folder `public` bawaan Laravel untuk jadi isi si penampung file publik dari pihak hosting, dan naro jerohan aplikasinya di luar folder publik itu biar nggak gampang ditembus orang iseng.

## 1. Persiapan Lokal
Kayak *deploy* pada umumnya, selalu persiapkan zip file dari sisi lokal.

1. Buka terminal di komputer lokal, jalankan `npm run build` dan `composer install --optimize-autoloader --no-dev`.
2. Hapus folder `node_modules` (!).
3. Jadikan semua file aplikasi Laravel ke dalam format `.zip`.

## 2. Unggah & Eksekusi di Hosting

Anggaplah nama folder utamanya di *Shared Hosting* adalah `public_html` (folder publik ya).

1. Buka **File Manager** punya si *Shared Hosting* (Apapun bentuk *UI*-nya niscaya mirip-mirip).
2. Buat folder baru tapi satu tingkat **DI LUAR** `public_html` atau selevel dengannya. Misalkan kita kasih nama tipikal `core-laravel`.
3. Upload `.zip` tadi ke dalam sana dan *Extract*.

*Sampai tahapan ini aplikasinya udah ke *deploy*. Sekarang mari pasangkan organ* `public` *ke* `public_html`*.

4. Masuk ke folder `core-laravel/public`.
5. *Select All* filenya (ada `index.php`, `robots.txt`, set CSS/JS), dan *Move* (pindahkan) KE DALAM folder `public_html`.

Kalau diilustrasikan sekarang kaya gini:
```text
/ (root file manager / FTP)
  ├── core-laravel/  (<< File project laravel kita, minus public)
  └── public_html/   (<< File bawaan public udah ada di sini, web bisa ngebaca ini)
```

## 3. Nge-Hack Paths di `index.php`

Posisi sekarang `public_html/index.php` udah terpisah dari jerohannya di `core-laravel`. Kita cukup perlu ubah *path* direksinya.

Edit file `public_html/index.php` milik kalian:

```php
// Cari Line ini (sekitar baris 34)
require __DIR__.'/../vendor/autoload.php';

// Ubah menjadi nembak keluar folder public_html terus masuk ke folder core-laravel
require __DIR__.'/../core-laravel/vendor/autoload.php';
```

```php
// Cari lagi Line ini (sekitar baris 47)
$app = require_once __DIR__.'/../bootstrap/app.php';

// Ubah lagi kayak gini
$app = require_once __DIR__.'/../core-laravel/bootstrap/app.php';
```

## 4. Setup .env

Langkah standarnya pun berlaku di sini:
1. Buat *database* di panel bawaan *hosting* dan set parameternya.
2. Edit file `core-laravel/.env`.
3. Masukin kredensial database SQL.
4. *Import* `.sql` dari *local* ke phpMyAdmin/db editor bawaannya *hosting*.

Selesai deh! Ini cara yang beneran aman (*bulletproof*) buat nge-*deploy* di panel per-hosting-an mana pun tanpa *takut* *source code* sensitif kebocor (karena jerohan aplikasinya ada di luar *Document Root* publik).

## EF_E_KYU(?)

### Gan, symlink storage di Shared Hosting random gini gimana? Nggak ada SSH?
Karena konsepnya dipisahin paksa kayak gini, *symlink storage* `php artisan storage:link` bawaan Laravel kadang nggak *works* biarpun udah dipanggil via *Route* karena letak fisik folder `pubic/storage` nya berbeda jauh dari ekspektasi sistemnya Laravel.

Solusi alternatif, modifikasi aja *filesystem* Laravel.
Buka konfigurasi disk di `config/filesystems.php`, lalu sesuaikan bagian `public`:

```php
'disks' => [
    // ...
    'public' => [
        'driver' => 'local',
        // Ganti pathnya tembak balik ke public_html
        'root' => base_path('../public_html/storage'),
        // 'root' => storage_path('app/public'), <- Aslinya ditenangkan
        'url' => env('APP_URL').'/storage',
        'visibility' => 'public',
        'throw' => false,
    ],
    // ...
]
```

Lalu silakan *create* manual folder `storage` di dalem `public_html`. Beres! Semua file publik masuk ke ruang yang tepat.

*Anyway, keep learning, keep hacking!*
