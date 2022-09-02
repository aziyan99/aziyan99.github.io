---
title: "Laravel: Select data diantara dua tanggal"
date: 2022-02-06T21:29:54+07:00
draft: false
tags: ['Laravel', 'PHP', 'Database', 'Model']
---

Mengambil data dari database berdasarkan range tanggal (tanggal awal dan tanggal akhir) di laravel  mudah dilakukan dengan bantuan Eloquent dari laravel (Model). Pengambilan data ini sangat membantu ketika kita ingin membuat laporan dari data atau kebutuhan lainnya yang membutuhkan pengguna bisa mengambil data berdasarkan tanggal.

# Cara pertama (whereBetween)
```php
<?php
  
namespace App\Http\Controllers;
  
use Illuminate\Http\Request;
use App\Models\User;
use Carbon\Carbon;
  
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $startDate = Carbon::createFromFormat('d/m/Y', '01/01/2021');
        $endDate = Carbon::createFromFormat('d/m/Y', '06/01/2021');
  
        $users = User::select('id', 'name', 'email', 'created_at')
                        ->whereBetween('created_at', [$startDate, $endDate])
                        ->get();
        dd($users);
    }
}
```

# Cara kedua (where)
Navigasi ke folder `/var/www/html/` kemudian buat 2 folder baru atau bisa dengan perintah
```php
<?php
  
namespace App\Http\Controllers;
  
use Illuminate\Http\Request;
use App\Models\User;
use Carbon\Carbon;
  
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $startDate = Carbon::createFromFormat('d/m/Y', '01/01/2021');
        $endDate = Carbon::createFromFormat('d/m/Y', '06/01/2021');
  
        $users = User::select('id', 'name', 'email', 'created_at')
                        ->where('created_at', '>=', $startDate)
                        ->where('created_at', '<=', $endDate)
                        ->get();
  
        dd($users);
    }
}
```

# Cara ketiga (whereDate)
```php
?php
  
namespace App\Http\Controllers;
  
use Illuminate\Http\Request;
use App\Models\User;
use Carbon\Carbon;
  
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $startDate = '01/01/2021';
        $endDate = '06/01/2021';
  
        $users = User::select('id', 'name', 'email', 'paid_date')
                        ->whereDate('paid_date', '>=', $startDate)
                        ->whereDate('paid_date', '<=', $endDate)
                        ->get();
  
        dd($users);
    }
}
```

Tentu saja tanggal yang digunakan tidak perlu statis seperti pada contoh. Kita juga bisa menggunakan form inputan yang bertipe date.

Selesai!!!!