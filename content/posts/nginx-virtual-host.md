---
title: "Nginx: Membuat Virtual Host"
date: 2022-02-05T21:29:54+07:00
draft: false
tags: ['Nginx', 'VPS', 'Virtual Host', 'Ubuntu']
---

Membuat satu VPS bisa menghost 2 atau lebih website gampang dilakukan dengan nginx. Untuk melakukannya kita akan memanfaatkan fitur dari nginx yaitu virtual host. Contoh ini dilakukan pada VPS dengan sistem operasi 18.0 atau diatasnya

# Install Nginx

```
root@192.168.1.12:~$ sudo apt install nginx
```

Setelah proses instalasi selesai, cek apakah nginx sudah terinstall dan berjalan dengan benar

```
root@192.168.1.12:~$ systemctl status nginx
```

# Folder untuk website
Navigasi ke folder `/var/www/html/` kemudian buat 2 folder baru atau bisa dengan perintah

```
root@192.168.1.12:~$ mkdir /var/www/html/web1.iniserver.com
root@192.168.1.12:~$ mkdir /var/www/html/web2.iniserver.com
```

kita akan membuat 1 file html untuk masing-masing folder yang sudah dibuat sebelumnya

```
root@192.168.1.12:~$ nano /var/www/html/web1.iniserver.com/index.html
```

kemudian file `index.html` isi dengan

```
<html>
  <title>web1.iniserver.com</title>
  <h1>Welcome to the web1.iniserver.com.</h1>
</html>
```

dan untuk folder `we2.iniserver.com` juga

```
root@192.168.1.12:~$ nano /var/www/html/web2.iniserver.com/index.html
```

kemudian file `index.html` isi dengan

```
<html>
  <title>web2.iniserver.com</title>
  <h1>Welcome to the web2.iniserver.com.</h1>
</html>
```

Jika kedua folder tadi sudah diisi dengan file `index.html`, kita akan mengubah hak akses untuk masing-masing folder supaya bisa diakses melalu browser

```
root@192.168.1.12:~$ chown -R www-data:www-data /var/www/html/web1.iniserver.com
root@192.168.1.12:~$ chown -R www-data:www-data /var/www/html/web2.iniserver.com
```

# Konfigurasi untuk virtual host nginx
Buat konfigurasi untuk masing-masing website

```
root@192.168.1.12:~$ nano /etc/nginx/sites-available/web1.iniserver.com.conf
```

kemudian isi dengan

```
server {
        listen 80;
        listen [::]:80;
        root /var/www/html/web1.iniserver.com;
        index index.html index.htm;
        server_name web1.iniserver.com;

   location / {
       try_files $uri $uri/ =404;
   }
}
```

dan untuk `web2.iniserver.com`

```
root@192.168.1.12:~$ nano /etc/nginx/sites-available/web2.iniserver.com.conf
```

kemudian isi dengan

```
server {
        listen 80;
        listen [::]:80;
        root /var/www/html/web2.iniserver.com;
        index index.html index.htm;
        server_name web2.iniserver.com;

   location / {
       try_files $uri $uri/ =404;
   }
}
```

Untuk menghidupkan konfigurasinya kita bisa dengan membuat `symlink` antara `sites-available` dengan `sites-enabled`

```
root@192.168.1.12:~$ ln -s /etc/nginx/sites-available/web1.iniserver.com.conf /etc/nginx/sites-enabled/
root@192.168.1.12:~$ ln -s /etc/nginx/sites-available/web2.iniserver.com.conf /etc/nginx/sites-enabled/
```

Validasi konfigurasi dengan

```
root@192.168.1.12:~$ nginx -t
```

Jika tidak ada masalah maka akan keluar pesan seperti

```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

Restart nginx

```
root@192.168.1.12:~$ systemctl restart nginx
```

Coba kunjugi domain `web1.iniserver.com` dan`web2.iniserver.com` jika tidak ada kesalahan maka akan keluar halaman html yg sudah dibuat sebelumnya. Nama domain dan sub domain bisa disesuaikan dengan yang kita punya. Jika tidak mempunyai domain hal ini bisa juga dilakukan dengan alamat `IP` dari vps kita, dan untuk membuat virtual host nya kita bisa menggunakan port, misal `192.168.1.12:99` dan `192.168.1.12:98`. pada konfigurasi virtual host nya tinggal diubah `listen` portnya ke port yang dinginkan dan ganti `server_name` dengan alamat `IP`. Jangan lupa untuk membuka firewall pada port yang ingin digunakan.

# Menghubungkan dengan PHP-FPM
Tambahkan konfigurasi virtual host untuk website yang dinginkan bisa mengeksekusi file `php` dengan:

```
server {
        listen 80;
        root /var/www/html/web1.iniserver.com;
        index index.html index.htm index.php;
        server_name web1.iniserver.com;

        location ~ \.php$ {
          fastcgi_split_path_info ^(.+\.php)(/.+)$;
          fastcgi_pass unix:/var/run/php/php7.3-fpm.sock;
          fastcgi_index index.php;
          include fastcgi_params;
          fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
          fastcgi_intercept_errors off;
          fastcgi_buffer_size 16k;
          fastcgi_buffers 4 16k;
          fastcgi_connect_timeout 600;
          fastcgi_send_timeout 600;
          fastcgi_read_timeout 600;
        }


   location / {
       try_files $uri $uri/ =404;
   }
}
```

Contoh menambahkan support php pada folder `web1.iniserver.com`. Jangan lupa restart `php-fpm` dan `nginx` (contoh menggunakan php7.3).

```
root@192.168.1.12:~$ systemctl restart nginx
root@192.168.1.12:~$ systemctl restart php7.3-fpm
```

Selesai!!!!