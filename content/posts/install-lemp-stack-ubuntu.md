---
title: "Install Lemp Stack Ubuntu"
date: 2022-02-04T21:29:54+07:00
draft: false
tags: ['Ubuntu', 'LEMP', 'apache2', 'PHP', 'MySQL', 'Linux']
---

LEMP merupakan singakatan dari Linux, Nginx, MariDB atau MySQL dan PHP. LEMP merupakan bundelan aplikasi yang biasa kita gunakan untuk menghost sebuah website, terutama yang ditulis dengan bahasa pemrograman PHP.

Refresh repository ubuntu

```
sudo apt update
```

Upgrade package yang harus diupgrade, jika ada.

```
sudo apt upgrade
```


## Instalasi Nginx

```
sudo apt install nginx
```

Jika instalasi sudah selesai, kita bisa memverifiasinya dengan mengunjungi url didalam browser
```
http://<ip>
```

Jika ada pesan Welcome to nginx! maka bisa dipastikan instalasinya berhasil. Terkadang ada kasus dimana halaman nginx tidak muncul padahal instalasi sudah berhasil, hal ini biasanya disebabkan oleh pengaturan Firewal yang ada divps kita. Untuk mengatasinya bisa melalui aplikasi UFW dengan memberitahukan nginx untuk menerima request di port 80 (http) dan port 443 (https) difirewall.


### Install UFW

```
sudo apt install ufw
```

Berikan akses ke traffic http dan https

```
sudo ufw allow http
``` 

```
sudo ufw allow https
```

Restart nginx

```
systemctl restart nginx
```

## Install MariaDB

```
sudo apt install mariadb-server
```
Tambah pengguna baru di MariaDB
```
sudo mariadb
```
Didalam shell MariaDB ketikkan perintah
```
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin12345'; 
```

```
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost'; 
```

```
FLUSH PRIVILEGES; exit;
```
Nanti ketika ingin terhubung ke MariaDB gunakan user admin@localhost dan password admin12345
```
mariadb -uadmin -p
```

## Install PHP
```
sudo apt install php-fpm php-mysql
```

Verifikasi apakah php sudah benar terinstall. Pergi ke direktori root server di `/var/wwww/html/`, buat sebuah file baru dengan nama `phpinfo.php` dan diisi dengan kode

```
<?php phpinfo();
```

Kemudian buka browser dan pergi ke `http://<ip>/phpinfo.php`. Jika error permission denied blabla..., bisa diatasi dengan mengubah user dari folder `/var/www/html/` menjadi `www-data` atau hak aksesnya diganti `776`, `766`, atau `777`


Selesai!!!!!