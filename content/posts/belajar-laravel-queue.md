---
title: "Laravel: Belajar Laravel Queue"
date: 2022-09-06T23:26:32+07:00
draft: false
tags: ['Laravel', 'PHP', 'Queue']
summary: "Laravel queue adalah sebuah mekanisme untuk menjalankan proses yang memakan waktu dibelakang layar (background)"
---

Ketika mengembangkan sebuah website mungkin kita akan punya satu atau dua proses yang akan memakan waktu yang lama untuk dieksekusi. Dengan Laravel Queue kita bisa mengirim proses ini untuk dijalankan dibelakang layar (background). Konfigurasi untuk Laravel Queue berada di berkas `config/queue.php`. Pada file ini, terdapat konfigurasi untuk koneksi yang digunakan, driver yang dipakai, dan dimana pesan error akan disimpan.

## Connection dan Queues

Sebelum jauh penjelasan tentang queue, ada baiknya kita pahami perbedaan antara koneksi dengan queues. Pada berkas `config/queue.php` terdapat konfigurasi untuk untuk `connections`

```
    ....

    'connections' => [

        'sync' => [
            'driver' => 'sync',
        ],

        'database' => [
            'driver' => 'database',
            'table' => 'jobs',
            'queue' => 'default',
            'retry_after' => 90,
            'after_commit' => false,
        ],

        'beanstalkd' => [
            'driver' => 'beanstalkd',
            'host' => 'localhost',
            'queue' => 'default',
            'retry_after' => 90,
            'block_for' => 0,
            'after_commit' => false,
        ],

        'sqs' => [
            'driver' => 'sqs',
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'prefix' => env('SQS_PREFIX', 'https://sqs.us-east-1.amazonaws.com/your-account-id'),
            'queue' => env('SQS_QUEUE', 'default'),
            'suffix' => env('SQS_SUFFIX'),
            'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
            'after_commit' => false,
        ],

        'redis' => [
            'driver' => 'redis',
            'connection' => 'default',
            'queue' => env('REDIS_QUEUE', 'default'),
            'retry_after' => 90,
            'block_for' => null,
            'after_commit' => false,
        ],
    ],

    ...
```

Konfigurasi ini merupakan konfigurasi untuk mengkoneksikan Laravel Queue dengan backend queue services (yang akan menjalankan queue) seperti Amazon SQS, Redis, atau Beanstalk. Masing-masing konfigurasi koneksi ini bisa mempunyai lebih dari satu proses queue.

Diberkas `config/queue.php` juga, kita melihat setiap koneksi queue mempunyai attribut `queue`. Attribut ini merupakan queue service default yang akan digunakan ketika kita tidak memberitahukan Laravel Queue service queue mana yang kita gunakan

```
use App\Jobs\AcceptAllRegistration;
 
// This job is sent to the default connection's default queue...
AcceptAllRegistration::dispatch();
 
// This job is sent to the default connection's "emails" queue...
AcceptAllRegistration::dispatch()->onQueue('emails');
```

Cara paling mudah untuk menjalankan queue adalah dengan menggunakan driver database karena kita tidak perlu konfigurasi tambahan atau package tambahan. Untuk menggunakan driver database pada queue bisa menggunakan artisan dengan perintah

```
php artisan queue:table
```

Pastikan koneksi kedatabase sudah sesuai dengan yang digunakan. Perintah tersebut akan membuat sebuah berkas migrasi baru untuk membuat tabel `jobs` yang akan menjadi tempat untuk menyimpan job yang dijalankan.

> Job adalah proses yang queue jalankan

Kemudian jalankan perintah 

```
php artisan migrate
```

untuk memigrasi table jobs yang sudah digenerate oleh Laravel Queue.

Terakhir, ubah nilai dari variabel `QUEUE_CONNECTION` di berkas `.env` menjadi `database`

```
QUEUE_CONNECTION=database
```

## Membuat Job
Job bisa dibuat dengan perintah artisan

```
php artisan make:job AcceptAllRegistration
```

> Katakanlah kita punya sebuah sistem dimana setiap pengguna yang mendaftar harus di accept secara manual

Perintah artisan sebelumnya akan membuat sebuah class baru di `app/Jobs/` dengan nama `AcceptAllRegistration.php`. Kelas ini hanya mempunyai satu fungsi utama, fungsi `handle()` dan fungsi constructor. Semua process queue job biasanya kita tulis di fungsi `handle()` dan fungsi `__construct()` biasanya kita gunakan untuk menyiapkan data yang akan diproses oleh job.

## Persiapan Data

Kita akan menambahkan satu kolom baru ditabel `users` yaitu kolom dengan nama `is_active` untuk menandakan bahwa pengguna yang mendaftar sudah diterima atau belum. Kolom is active akan bertype tiny integer dengan constraint nya 1, kolom ini hanya akan menyimpan data 0 atau 1, 0 kalau pendaftarannya belum diterima dan 1 satu kalau pendaftarannya sudah diterima.

Membuat migration untuk menambahkan kolo, baru ke tabel `users`

```
php artisan make:migration add_column_to_users_table --table=users
```

Kemudian buka file migration yang baru dibuat dan tambah kolom baru

```
    ...

    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->tinyInteger('is_active');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('is_active');
        });
    }

    ...
```
dan jangan lupa untuk menambahkan kolom baru ke model `User` 

```
    ...
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_active'
    ];
    ...
```

terkahir jalan migrasi untuk menambahkan kolom, didatabase

```
php artisan migrate
```

### Menambahkan data dummy

Data dummy bisa ditambahkan manual atau bisa menggunakan faker, contoh selanjutnya adalah menggunakan faker

```
// file: database/factories/UserFactory.php
<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'is_active' => 0,
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
```

```
// file: database/seeders/DatabaseSeeder.php

<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         \App\Models\User::factory(10000)->create();
    }
}
```

```
php artisan migrate:fresh --seed
```

Jika tahapan diatas berhasil diajalankan maka sekarang kita sudah punya 10000 user yang belum diterima pendaftarannya.

## Menajalankan Job
Jadi, proses job yang kita buat ini adalah proses untuk mengubah angka 0 menjadi 1 di kolom `is_active` pada tabel `users`. Jika kita menjalankan proses ini melalui request browser biasa tentu hal ini akan membuat loading atau response dari server menjadi lama karena ada proses yang besar dijalankan. Disinilah queue berperan penting, kita bisa menjalankan proses update ini secara asyncronous (belakang layar) dengan membuat satu job khusus untuk proses pengupdatenya.

Pada fungsi `handle()` di job `AcceptAllRegistration` kita akan menambahkan kode

```
    ...
    
        $users = \App\Models\User::all();

        foreach ($users as $user) {
            if ((int)$user->is_active !== 1) {
                \App\Models\User::find($user->id)->update([
                    'is_active' => 1
                ]);
            }
        }
    ...
```

Untuk menjalankan job kita akan memanfaatkan clousure function di routing, walaupun cara terbaiknya adalah menulis di controller

```
// file: routes/web.php
...
Route::get('/', function () {
    \App\Jobs\AcceptAllRegistration::dispatch();

    echo "success";
});
..

```

Jika sudah keluar tulisan `success` di browser kita bisa menjalan worker untuk mengeksekusi job

```
php artisan queue:work
```

## Referensi
1. [https://laravel.com/docs/9.x/queues](https://laravel.com/docs/9.x/queues)