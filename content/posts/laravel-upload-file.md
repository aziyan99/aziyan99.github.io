+++
date = '2025-07-02T22:17:59+07:00'
draft = false
title = 'Laravel: Upload file'
locale = "id_ID"
tags = ['Laravel', 'PHP']
+++

Untuk membuat proses upload file pada laravel caranya cukup mudah atau mungkin sangat *mudah*. Jika kita membuat proses uploadnya secara manual hal yang sebagian besar kita lakukan adalah:

```
read the temp path -> read the file name / ext -> rename the file(?) using uniqueid -> move to public dir
```

*Yep*, *pretty complex process*. Belum lagi jika kita harus memvalidasi ektensi dari filenya, validasi ukuran filenya, baca *mime type*(?), ....., yeah *that really pain in the ass*.

## Introduce..... Laravel File Upload
Dengan menggunakan laravel proses upload nya jadi cukup mudah, yang kita tulis cukup:

```php
    $pathFile = $request->file('<file-input-name>')->store('<target-dir>', ['disk' => '<target-disk>']);
```

*Code* diatas jika kita bahasakan maka akan menjadi:
```
    Simpan file <file-input-name> ke <target-dir> pada *disk* <target-disk>, jika berhasil maka assign path dari file upload ke variabel $pathFile
```

Simple yet elegant!

*Okay, great! But, wth is disk?* *Disk* adalah semacam *hard-drive* / lokasi penyimpanan yang laravel gunakan, secara *default* laravel punya *disk public* and *disk private*. *Disk public* biasanya kita gunakan untuk menyimpan file-file yang akan / bisa diakses oleh publik atau tanpa proses otentikasi, seperti gambar *profile user*, file pengumuman, poster, promosi, dan lain lain. Sebaliknya *disk private* biasanya kita gunakan untuk menyimpan file-file yang sifatnya itu privat dan membutuhkan user yang terotentikasi + terotorisasi untuk mengakses filenya.

Misalkan, jika kita punya proses untuk mengupload gambar profile pengguna maka *code* yang kita tulis lebih kurang:
```php
    $profileImage = $request->file('profile_image')->store('profile-images', ['disk' => 'disk']);
```

dan jika kita bahasakan maka akan menjadi:
```
    Simpan `profile_image` ke direktori `profile-images` pada disk `public`. Jika berhasil maka assign path dari gambar yang di upload ke variabel $profileImage
```

*Fantastic! But, how do I access the uploaded file?* Well, untuk mengakses file cukup kita panggil menggunakan *helper* `asset()`. Misalkan path yang di *return* adalah 'profile-images/1212kljlkj13213123.png', maka kita bisa merender gambarnya dengan:
```php
    <img src="{{ asset($user->profile_image) }}" alt="iamprogrammerihavenolife">
```

*Rose are red violets are blue*.

## EF_E_KYU(?)
### Cara uploadnya sudah mengikuti cara Laravel, tapi file nya tidak exists ketika di *panggil*
```sh
php artisan storage:link
```

Jika di projek nya di deploy ke *shared hosting*, kita bisa panggil *command* *symlink*nya *programmatically*:
```php
// routes/web.php

Route::get('/storage-link', function(){
      \Illuminate\Support\Facades\Artisan::call('storage:link');
       dd('success');
});

```

### Filenya sudah *tak* aplod, tapi ga masuk
Mungkin lupa nambahin `enctype="multipart/form-data"` di *form* nya:
```php
    <form action="<route>" method="POST" enctype="multipart/form-data">
        ...
    </form>
```

### Symlink udah, `enctype="multipart/form-data"` juga udah, tapi masih ga muncul filenya
Cek path disk public di `config/filesystems.php` *pointing* ke mana.

### Masih sama, filenya ga muncul
Coba liat log di `storage\logs\laravel.log`.

## References
1. https://laravel.com/docs/12.x/filesystem#file-uploads
