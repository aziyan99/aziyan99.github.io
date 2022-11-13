---
title: "Angular Deploy to Docker"
date: 2022-11-12T12:02:53+07:00
draft: true 
tags: ['Angular', 'Docker']
summary: ""
---

## Konfigurasi Docker Image
Buat sebuah file baru di root folder projek angular dengan nama `Dockferfile` dan buat satu folder baru dengan nama `nginx` dan kemudian bikin satu file di folder `nginx` (yang baru saja dibuat) dengan nama `nginx.conf`.

Buka file `Dockerfile` kemudian tuliskan
```
### Tahap 1 ###
FROM node:16.10-alpine AS build

WORKDIR /dist/src/app
RUN npm cache clean --force
COPY . .
RUN npm install
RUN npm run build

### Tahap 2 ###
FROM nginx:latest AS ngi
COPY --from=build /dist/src/app/dist/<nama-projek> /usr/share/nginx/html
COPY nginx/nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80
```
> Note: sesuaikan <nama-projek> dengan nama projek angular

Pada **Tahap 1** kita akan mengambil image `node:16.10-alpine` dan menjadikannya sebagai dasar dari image kita, image ini akan secara default terinstall `Nodejs` versi 16, kemudian kita jadikan folder `/dist/src/app` sebagai folder untuk kita menempatkan projek angular kita yang akan dideploy. Baris `RUN npm cache clean --force` sebenarnya opsional perintah itu akan membersihkan cache dari npm.

Selanjutnya, baris `COPY . .` akan menyalin semua file dan folder dari projek angular kita ke dalam folder `/dist/src/app` didalam image docker kita. Terakhir, kita jalan perintah `npm install` untuk menginstall depedencies dari projek angular kita dan perintah `npm run build` untuk membuild projek angular kita.

Sebelum ke **Tahap 2** buka file `nginx.conf` yang sudah dibuat sebelumnya. Disini kita akan menuliskan konfigurasi untuk bagaimana `nginx` seharusnya menangani projek angular kita

```
server {
  listen 80;
  sendfile on;
  default_type application/octet-stream;

  gzip on;
  gzip_http_version 1.1;
  gzip_disable      "MSIE [1-6]\.";
  gzip_min_length   256;
  gzip_vary         on;
  gzip_proxied      expired no-cache no-store private auth;
  gzip_types        text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;
  gzip_comp_level   9;

  root /usr/share/nginx/html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

Pada **Tahap 2** kita mulai dengan mengambil image docker nginx, kemudian menyalin hasil build projek angular kita yang sudah dilakukan pada **Tahap 1** kedalam root html nginx. Kemudian kita akan menggantikan konfigurasi default nginx dengan konfigurasi yang sudah kita siapkan sebelumnya. Terkahir kita bisa mengexpose port 80 dimana nginx berada.

## Membuat dan Menjalankan Docker Image
Untuk membuat imagenya kita bisa menjalankan perintah
```
docker build -t mydocker/angular:latest .
```
dan tunggu hingga proses build selesai.

Menjalankannya kita bisa lakukan dengan perintah
```
docker run docker run -d -t -i -p 4200:80 --name mydocker-angular  mydocker/angular:latest
```

Buka browser dan pergi ke
```
http://localhost:4200
```

> Jika tidak ada kesalahan selama proses membuat image dan menjalankan seharusnya kita sudah bisa melihat projek angular kita.

## Membuat Variabel Enviroment Menjadi Dinamis
Anggaplah kita mau membuat sebuah variabel environment dengan nama `ENV_NAME`.

> `ENV_NAME` merupakan nama variabel environment yang kita gunakan. Kita bisa menambahkan variabel environment apapun seperti api-endpoint, token, secret-key atau pun yang lainnya.

Ubah file `src/environment.ts` menjadi
```
declare const window: any;

export const environment = {
  production: false,
  name:  window["env"]["ENV_NAME"] || "EZZY"
};
```

Dan file `src/environment.prod.ts` menjadi

```
declare const window: any;

export const environment = {
  production: true,
  name:  window["env"]["ENV_NAME"] || "Ezzy"
};
```

Kemudian buat dua file baru didalam folder `src/assets` dengan nama `env.js` dan `env.template.js`.

File `env.js`.
```
// File: env.js
(function (window) {
  window.env = window.env || {};

  // Env Variable
  window["env"]["ENV_NAME"] = "";
})(this);
```

Dan file `env.template.js`
```
(function (window) {
  window.env = window.env || {};

  // Env Variable
  window["env"]["ENV_NAME"] ="${ENV_NAME}";
})(this);
```

Selanjutnya, ubah masukkan file `env.js` kedalam file `src/index.html`

```
  <script src="assets/env.js"></script>
```

Terakhir tambahkan baris 
```
CMD ["/bin/sh", "-c", "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
```