+++
date = '2025-07-12T10:18:40+07:00'
draft = false
title = 'Laravel: Deploy ke CyberPanel + OpenLiteSpeed'
locale = "id_ID"
tags = ['Laravel', 'PHP', 'Deployment', 'CyberPanel', 'OpenLiteSpeed']
+++

Kalau ngerasa cPanel kemahalan dan *setup* VPS kosongan terlalu *njelimet*, **CyberPanel** adalah jalan pintas yang paling *superb*. Mengusung OpenLiteSpeed yang *ngebut parah*, CyberPanel ngasih *interface* yang ramah laiknya *shared hosting* tapi *power*-nya dapet *full server*.

Nah, nge-*deploy* Laravel di CyberPanel beda dikit triknya dibanding Nginx/Apache karena kita berurusan sama arsitektur LiteSpeed. *But hey, nothing is impossible, right?*

## 1. Siapin Website di CyberPanel
Pertama, kita harus bikin kontainer *website* barunya dulu:
1. Masuk ke dashboard CyberPanel (`https://IP-VPS:8090`).
2. Masuk ke menu **Websites** -> **Create Website**.
3. Pilih *package Default*, atur **Owner** admin, masukin **Domain Name**, dan pilih **PHP Version** yang sesuai sama aplikasi Laravel (misal PHP 8.1 / 8.2).
4. Centang **SSL** kalau udah arahin (pointing) domain ke IP server.
5. Klik **Create Website**.

## 2. Upload / Fetch Project
Ada dua jalur distribusi di tahap ini: mau main *upload zip* atau pake *Git*. Karena di CyberPanel kita udah dapet SSH as a *root*, mending pake Git!
1. Buka terminal (pakai PuTTY / terminal bawaan PC).
2. SSH ke server: `ssh root@IP-VPS`.
3. Masuk ke direktori web yang barusan dibikin:
```bash
cd /home/nama-domain.com/public_html
```
4. Kosongin directori abis itu clone reponya:
```bash
rm -rf *
git clone https://github.com/user/pe-repo-laravel.git .
```

*Kalau mau upload zip bisa juga lewat menu File Manager di CyberPanel kaya biasa ya.*

## 3. Instalasi dan Setup Environment
Masih di dalem folder `public_html` (lewat terminal), sekarang kita *setup* Laravelnya:

1. Install *dependency*-nya:
```bash
composer install --optimize-autoloader --no-dev
```
*(Tenang, composer udah pre-installed di CyberPanel!)*

2. Setup `.env`:
```bash
cp .env.example .env
nano .env
```
*(Edit dan cocokin database-*nya nanti)*. Tekan `Ctrl+X` lalu `Y` terus `Enter` buat *save* file-nya.

3. Generate key & ubah hak akses (permission):
```bash
php artisan key:generate

# Penting banget biar CyberPanel ga Error 500!
chown -R nobody:nobody /home/nama-domain.com/public_html
find /home/nama-domain.com/public_html -type d -exec chmod 755 {} \;
find /home/nama-domain.com/public_html -type f -exec chmod 644 {} \;
```

## 4. Bikin Database
Balik ke *dashboard* web CyberPanel:
1. Pilih menu **Databases** -> **Create Database**.
2. Pilih *website* yang relevan, isikan nama DB, username, dan password.
3. Klik **Create Database**.

*Oiya*, masukin *credential* SQL ini ke file `.env` yang udah dibikin di tahap 3 poin 2 ya! Kalau udah pas, dari terminal jalanin migrasi:
```bash
php artisan migrate --force
```

## 5. Merubah Document Root (The Magic Trick)
Ini dia *the real deal* dari CyberPanel. Secara *default*, CyberPanel bakal baca file di dalam folder `public_html`. Tapi Laravel punya `index.php` di dalem folder `public_html/public`. Kalo dibiarin, web harus diakses dari `nama-domain.com/public` (Jelek parah njir).

Kita harus akalin *vHost* OpenLiteSpeed-nya:
1. Buka dashboard CyberPanel, masuk ke **Websites** -> **List Websites**.
2. Klik **Manage** pada *website* yang dibuat.
3. Scroll ke bawah, cari fitur **vHost Conf**.
4. Cari elemen skrip `docRoot`, aslinya bakal keliatan kayak gini:
```text
docRoot                   $VH_ROOT/public_html
```
Ubah jadi nambahin `/public`:
```text
docRoot                   $VH_ROOT/public_html/public
```

5. *Save!* Terus restart OpenLiteSpeed-nya dengan cara klik menu **Server Status** (di bagian kiri atas layar) terus **Restart LiteSpeed**.

## EF_E_KYU(?)

### Bro, kok symlink storage (`php artisan storage:link`) kaga jalan?
Ini kejadian sering di LiteSpeed karena pengaturan keamanan vHost. Di file `vHost Conf` yang sama (kayak tahap 5 tadi), *scroll* paling bawah, cek atau tambahkan baris ini biar fitur *Symlink* diizinkan:
```text
enableSymlink             1
```
*Save and Restart LiteSpeed.*

Dan ya, segitu aja! Web Laravel yang kenceng dengan balutan *LiteSpeed Cache* seharusnya sekarang udah tayang dengan manis.

## Referensi
1. [CyberPanel Official Documentation](https://community.cyberpanel.net/)
