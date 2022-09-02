---
title: "Laravel: Path Gambar dari Model"
date: 2022-02-08T21:29:54+07:00
draft: false
tags: ['Laravel', 'PHP', 'Image', 'Model']
---

Avatar untuk pengguna (foto profile) bisa dibuat dinamis, jika pengguna tidak mengupload avatar nya sendiri kita bisa menggunakan inisialnya dan membuat avatar untuk pengguna tadi.

# Requirement
1. Laravel project
2. Kolom avatar pada table users
3. Kolom avatar harus `nullable`

# Eksekusi
Buka model `User.php` dan jangan lupa untuk menambahkan avatar pada `$protected` array. Kemudian buat sebuah `accessor` dengan nama `getAvatarPathAttribute()`. Kemudian bisa ikuti kode dibawah (dan bisa dimodifikasi sesuka hati)

```
    use Illuminate\Support\Facades\Storage; // jangan lupa import Facades Storage

    public function getAvatarPathAttribute()
    {
        if ($this->avatar == null) {
            return "https://ui-avatars.com/api/?size=128&name=" . $this->name;
        } else {
            return Storage::disk('public')->url($this->avatar);
        }
    }
```

Untuk penggunaanya di `blade` seperti

```
    <img src="{{ $user->avatar_path }}" alt="logo" class="img-thumbnail" width="128">
```

Selesai!!!