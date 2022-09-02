---
title: "Laravel: Setup Laravel Passport"
date: 2022-02-04T21:29:54+07:00
draft: false
tags: ['PHP', 'Laravel', 'Authentication', 'PHP']
---

Laravel Passport provides a full OAuth2 server implementation for your Laravel application in a matter of minutes. Passport is built on top of the League OAuth2 server that is maintained by Andy Millington and Simon Hamp.

<style>
#toc_container {
    background: #f9f9f9 none repeat scroll 0 0;
    border: 1px solid #aaa;
    display: table;
    font-size: 95%;
    margin-bottom: 1em;
    padding: 20px;
    width: auto;
}

.toc_title {
    font-weight: 700;
    text-align: center;
}

#toc_container li, #toc_container ul, #toc_container ul li{
    list-style: outside none none !important;
}
</style>

<div id="toc_container">
<p class="toc_title">Contents</p>
  <ul class="toc_list">
    <li><a href="#requirement">1 Requrements</a></li>
    <li><a href="#nice_to_have">2 Nice to have custom middlewares (optionals)</a>
      <ul>
        <li><a href="#force_json">2.1 Force json request middleware</a></li>
        <li><a href="#cors">2.2. Cors (Cross-origin Resource Sharing)</a></li>
      </ul>
    </li>
    <li><a href="#laravel_passport">3 Setup Laravel Passport</a></li>
    <li><a href="#auth">4 Authentication Controller</a></li>
  </ul>
</div>

<h1 id="requirement">1 Requirements</h1>
Installation prerequisites:
1. PHP 7+, MySQL, and Apache (developers wanting to install all three at once can use XAMPP.)
2. Composer
3. Laravel 7 or above
4. Laravel Passport. Since APIs are generally stateless and do not use sessions, we generally use tokens to keep state between requests. Laravel uses the Passport library to implement a full OAuth2 server we can use for authentication in our API.
5. Postman, cURL, or Insomnia to test the API—this is up to personal preference
6. Text editor of your choice
7. Laravel helpers (for Laravel 6.0 and up)—after installing Laravel and Passport, just run: `composer require laravel/helpers`.
8. Already connected to database

<h1 id="nice_to_have">2 Nice to have custom middlewares (optionals)</h1>
<h2 id="#force_json">2.1 Force json request middleware</h2>
Force convert request to have header of

```
{
  'Accept': 'application/json'
}
```

Generate the middleware using artisan

```
php artisan make:middleware ForceJsonRequestMiddleware
```

Content of `ForceJsonRequestMiddleware.php` in `handle()` function. The file locate at `App/Http/Middleware/ForceJsonRequestMiddleware.php`.

```
  $request->headers->set('Accept', 'application/json');
  return $next($request);
```

Register the middleware to `$routeMiddleware` array at `app/Http/Kernel.php`.

```
'json.response' => \App\Http\Middleware\ForceJsonRequestMiddleware::class,
```

Then, we’ll also add it to the `$middleware` array in the same file:

```
\App\Http\Middleware\ForceJsonRequestMiddleware::class,
```

That would make sure that the ForceJsonRequestMiddleware middleware is run on every request.

<h2 href="#cors">2.2 Cors (Cross-origin Resource Sharing)</h2>
To allow the consumers of our Laravel REST API to access it from a different origin, we have to set up CORS. To do that, we’ll create a piece of middleware called `CorsMiddleware`.

```
php artisan make:middleware CorsMiddleware
```

Update the `handle()` function:

```
    return $next($request)
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Token-Auth, Authorization');
```

Register the middleware to `$routeMiddleware` array at `app/Http/Kernel.php`.

```
'cors' => \App\Http\Middleware\CorsMiddleware::class,
```

Then, we’ll also add it to the `$middleware` array in the same file:

```
\App\Http\Middleware\CorsMiddleware::class,
```

We can use the middlewares in our `api.php` routing like:

```
Route::group(['middleware' => ['cors', 'json.response']], function () {
    // route path...
});
```

<h1 id="laravel_passport">3 Setup Laravel Passport</h1>
Installing passport

```
composer require laravel/passport
```

Migrating the tables

```
php artisan migrate
```

Generate secure access token using artisan

```
php artisan passport:install
```

Updating `User` model

```
<?php

namespace App\Models;

...
use Laravel\Passport\HasApiTokens;  //add the namespace

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;   //use it here
}
```

Registering passport routes to `AuthServiceProvider`, place at `boot()` function

```
if (!$this->app->routesAreCached()) {
  Passport::routes();
}
```

Add passport `TokenGuard` at `config/auth.php`

```
'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'users',
    ],

    'api' => [
        'driver' => 'passport', //update this line
        'provider' => 'users',
    ],
],
```

<h1 id="auth">4 Authentication Controller</h1>
Create controller:

```
php artisan make:controller Api/AuthController
```

At top of the controller don't forget to import used depedencies

```
use Illuminate\Support\Facades\Validator;
```

<h2 id="auth_login">4.1 Login Function</h2>
The `login` function

```
  public function login(Request $request) {
    $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'msg' => $validator->errors()->all(),
                'data' => []
            ], 422);
        }

        $data = $request->only('email', 'password');

        if (!auth()->attempt($data)) {
            return response()->json([
                'success' => false,
                'msg' => 'Invalid email or password',
                'data' => []
            ]);
        }

        $token = auth()->user()->createToken('API Token')->accessToken;
        return response()->json([
            'success' => true,
            'msg' => 'Logged in user data',
            'data' => [
                'profile' => auth()->user(),
                'token' => $token
            ]
        ]);
  }
```

<h2 id="auth_logout">4.2 Logout Function</h2>
The `logout` function:

```
  public function logout(Request $request)
    {
        $token = $request->user()->token();
        $token->revoke();
        return response()->json([
            'success' => true,
            'msg' => 'You have been successfully logged out',
            'data' => []
        ]);
    }
```

<h2 id="auth_route">4.3 Routing</h2>
Last, we can add our routing path to `api.php` file

```
Route::group(['middleware' => ['cors', 'json.response']], function () {
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:api')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});
```


Done!!!!