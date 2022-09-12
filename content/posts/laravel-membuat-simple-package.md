---
title: "Laravel: Membuat Simple Package"
date: 2022-09-04T13:27:13+07:00
draft: false
tags: ['Laravel', 'PHP', 'Composer']
summary: "Laravel package memudahkan programmer untuk menambahkan fungsionalitas pada framework laravel."
---

Buat satu folder baru di root projek dengan nama `packages`. Didalam folder packages buat folder dengan nama pembuat package (biasanya username github) misal `aziyan99` dan terakhir buat satu folder baru didalam folder `aziyan99` dengan nama dari package yang ingin dibuat misal: `hello-world`. Sehingga akan tersusun folder

```
my-app/
├─ packages/
│  ├─ aziyan99/
│  │  ├─ hello-world/
```

## Menginisialisai Composer
Pergi ke folder `packages/aziyan99/hello-world` melalui terminal (nama folder tinggal disesuaikan dengan yang dibuat diawal) dan jalan perintah `composer init`.

```
composer init
```

Lengkapi data package melalui prompt terminal.