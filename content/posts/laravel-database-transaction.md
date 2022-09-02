---
title: "Laravel: Database Transaction"
date: 2022-02-08T21:29:54+07:00
draft: false
tags: ['Laravel', 'PHP', 'DBTransaction', 'Database']
---

---
layout: post
title: Laravel &colon; Database Transaction
---

Database trasaction sangat berguna ketika kita bermain dengan database karena ketika terjadi kesalahan atau error ketika mengeksekusi perintah yang berkaitan dengan database, semua transaksi yang terjadi sebelumnya akan dibatalkan sehingag database tidak akan terganggu atau cacat. Penggunaan pada laravel sangat mudah dengan library yang sudah laravel sediakan jadi kita tidak perlu lagi menulis transaksi secara manual menggunakan SQL.

# Contoh
```php
DB::transaction(function() {
      // database operation goes here
});
```

Selesai!!!