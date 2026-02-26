+++
date = '2025-07-12T10:18:02+07:00'
draft = false
title = 'Laravel: Deploy ke VPS Tanpa Bikin Pusing'
locale = "id_ID"
tags = ['Laravel', 'PHP', 'Deployment', 'VPS', 'Ubuntu']
+++

Pindah dari *shared hosting* ke VPS itu ibarat pindah dari kos-kosan ke apartemen studio. Kita punya kontrol penuh, tapi kalau apartemennya mati listrik, kita sendiri yang pusing benerinnya. Berbeda dengan cPanel yang tinggal klika-kliki, *deploy* Laravel ke VPS (katakanlah Ubuntu) butuh *effort* buat setup *environment* dari nol.

Tapi tenang aja, kalau udah biasa, proses ini *fun* banget karena kita bakal lebih paham *behind the scene*-nya. *Let's get down to business!*

## 1. Setup Server Dasar
Sebelum mikirin Laravel, pastiin *server* Ubuntu siap buat menampung aplikasi PHP. Kita butuh *stack* LEMP (Linux, Nginx, MySQL, PHP).

**A. Update Server**
Masuk ke VPS via SSH dan jalankan:
```bash
sudo apt update && sudo apt upgrade -y
```

**B. Install Nginx**
```bash
sudo apt install nginx -y
```

**C. Install MySQL**
```bash
sudo apt install mysql-server -y
sudo mysql_secure_installation
```
*(Ikutin prompt-nya buat nge-set password root database)*

**D. Install PHP & Ekstensinya**
Laravel butuh beberapa ekstensi PHP biar jalan lancar.
```bash
sudo apt install php-fpm php-mysql php-mbstring php-xml php-bcmath php-curl php-zip unzip curl -y
```

**E. Install Composer**
*The holy grail of PHP development.*
```bash
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

## 2. Siapin Database
Bikin database buat aplikasi kita lewat terminal MySQL:
```bash
sudo mysql -u root -p
```
Lalu eksekusi perintah SQL ini:
```sql
CREATE DATABASE nama_database;
CREATE USER 'user_db'@'localhost' IDENTIFIED BY 'password_super_rahasia';
GRANT ALL PRIVILEGES ON nama_database.* TO 'user_db'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

## 3. Clone Repository & Setup Project
Kita simpan aplikasinya di `/var/www/`.

1. Clone reponya (pastikan server punya akses ke Git):
```bash
cd /var/www/
sudo git clone https://github.com/user/repo-laravel.git nama-folder-app
```

2. Atur *permission*-nya biar Nginx bisa baca:
```bash
sudo chown -R www-data:www-data /var/www/nama-folder-app
sudo chmod -R 775 /var/www/nama-folder-app/storage /var/www/nama-folder-app/bootstrap/cache
```

3. Masuk ke folder aplikasi, *install dependency*, dan setup environment:
```bash
cd /var/www/nama-folder-app
composer install --optimize-autoloader --no-dev
cp .env.example .env
php artisan key:generate
```

4. Edit file `.env` pakai `nano`:
```bash
nano .env
```
Sesuaikan konfigurasi database dengan yang udah dibuat di tahap 2, terus pastiin `APP_ENV=production` dan `APP_DEBUG=false`.

5. *Migrate* database-nya:
```bash
php artisan migrate --force
```

## 4. Konfigurasi Nginx
Ini part yang suka bikin *stuck*. Nginx butuh dikasih tau *document root* aplikasi kita di mana.

1. Bikin file konfigurasi baru buat aplikasi:
```bash
sudo nano /etc/nginx/sites-available/nama-folder-app
```

2. *Paste* *config* default bawaan Nginx buat Laravel (sesuaikan nama domain, folder, dan versi PHP-FPM yang dipakai):
```nginx
server {
    listen 80;
    server_name nama-domain.com;
    root /var/www/nama-folder-app/public; # Pastikan ke folder /public

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    index index.html index.htm index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock; # Sesuaikan versi PHP!
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

3. Aktifkan *config* Nginx-nya:
```bash
sudo ln -s /etc/nginx/sites-available/nama-folder-app /etc/nginx/sites-enabled/
```

4. Tes konfigurasi Nginx dan *reload*:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

Dan *BOOM!* Aplikasi Laravel sekarang harusnya udah nangkring cantik asalkan domain udah dipointing ke IP VPS ini.

## Referensi
1. [DigitalOcean: How to Install Laravel on Ubuntu 22.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-laravel-with-lemp-on-ubuntu-22-04)
