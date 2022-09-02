---
title: "Laravel: Membuat Folder"
date: 2022-02-20T21:29:54+07:00
draft: false
tags: ['Laravel', 'PHP']
---

Tulisan ini merupakan tutorial singkat bagaimana membuat sebuah folder pada projek laravel. Pembuatan sebuah folder umumnya digunakan untuk menyimpan gambar-gambar yang bisa pengguna kita upload, seperti logo, foto profile, silder, dan sebagainnya.

# Dengan File System
```php
$path = storage_path('app/public/profile_images');
if(!File::isDirectory($path)){        
    File::makeDirectory($path, 0777, true, true);
}
```

# Dengan Storage System
```php
$path = storage_path('app/public/profile_images');
Storage::makeDirectory($path, 0777, true, true);
```


# Dengan Core PHP
```php
$path = storage_path('app/public/profile_images');
mkdir($path);
```

Selesai!!!