---
title: "Backup Mysql/MariaDB Database"
date: 2022-09-12T16:55:21+07:00
draft: true
tags: ['Database', 'MySQL', 'MariaDB']
summary: "Membackup dan merestrore database (MySQl dan MariaDB) pada dasarnya sangat mudah dilakukan dengan memanfaatkan perintah mysqldump, hanya dengan satu perintah kita bisa membackup dan merestore database"
---

Perintah `mysqldump` adalah perintah untuk membackup database kedalam bentuk file. File yang dihasilkan merupakan kumpulan perintah-perintah SQL untuk membuat database, table, kolom, memanipulasi kolom, memanipulasi key kolom, dan menambahkan data kedalam table. Dengan file ini kita bisa memindahkan data dari satu database server kedatabase server yang lain atau kita hanya ingin melakukan backup secara berkala data yang ada pada database kita.

Secara umum perintah `mysqldump` mempunyai struktur:

```
mysqldump [optios] > file.sql
```

`options` adalah konfigurasi untuk perintah `mysqldump` dan `file.sql` adalah lokasi file untuk menyimpan file backup.

## Backup
Untuk membackup satu database bisa gunakan perintah:

```
mysqldump -u root -p nama_database > lokasi_backup/nama_file_backup.sql
```

Untuk membackup semua database bisa dengan perintah:

```
mysqldump -u root -p --all-databases > all_databases.sql
```

Atau bisa menggunakan bash script sehingga file backupnya bisa terpisah

```
for DB in $(mysql -e 'show databases' -s --skip-column-names); do
    mysqldump $DB > "$DB.sql";
done
```

Atau jika ingin mengkrompres hasil backupnya

```
mysqldump database_name | gzip > database_name.sql.gz
```

## Restore

Untuk merstore satu database:

```
mysql  database_name < file.sql
```

Biasanya kita harus membuat nama database terlebih dahulu sebelum merestore satu database:

```
mysql -u root -p -e "create database database_name";
mysql -u root -p database_name < database_name.sql
```

Atau merestore satu database dari banyak database:

```
mysql --one-database database_name < all_databases.sql
```

## Referensi
1. [https://linuxize.com/post/how-to-back-up-and-restore-mysql-databases-with-mysqldump/](https://linuxize.com/post/how-to-back-up-and-restore-mysql-databases-with-mysqldump/)