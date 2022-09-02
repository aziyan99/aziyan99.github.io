---
title: "Belajar Alpinejs"
date: 2022-04-01T21:29:54+07:00
draft: false
tags: ['Js', 'Alpinejs']
---

Ngebuat supaya HTML jadi interaktif, reaktif, dinamis dan kawan-kawanya agak sedikit susah kalo pake javascript aja. Sedikit susahnya mungkin karena kita harus bikin dulu `listener` nya (kalo mau bikin dinamis gitu), kalo mau `render`, ya `innerhtml` harus dibikin sendiri juga, kalo mau ambil elemen HTML harus disiapin dulu variablenya, pokonya proses yang kudu kita lewatin (sebagai programmer) jadi banyak (tapi kalo rajin, bikin aja sendiri :v). Pada zaman dahulu kala kita kenal dengan JQuery tapi makin kesini JQuery ternyata makin berat juga, sama cukup lawas juga kalo kita bandingin dengan perkembangan javascript sejauh ini. Ada salah satu javascipt framework yang agak sedikit mirip dengan JQuery (buat manipulasi DOM) namanya Aplinejs. Ketika kita pake JQuery semua kodingan kita ada di file js, tapi kalo pake Alpine sebagian besar kodingan kita akan ada di HTML, karena Apline kita cuma perlu nambahin beberapa attribut baru aja kedalam elemen HTML kita.

> Hanya terjemahan dari dokumentasi Alpinejs dengan tambahan disana-sini :)

# Sebelum Belajar
> Alpinejs terbilang cukup kecil karena ia dibangun dengan 15 attribut, 6 properti, dan 2 fungsi
## Referensi Utama
- [https://alpinejs.dev/start-here](https://alpinejs.dev/start-here)
  
## Install Aplinejs
Untuk ngeinstall Aplinejs ada dua cara. Kita bisa pake `<script>` tag HTML terus pangil file jsnya Alpine (entah make CDN atau local) atau kita bisa install Alpine sebagai `module` pake Nodejs (sebenarnya cara ini agak ribet, disaranin pake cara `script` tag aja, tapi kembali lagi ke preferensi masing-masing)

## `<script>` tag
```
<html>
  <head>
    ...
 
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
  </head>
  ...
</html>
```

`@3.x.x` pada link CDN akan mengembalikan Aplinejs versi tebaru, kalo buat production disarankan untuk versinya di harcoded aja, misal:
```
<script defer src="https://unpkg.com/alpinejs@3.10.2/dist/cdn.min.js"></script>
```
Sama, jangan lupa tambahin `defer` di `script` tagnya. Apa itu `defer` coba baca-baca dulu  [ini](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-defer)

## Sebagai Module (pake NodeJS)
Kita install package (tapi pastikan udah ngeinstall nodejs ama npm nya)
```
npm install alpinejs
```
Jika udah, kita import kedalam project atau bundle app kita
```js
import Alpine from 'alpinejs'

window.Apline = Apline

Alpine.start()

```
`window.Apline = Apline` sebenarnya opsional, tapi supaya kerja jadi gampang kita daftarin aja alpine kedalam `window` object biar debuggin jadi enak. Kalo misalkan kita juga make framework atau library lain selain Alpinejs tambahin kodenya diantara `import Alpine from 'alpinejs'` dan `Alpine.start()`.

# Kenalan Bentar
## Attributes
### x-data
Ngebuat plus ngeinisialisasikan komponen Alpine
```
<div x-data="{ open: false }">
    ...
</div>
```

### x-bind
Supaya nilai dari attribut yang dipasangin `x-bind` bisa jadi dinamis (mudah digonta ganti, gitulah)
```
<div x-bind:class="! open ? 'hidden' : 'block'">
  ...
</div>
```
Kelas `div`-nya akan jadi `block` kalo misalkan variable `open` nilainya `true`. Kalo `open` nilainya `false` kelasnya jadi `hidden`.

### x-on
Masang event listener ke elemen (misalkan kalo diklik gitu)
```
<button x-on:click="open = ! open">
  Toggle
</button>
```
Kalo button diklik maka  variable `open` jadi kebalikan dari nilai sebelumnya (pusing?). Kalo nilai sebelumnya `true` ketika dklik nilainya jadi `false`.

### x-text
Ngubah teks dalam elemen
```
<span x-text="new Date().getFullYear()">
  Toggle
</span>
```
Bisa pake js juga, tapi yang simple (bisa jalan satu baris)

### x-html
Nambahin HTML kedalam HTML
```
<div x-html="(await axios.get('/some/html/partial')).data">
    ...
</div>
```
sama dengan `x-html` bisa pake js juga, tapi yang simpel.

### x-model
Ngehubungin nilai dari elemen html yang inputan gitu ke elemen HTML lain.
```
<div x-data="{ search: '' }">
  <input type="text" x-model="search">
 
  Searching for: <span x-text="search"></span>
</div>
```

### x-show
Buta nampilin atau nyembunyiin elemen HTML
```
<div x-show="open">
  ...
</div>
```
`div` akan ditampilkan kalo variable `open` bernilai `true`.

### x-transition
Nambahin animasi dikit (pake css `transition` transition kayanya)
```
<div x-show="open" x-transition>
  ...
</div>
```

### x-for
Ngebuat looping (perulangan) dari data (biasanya data yang bisa dilooping `array of object` tapi array aja atau obejct aja kayanya bisa juga deh)
```
<template x-for="post in posts">
  <h2 x-text="post.title"></h2>
</template>
```

### x-if
Ngebuat kondisi gitu (kalo kondisinya ga terpenuhi ya elemennya dihapus dari DOM)
```
<template x-if="open">
  <div>...</div>
</template>
```

### x-init
Constructor (otomatis jalan pas elemen Apline dibuat)
```
<div x-init="date = new Date()"></div>
```
Membuat variable `date` dengan nilai dari object `Date`.

### x-effect
Semacam `useEffect` pada React.js, akan dieksekusi ketika terjadi efek (efek gimana :v) pada DOM
```
<div x-effect="console.log('Count is '+count)"></div>
```

### x-ref
Reference elements directly by their specified keys using the $refs magic property (bingung dibahasa indonesiakan gimana?), intinya semacam mereferensikan satu nilai di variable.
```
<input type="text" x-ref="content">
 
<button x-on:click="navigator.clipboard.writeText($refs.content.value)">
  Copy
</button>
```
Kalo button Copy nya diklik ntar tulisan diinputannya bakalan ke-copy (masuk ke clipboard).

### x-cloak
Pokoknya selama Alpinejs belom kelar di-load elemen dengan attribut ini bakalan disembunyikan (hidden)
```
<div x-cloak>
  ...
</div>
```

### x-ignore
Buat bilang ke Apline kalo elemen dengan attribut ni jangan dipedulikan (dinisialisasi)
```
<div x-cloak>
  ...
</div>
```

## Properties
### $store
Ngambil `global store` yang dibuat oleh `Alpine.store(...)`
```
<h1 x-text="$store.site.title"></h1>
```

### $el
Ngambil elemen HTML yang dirinya sendiri (mangil dirinya sendiri gitu)
```
<div x-init="new Pikachu($el)"></div>
```

### $dispatch
Nge-`dispatch` event kustom kebrowser (ntar ada yg ngedengerin `lister`-nya)
```
<div x-on:notify="...">
  <button x-on:click="$dispatch('notify')">...</button>
</div>
```
Flownya, kalo buttonnya kita klik, ntar ada kaya pengumuman gitu dibrowser isinya `notify`. Terus ntar ada satu elemen yang bakalan khusus ngedengerin pengumumannya yang isinya `notify`.

### $watch
Ngedeteksi kalo nilai dari satu variabel berubah.
```
<div x-init="$watch('count', value => {
  console.log('count is ' + value)
})">...</div>
```
Kalo misalkan nilai variabel `count` berubah `console.log('count is ' + value)` akan dijalanin.

### $refs
Pasangan dari attribut `x-ref`. Kaya ngereferensiin satu nilai berdasarkan namanya.
```
<div x-init="$refs.button.remove()">
  <button x-ref="button">Remove Me</button>
</div>
```

### $nextTick
Wait until the next "tick" (browser paint) to run a bit of code (gimana ya jelasinnya, coba aja baca-baca tentang browser paint)
```
<div
  x-text="count"
  x-text="$nextTick(() => {"
    console.log('count is ' + $el.textContent)
  })
>...</div>
```

## Methods
### Alpine.data
Make ato ngambil data yang kita inisialisikan pake `x-data` die elemen HTML
```
<div x-data="dropdown">
  ...
</div>
 
...
 
Alpine.data('dropdown', () => ({
  open: false,
 
  toggle() { 
    this.open = ! this.open
  }
}))
```

### Alpine.store
Ngebuat beberapa variable global yang datanya bisa kita panggil/baca dan pake. Buat ngambil datanya kita pake properti `$store`
```
<button @click="$store.notifications.notify('...')">
  Notify
</button>
 
...
 
Alpine.store('notifications', {
  items: [],
 
  notify(message) { 
    this.items.push(message)
  }
})
```

# Halo Dunia!
Sebagai programmer yang ganteng :v serta dijalan yang lurus (baik maksudnya). Ga **afdhol** rasa ne kalo kita belajar teknologi baru ga dimulai dari **Halo Dunia** (kalo kata orang putih mah **Hello World**). Maka dari itu mari kita mulai **Hallo Dunia** dengan membuat file `` baru beserta strukturnya dan jangan lupa juga script alpine nya di masukin.

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Hallo Dunia!</title>
      <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
  </head>
  <body>
    <h1 x-data="{message: 'Halo Dunia!'}" x-text="message"></h1>
  </body>
</html>
```

Ayo kita buka file html kita melalui browser dan hasilnya akan seperti ini:
![https://i.ibb.co/sHSk8yW/Screen-Shot-2022-05-27-at-22-31-57.png](https://i.ibb.co/sHSk8yW/Screen-Shot-2022-05-27-at-22-31-57.png)

Yup, benar sekali teks **Hallo Dunia** berasal dari `x-data="{message: 'Hallo Dunia!'}"`. Jadi, berdasarkan contoh diatas, kita menginisialisasikan tag `h1` sebagai komponen alpine, buktinya adalah di tag `h1` terdapat attribut `x-data` yang merupakan attribut alpine, dan attribut `x-data` digunakan untuk menginisialisasikan komponen alpine. Attribute `x-data` membutuhkan data yang akan dimanipulasi dan digunakan (data ne dalam bentuk sebuah (1) object (biasa js :v)), pada contoh sebelumnya, data yang kita berikan kedalam attribut `x-data` adalah sebuah pasangan key-value, keynya `message` dan valuenya `Halo Dunia`.

> Belom kelar ...
