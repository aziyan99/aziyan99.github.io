---
title: "Laravel: Setup Laravel Passport"
date: 2022-02-04T21:29:54+07:00
draft: false
tags: ['PHP', 'Laravel', 'Authentication']
---

Laravel Passport provides a full OAuth2 server implementation for your Laravel application in a matter of minutes. Passport is built on top of the League OAuth2 server that is maintained by Andy Millington and Simon Hamp.

## 1 Requirements

Installation prerequisites:
1. PHP 7+, MySQL, and Apache (developers wanting to install all three at once can use XAMPP.)
2. Composer
3. Laravel 7 or above
4. Laravel Passport. Since APIs are generally stateless and do not use sessions, we generally use tokens to keep state between requests. Laravel uses the Passport library to implement a full OAuth2 server we can use for authentication in our API.
5. Postman, cURL, or Insomnia to test the API—this is up to personal preference
6. Text editor of your choice
7. Laravel helpers (for Laravel 6.0 and up)—after installing Laravel and Passport, just run: `composer require laravel/helpers`.
8. Already connected to database

## 2 Nice to have custom middlewares (optionals)

### 2.1 Force json request middleware

Force convert request to have header of:

```json
{
  'Accept': 'application/json'
}
```

Generate the middleware using artisan:

```bash
php artisan make:middleware ForceJsonRequestMiddleware
```

Content of `ForceJsonRequestMiddleware.php` in `handle()` function. The file locate at `App/Http/Middleware/ForceJsonRequestMiddleware.php`:

```php
$request->headers->set('Accept', 'application/json');
return $next($request);
```

Register the middleware to `$routeMiddleware` array at `app/Http/Kernel.php`:

```php
'json.response' => \App\Http\Middleware\ForceJsonRequestMiddleware::class,
```

Then, we'll also add it to the `$middleware` array in the same file:

```php
\App\Http\Middleware\ForceJsonRequestMiddleware::class,
```

That would make sure that the ForceJsonRequestMiddleware middleware is run on every request.

### 2.2 Cors (Cross-origin Resource Sharing)

To allow the consumers of our Laravel REST API to access it from a different origin, we have to set up CORS. To do that, we'll create a piece of middleware called `CorsMiddleware`:

```bash
php artisan make:middleware CorsMiddleware
```

Update the `handle()` function:

```php
return $next($request)
    ->header('Access-Control-Allow-Origin', '*')
    ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    ->header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Token-Auth, Authorization');
```

Register the middleware to `$routeMiddleware` array at `app/Http/Kernel.php`:

```php
'cors' => \App\Http\Middleware\CorsMiddleware::class,
```

Then, we'll also add it to the `$middleware` array in the same file:

```php
\App\Http\Middleware\CorsMiddleware::class,
```

We can use the middlewares in our `api.php` routing like:

```php
Route::group(['middleware' => ['cors', 'json.response']], function () {
    // route path...
});
```

## 3 Setup Laravel Passport

Installing passport:

```bash
composer require laravel/passport
```

Migrating the tables:

```bash
php artisan migrate
```

Generate secure access token using artisan:

```bash
php artisan passport:install
```

Updating `User` model:

```php
<?php

namespace App\Models;

use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
}
```

Registering passport routes to `AuthServiceProvider`, place at `boot()` function:

```php
if (!$this->app->routesAreCached()) {
    Passport::routes();
}
```

Add passport `TokenGuard` at `config/auth.php`:

```php
'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'users',
    ],

    'api' => [
        'driver' => 'passport',
        'provider' => 'users',
    ],
],
```

## 4 Authentication Controller

Create controller:

```bash
php artisan make:controller Api/AuthController
```

At top of the controller don't forget to import used depedencies:

```php
use Illuminate\Support\Facades\Validator;
```

### 4.1 Login Function

The `login` function:

```php
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

### 4.2 Logout Function

The `logout` function:

```php
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

### 4.3 Routing

Last, we can add our routing path to `api.php` file:

```php
Route::group(['middleware' => ['cors', 'json.response']], function () {
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:api')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});
```

Done!!!!