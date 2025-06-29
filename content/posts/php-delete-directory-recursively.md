+++
date = '2025-04-08T13:04:41+07:00'
draft = false
title = 'PHP: Menghapus directory secara rekursif'
locale = "id_ID"
tags = ['PHP']
+++

Menghapus direktori yang didalamnya terdapat direktori-direktori lainmenggunakan PHP agak _tricky_, karena kita tidak bisa langsung menghapus direktori jika didalamnya terdapat satu atau lebih file. Untuk mengatasi masalah ini, fungsi ini yang selalu penulis gunakan adalah:

```php
<?php

    function rrmdir(string $src): void
    {
        $dir = opendir($src);
        while (false !== ($file = readdir($dir))) {
            if (($file != '.') && ($file != '..')) {
                $full = $src . '/' . $file;
                if (is_dir($full)) {
                    rrmdir($full);
                } else {
                    unlink($full);
                }
            }
        }

        closedir($dir);
        rmdir($src);
    }
```

Fungsi ini dimulai dengan membuka direktori yang ingin dihapus dengan fungsi [`opendir()`](https://www.php.net/manual/en/function.opendir.php)
```php
<?php

...
    $dir = opendir($src);
...

```

Fungsi ini akan mengembalikan _handle resource_ dari direktori yang kita buka (jika _path_ direktori nya benar >_- ). _Resource_ sendiri adalah sebuah variabel spesial yang terhubung dengan resource eksternal, dalam kasus ini _handle_ direktori yang dibuka.

Selanjutnya kita bisa menggunakan fungsi [`readdir()`](https://www.php.net/manual/en/function.readdir.php) untuk membaca didalam direktori yang kita buka tadi terdapat file dan direktori apa saja.

```php
<?php

...

        while (false !== ($file = readdir($dir))) {
            if (($file != '.') && ($file != '..')) {
                $full = $src . '/' . $file;
                if (is_dir($full)) {
                    rrmdir($full);
                } else {
                    unlink($full);
                }
            }
        }

...

```

Selanjutnya kita bisa menggunakan `if-else` untuk melakukan pengecekan apakah _path_ yang kita baca sekarang berupa direktori atau file. Jika direktori kita baca lagi isinya ada apa saja dan jika file kita langsung hapus file nya.

Proses ini akan menghapus semua file yang ada dan hanyak meninggalkan direktori kosong, sehingga proses penghapusan kita tidak terhambat karena direktori yang kita hapus tidak _empty_.

Terakhir, jangan lupa untuk menutup _resource handle_ yang kita buka dengan fungsi `opendir()` dan kita bisa langsung menghapus direktori nya.

```php
<?php

...

    closedir($dir);
    rmdir($src);

...

```

Semoga bermanfaat. (>_<)