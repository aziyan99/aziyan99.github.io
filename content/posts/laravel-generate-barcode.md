---
title: "Laravel: Mengenerate Barcode"
date: 2022-02-06T21:29:54+07:00
draft: false
tags: ['Laravel', 'PHP', 'Barcode']
---

Barcode adalah bentuk visual dari data yang berbentuk skrip (berisi bar dan spasi) dengan berbagai lebar dan jarak garis paralel. Mesin menguraikan kode batang karena ditampilkan dalam bentuk yang dapat dibaca mesin.


Ada banyak `package` yang bisa digunakan pada laravel untuk membuat barcode salah satunya adalah `milon/barcode` untuk menginstallnya pada laravel bisa menggunakan composer:

```
root@192.168.1.12:~$ composer require milon/barcode
```

Jika proses penginstallasian sudah selesai. Bisa mendaftarkan packagenya pada `providers` dan `alias` di `config/app.php`.

```
<?php
    return [
    'providers' => [
        ....
        ....
        ....                
        Milon\Barcode\BarcodeServiceProvider::class,
    ],
    
    'aliases' => [
        ....
        ....
        ....                
        'DNS1D' => Milon\Barcode\Facades\DNS1DFacade::class,
        'DNS2D' => Milon\Barcode\Facades\DNS2DFacade::class,
    ]
```

Untuk menggunakannya bisa langsung digunakan pada `blade` dengan merendernya seperti:

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laravel Generate Barcode Examples</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"/>
</head>
<body>
    <div class="container mt-4">
        <div class="mb-3">{!! DNS2D::getBarcodeHTML('4445645656', 'QRCODE') !!}</div>
        <div class="mb-3">{!! DNS1D::getBarcodeHTML('4445645656', 'PHARMA') !!}</div>
        <div class="mb-3">{!! DNS1D::getBarcodeHTML('4445645656', 'PHARMA2T') !!}</div>
        <div class="mb-3">{!! DNS1D::getBarcodeHTML('4445645656', 'CODABAR') !!}</div>
        <div class="mb-3">{!! DNS1D::getBarcodeHTML('4445645656', 'KIX') !!}</div>
        <div class="mb-3">{!! DNS1D::getBarcodeHTML('4445645656', 'RMS4CC') !!}</div>
        <div class="mb-3">{!! DNS1D::getBarcodeHTML('4445645656', 'UPCA') !!}</div>        
    </div>
</body>
</html>
```

Selesai!!!!