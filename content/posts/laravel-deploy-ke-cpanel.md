+++
date = '2025-07-12T10:18:34+07:00'
draft = false
title = 'Laravel: Deploy ke cPanel'
locale = "id_ID"
tags = ['Laravel', 'PHP', 'Deployment', 'cPanel']
+++

Deploy aplikasi Laravel ke VPS memang *keren* dan ngasih kita kontrol penuh, tapi kenyataannya di lapangan kadang kita (atau klien) cuma punya budget buat *shared hosting* dengan cPanel. *No problem!*

Proses *deploy* Laravel ke cPanel sebenarnya *tricky* tapi gampang kalau kita paham konsepnya. Masalah utama di *shared hosting* biasanya adalah struktur direktorinya yang memaksakan `public_html` sebagai *document root*, sementara Laravel menggunakan folder `public`. Belum lagi akses terminal (SSH) yang kadang *kaga ada*.

*So, let's get our hands dirty.*

## Persiapan Lokal (Pre-Flight Check)
Sebelum nge-zip aplikasinya, pastikan dulu beberapa hal ini udah siap di lokal:

1. Jalankan `composer install --optimize-autoloader --no-dev` supaya *vendor* bersih dari *package testing*.
2. Kalau pakai Vite atau Mix, jangan lupa jalankan `npm run build` atau `npm run production` biar asset css dan js terkompilasi sempurna.
3. Hapus folder `node_modules` (kita nggak butuh ini di server).
4. Compress / Zip semua file project (`vendor` ikut di zip ya kalau di cPanel ga ada akses SSH buat jalanin composer).

## Proses Upload
Setelah punya file zip yang siap terbang, buka cPanel dan ikuti ritual ini:

1. Buka **File Manager**.
2. Buat folder baru di **luar** `public_html`, misalnya kita kasih nama `laravel-app`.
3. *Upload* file zip yang tadi dibuat ke dalam folder `laravel-app` dan *Extract*.
4. Pindahkan *semua* file dan folder yang ada di `laravel-app/public` ke dalam folder `public_html` (atau folder *addon domain* kalau pakai domain lain).

## Modifikasi `index.php`
Karna kita mindahin isi `public`, sekarang `index.php` yang ada di `public_html` jadi bingung nyari *vendor* dan *bootstrap* punya si Laravel. Kita harus kasih tau dia *path* terbarunya.

Buka / Edit file `index.php` yang sekarang udah nongkrong di `public_html`, lalu sesuaikan *path*-nya:

```php
// Biasanya di line 14, ubah jadi:
require __DIR__.'/../laravel-app/vendor/autoload.php';

// Biasanya di line 18, ubah jadi:
$app = require_once __DIR__.'/../laravel-app/bootstrap/app.php';
```

*(Sesuaikan *path* `../laravel-app/` dengan nama folder yang dibuat di langkah 2 ya)*

## Environment & Database
Selanjutnya jangan lupa soal *database* dan penyesuaian `.env`:

1. Bikin database baru via **MySQL® Databases** di cPanel dan *assign* usernya (beserta privilege-nya).
2. Edit file `.env` di dalam folder `laravel-app`.
3. Ubah beberapa konfigurasi penting jadi kaya gini:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://nama-domain.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nama_db_cpanel
DB_USERNAME=user_db_cpanel
DB_PASSWORD=password_db_cpanel
```

4. *Import* file SQL database lokal ke phpMyAdmin di cPanel.

## EF_E_KYU(?)

### Storage Link gimana min? Kan kaga ada SSH?
Tenang, kita bisa *ngakalin* *command* *symlink*nya *programmatically* via *route*, sama kayak yang sempet kelinggung dikit di postingan [sebelumnya](/posts/laravel-upload-file/). Bikin *route* sementara di `routes/web.php`:

```php
// routes/web.php

Route::get('/storage-link', function() {
    \Illuminate\Support\Facades\Artisan::call('storage:link');
    return 'Storage link sukses gan';
});
```

Akses url `nama-domain.com/storage-link`, kalau muncul tulisan balasan sukses, *voila!* Storage udah nge-link. Jangan lupa hapus lagi *route* nya.

### Kok pas diakses malah Error 500?
Coba liat log *error* di `laravel-app/storage/logs/laravel.log`. Biasanya ini gara-gara versi PHP di cPanel terlalu jadul buat spesifikasi versi Laravel yang dipakai. Coba atur via menu **Select PHP Version** di cPanel dan cocokin versinya.

*Happy Deploying!*

## Referensi
1. [Docs deployment manual laravel](https://laravel.com/docs/master/deployment)
