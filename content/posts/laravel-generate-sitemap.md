---
title: "Laravel: Membuat Sitemap Secara Dinamis"
date: 2022-02-08T21:29:54+07:00
draft: false
tags: ['Laravel', 'PHP', 'Sitemap']
---

---
Sitemap adalah sebuah file yang memberikan informasi tentang halaman, video, ataupun media apa saja dalam sebuah website. Search engine seperti Google menggunakan sitemap untuk mencari halaman yang dicari pengguna sehingga dengan membuat sitemap untuk website akan sangat membantu supaya google mengindeks website kita.

# How to
- Buat projek laravel baru dengan `laravel new <project-name>` atau `composer create-project laravel/laravel <project-name>`.
- Buat satu database untuk projek laravel yang baru dibuat.
- Buat model dan migration untuk post dengan `php artisan make:model Post -m`.
- Ubah post migration dengan menambahkan kolom `title`, `slug`, dan `body` pada tabel posts.

```php
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug');
            $table->longText('body');
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
}
```

- Lakukan migrasi dengan perintah `php artisan migrate`.
- Buat factory untuk mengenerate dummy data postingan `php artisan make:factory PostFactory --model=Post`. Kemudian isi dengan:

```php
<?php
namespace Database\Factories;
use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
class PostFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Post::class;
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $title = $this->faker->sentence;
        $slug = Str::slug($title);
        return [
            'title' => $title,
            'slug'  => $slug,
            'body'  => $this->faker->paragraph(10) 
        ];
    }
}
```

- Buka tinker melalui terminal `php artisan tinker` dan lakukan perintah `App\Models\Post::factory()->count(10)->create()`. Perintah ini akan membuat 10 postingan dummy.
- Install package `laravel/sitemap` dari `spatie` dengan perintah `composer require spatie/laravel-sitemap`.
- Jalankan perintah `php artisan vendor:publish --provider="Spatie\Sitemap\SitemapServiceProvider" --tag=config` untuk memindahkan file `sitemap.php` kedalam konfigurasi laravel.
- Buka file `web.php` dan buat routing baru

```php
<?php
use Illuminate\Support\Facades\Route;
use App\Models\Post;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function () {
    return view('welcome');
});
Route::get('/sitemap', function(){
    $sitemap = Sitemap::create()
    ->add(Url::create('/about-us'))
    ->add(Url::create('/contact_us'));

    $post = Post::all();
    foreach ($post as $post) {
        $sitemap->add(Url::create("/post/{$post->slug}"));
    }
    $sitemap->writeToFile(public_path('sitemap.xml'));
}); 
```

- Jalankan development server `php artisan serve` dan kunjungi `http://localhost:8000/sitemap.xml` atau `http://localhost:8000/sitemap`.

Tentu saja penulisan sitemap tidak terbatasi hanya bisa di file `web.php` kita juga bisa membuat controller sendiri untuk menghandle sitemap.

Selesai!!!