---
title: "Adonisjs CRUD"
date: 2022-09-17T19:02:23+07:00
draft: false
tags: ['Foo', 'Bar']
summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua"
---


## Membuat Projek

```
npm init adonis-ts-app@latest crud
```

Lengkapi data projek

```
     _       _             _         _ ____
    / \   __| | ___  _ __ (_)___    | / ___|
   / _ \ / _` |/ _ \| '_ \| / __|_  | \___ \
  / ___ \ (_| | (_) | | | | \__ \ |_| |___) |
 /_/   \_\__,_|\___/|_| |_|_|___/\___/|____/



CUSTOMIZE PROJECT
❯ Select the project structure · web
❯ Enter the project name · crud
❯ Setup eslint? (y/N) · true
❯ Setup prettier? (y/N) · true
❯ Configure webpack encore for compiling frontend assets? (y/N) · true

RUNNING TASKS
❯ Scaffold project 58 ms
❯ Install dependencies
  [ wait ]  eslint, eslint-plugin-adonis, prettier, and 8 others (dev)   .
❯ Configure installed packages
❯ Configure webpack encore
```

### Install Bootstrap (Opsional)

```
npm install bootstrap
```

Ubah `resources/js/app.js`

```
// import '../css/app.css'
import 'bootstrap/dist/css/bootstrap.css';
```

### Template

Buat file baru di `resources/views/layouts/main.edge`

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AdonisJS - CRUD</title>
  <link rel="stylesheet" href="http://127.0.0.1:8080/assets/app.css" />
</head>
<body>
  <nav class="navbar navbar-expand-lg bg-light border-bottom">
    <div class="container">
      <a class="navbar-brand" href="/">AdonisJS CRUD</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="{{ route('categories.index') }}">Categories</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Post</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container mt-3">
    @!section('content')
  </div>
</body>
</html>
```

### Menghubungkan ke database

Install depedency

```
npm i @adonisjs/lucid
```

Konfigurasi database

```
 ➜  crud node ace configure @adonisjs/lucid
❯ Select the database driver you want to use …  Press <SPACE> to select
◯ SQLite
◯ MySQL / MariaDB
◯ PostgreSQL
◯ OracleDB
◯ Microsoft SQL Server
```

Pilih `MySQL / MariaDB` dan ubah file `.env`

```
DB_CONNECTION=mysql
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_DB_NAME=adoniscrud
```

## Setup Migrasi dan Model

Table `categories`

```
node ace make:model  Category -m
```

Migrasi table `categories`

```
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'categories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
```

Model `Category`

```
import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
```

Install `mysql2`

```
npm install mysql2 --save
```

Jalankan migrasi

```
node ace migration:run 
```

## Controller Kategori

Perintah membuat controller

```
node ace make:controller Category -r
```

Ubah file controller 

```
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Category from 'App/Models/Category'


export default class CategoriesController {
  public async index({view}: HttpContextContract) {
    const categories = await Category.all();
    return view.render('category/index', {
      categories
    })
  }

  public async create({view}: HttpContextContract) {
    const category = {
      name: ''
    }

    return view.render('category/create', {
      category
    })
  }

  public async store({request, response, session}: HttpContextContract) {
    const newCategorySchema = schema.create({
      name: schema.string(),
    })
    const payload = await request.validate({ schema: newCategorySchema })

    await Category.create({
      name: payload.name
    })

    session.flash('success', 'Category created')
    return response.redirect().toRoute('categories.index');
  }

  public async edit({view, params}: HttpContextContract) {
    const category = await Category.findOrFail(params.id)

    return view.render('category/edit', {
      category
    })
  }

  public async update({params, request, response, session}: HttpContextContract) {
    const newCategorySchema = schema.create({
      name: schema.string(),
    })
    const payload = await request.validate({ schema: newCategorySchema })

    const category = await Category.findOrFail(params.id)
    category.name = payload.name
    await category.save()

    session.flash('success', 'Category updated')
    return response.redirect().toRoute('categories.index')
  }

  public async destroy({response, params, session}: HttpContextContract) {
    const category = await Category.findOrFail(params.id)
    await category.delete()

    session.flash('success', 'Category deleted')
    return response.redirect().toRoute('categories.index')
  }
}
```

## Views Kategori

Views kategori akan dipecah menjadi:
1. `resources/views/category/index.edge`
2. `resources/views/category/create.edge`
3. `resources/views/category/edit.edge`
4. `resources/views/category/_form.edge`

File `resources/views/category/index.edge`

```
@layout('layouts/main')

@section('content')

  <h3>Categories</h3>

  <div class="text-end my-3">
    <a href="{{ route('categories.create') }}" class="btn btn-primary"><b>Add</b></a>
  </div>

  @if(flashMessages.has('success'))
    <div class="alert alert-success">
      {{ flashMessages.get('success') }}
    </div>
  @end

  @each(category in categories)
    <div class="card mb-3">
      <div class="card-body">
        <h3><a href="{{ route('categories.edit', category) }}">{{ category.name }}</a></h3>
        <div>
          <small class="text-muted"><i>{{ category.createdAt.toISODate() }}</i></small>
        </div>
      </div>
    </div>
  @endeach

@end
```

File `resources/views/category/create.edge`

```
@layout('layouts/main')

@section('content')

  <h3>Add Category</h3>
  <hr>
  <form action="{{ route('categories.store') }}" method="POST">

    @include('category/_form')

    <div class="mb-3">
      <button class="btn btn-primary"><b>Save</b></button>
      <a href="{{ route('categories.index') }}" class="btn btn-default"><b>Cancel</b></a>
    </div>

  </form>
@end
```

File `resources/views/category/edit.edge`

```
@layout('layouts/main')

@section('content')

  <h3>Edit Category</h3>
  <hr>
  <form action="{{ route('categories.update', category) }}?_method=PUT" method="POST">

    @include('category/_form')

    <div class="mb-3">
      <button class="btn btn-primary"><b>Save</b></button>
      <a href="{{ route('categories.index') }}" class="btn btn-default"><b>Cancel</b></a>
    </div>

  </form>

  <hr>

  <div class="mt-2">
    <form action="{{ route('categories.destroy', category) }}?_method=DELETE" method="POST">
      <button class="btn btn-danger" type="submit" onclick="return confirm('Are you sure to delete this data?')"><b>Delete</b></button>
    </form>
  </div>

@end
```

File `resources/views/category/_form.edge`

```
<div class="mb-3">
  <label for="name" class="form-label">Category name</label>
  <input type="text" name="name" id="name" class="form-control {{ (flashMessages.has('errors.name')) ? 'is-invalid' : '' }}" value="{{ category.name }}">
  @if(flashMessages.has('errors.name'))
    <small class="invalid-feedback ms-2" role="alert">{{ flashMessages.get('errors.name') }}</small>
  @end
</div>
```

Serta untuk melengkapi kita juga akan mengubah file `resources/views/welcome.edge`

```
@layout('layouts/main')

@section('content')
  <div class="p-5 mb-4 bg-light rounded-3">
      <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold">Custom jumbotron</h1>
        <p class="col-md-8 fs-4">Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to your liking.</p>
        <button class="btn btn-primary btn-lg" type="button">Example button</button>
      </div>
    </div>
    <div class="row align-items-md-stretch">
      <div class="col-md-6">
        <div class="h-100 p-5 text-bg-dark rounded-3">
          <h2>Change the background</h2>
          <p>Swap the background-color utility and add a `.text-*` color utility to mix up the jumbotron look. Then, mix and match with additional component themes and more.</p>
          <button class="btn btn-outline-light" type="button">Example button</button>
        </div>
      </div>
      <div class="col-md-6">
        <div class="h-100 p-5 bg-light border rounded-3">
          <h2>Add borders</h2>
          <p>Or, keep it light and add a border for some added definition to the boundaries of your content. Be sure to look under the hood at the source HTML here as we've adjusted the alignment and sizing of both column's content for equal-height.</p>
          <button class="btn btn-outline-secondary" type="button">Example button</button>
        </div>
      </div>
    </div>
@end
```

## Menghubungkan Controller Kategori Dengan View

View dan controller dihubungkan dengan routing file yang ada di `start/routes.ts`

```
import Route from '@ioc:Adonis/Core/Route'


Route.resource('/categories', 'CategoriesController').except(['show'])
Route.get('/', async ({ view }) => {
  return view.render('welcome')
})
```

Ketika kita mengirim form untuk mengubah dan menghapus data kita perlu men-spoofing Http Method dari POST menjadi PUT/PATCH atau DELETE supaya dikenali oleh controller dengan mengubah konfigurasi di file `config/app.ts`, cari baris kode ` allowMethodSpoofing: false,` dan ubah menjadi  `allowMethodSpoofing: true,`

