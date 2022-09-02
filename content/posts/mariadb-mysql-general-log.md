---
title: "MariaDB/MySQL: Menggunakan General Log"
date: 2022-04-01T21:29:54+07:00
draft: false
tags: ['MariaDB', 'MySQL', 'Database', 'DBMS']
---

Sebagai seorang programmer yang keren (pastinya), log adalah salah satu dari sekian banyak teman baik *debugging* kita. Melihat riwayat dari query-query yang dieksekusi oleh MariaDB juga akan menjadi informasi yang penting ketika kita mau menelusuri bagaimana tahapan eksekusi penyimpanan data dari aplikasi kita. MariaDB punya variable `general_log` dimana ketika kita ubah nilainya menjadi `1` MariaDB akan me-log suluruh history eksekusi query kedalama file. File tersebut biasanya disimpan di `/usr/local/var/mysql`.

# Mengaktifkan General Log
Login kedalam console MariaDB:

```
mariadb -u<username> -p
```
Setelah berhasil login masukkan perintah:

```
SET GLOBAL general_log = 1 ;
```

# Mematikan General Log

```
SET GLOBAL general_log = 0 ;
```

Perlu dicatat file log yang dihasilkan oleh MariaDB akan bertambah besar seiring dengan semakin banyaknya query dieksekusi.

Selesai!!!