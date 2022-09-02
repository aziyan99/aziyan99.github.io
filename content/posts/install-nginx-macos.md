---
title: "Nginx: Install di MacOS dengan Homebrew"
date: 2022-02-20T21:29:54+07:00
draft: false
tags: ['Nginx', 'OSX']
---

NGINX adalah aplikasi open source untuk server web, NGINX is open source software for web serving, reverse proxying, caching, load balancing, media streaming, dan banyak lagi. Ini dimulai sebagai server web yang dirancang untuk kinerja dan stabilitas maksimum. Selain kemampuan server HTTP-nya, NGINX juga dapat berfungsi sebagai server proxy untuk email (IMAP, POP3, dan SMTP) dan proxy terbalik dan penyeimbang beban untuk server HTTP, TCP, dan UDP.

# Install homebrew
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

# Update home brew repository
```
brew update
```

# Install Nginx
```
brew install nginx 
```

Nginx akan diinstal di folder `usr/local/cellar` dan nginx berjalan dengan port default di `8080`

## Me-restart Nginx
```
brew services restart nginx
```
## Men-stop Nginx
```
brew services stop nginx
```

Jika installasi berhasil maka hasil log akan lebih kurang seperti
```
username@192.168.1.12:~$ brew install nginx
Running `brew update --preinstall`...
==> Auto-updated Homebrew!
Updated 3 taps (shivammathur/php, homebrew/cask and homebrew/services).
==> Updated Formulae
Updated 1 formula.
==> New Casks
abbyy-finereader-pdf                     roonbridge
mediahuman-audio-converter               rwts-pdfwriter
paragon-camptune                         unicopedia-plus
==> Updated Casks
Updated 174 casks.
==> Deleted Casks
finereader

==> Downloading https://ghcr.io/v2/homebrew/core/nginx/manifests/1.21.6_1
######################################################################## 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/nginx/blobs/sha256:dba847687a67
==> Downloading from https://pkg-containers.githubusercontent.com/ghcr1/blobs/sh
######################################################################## 100.0%
==> Pouring nginx--1.21.6_1.monterey.bottle.tar.gz
==> Caveats
Docroot is: /usr/local/var/www

The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that
nginx can run without sudo.

nginx will load all files in /usr/local/etc/nginx/servers/.

To restart nginx after an upgrade:
  brew services restart nginx
Or, if you don't want/need a background service you can just run:
  /usr/local/opt/nginx/bin/nginx -g daemon off;
==> Summary
🍺  /usr/local/Cellar/nginx/1.21.6_1: 26 files, 2.2MB
==> Running `brew cleanup nginx`...
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
```

## Beberapa catatan penting
1. Folder konfigurasi Nginx -> `/usr/local/etc/nginx/servers/`.
2. Konfig default -> `/usr/local/etc/nginx/nginx.conf`.
3. Logs Nginx -> `/usr/local/var/log/nginx/`.
4. Folder default webroot -> `/usr/local/var/www/`.
5. Alamat default -> `http://localhost:8080`.

# Links
1. [https://www.nginx.com](https://www.nginx.com/resources/glossary/nginx/)
2. [https://brew.sh/](https://brew.sh/)