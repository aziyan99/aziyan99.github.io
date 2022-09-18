---
title: "Adonisjs CRUD"
date: 2022-09-17T19:02:23+07:00
draft: false
tags: ['CRUD', 'AdonisJS', 'Framework']
summary: "CRUD adalah salah satu komponen yang biasanya ada dalam sistem informasi atau aplikasi, kita akan membuat CRUD dengan AdonisJS"
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
            <a class="nav-link" href="{{ route('posts.index') }}">Post</a>
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

## Setup Migrasi-Model Kategori dan Post

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

Table `posts`

```
node ace make:model  Post -m
```

Migrasi table `posts`

```
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('category_id').unsigned().references('categories.id').onDelete('CASCADE')
      table.string('title')
      table.string('slug')
      table.text('body')

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

Model `Post`

```
import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public categoryId: number

  @column()
  public title: string

  @column()
  public slug: string

  @column()
  public body: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Category)
  public category: BelongsTo <typeof Category>
}
```

dan setup relasi antar table `categories` dan `posts` dengan one to many relationship.

```
import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Post from './Post' // <-- tambahkan baris

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Post) // <-- tambahkan baris
  public posts: HasMany<typeof Post> // <-- tambahkan baris
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

## CRUD Kategori

### Kontroller kategori

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

### Views Kategori

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

## CRUD Posts

### Kontroller Post

Perintah membuat controller

```
node ace make:controller Post -r
```

Ubah file controller 

```
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import Post from 'App/Models/Post'
import { schema } from '@ioc:Adonis/Core/Validator'
import { string } from '@ioc:Adonis/Core/Helpers'

export default class PostsController {
  public async index({view}: HttpContextContract) {
    const posts = await Post.query().preload('category')

    return view.render('post/index', {
      posts
    })
  }

  public async create({view}: HttpContextContract) {
    const post = {
      title: '',
      body: '',
      categoryId: ''
    }
    const categories = await Category.all()
    return view.render('post/create', {
      post,
      categories
    })
  }

  public async store({request, response, session}: HttpContextContract) {
    const newPostSchema = schema.create({
      title: schema.string(),
      category_id: schema.number(),
      body: schema.string(),
    })
    const payload = await request.validate({ schema: newPostSchema })

    await Post.create({
      title: payload.title,
      slug: string.toSlug(payload.title),
      categoryId: payload.category_id,
      body: payload.body,
    })

    session.flash('success', 'Post created')
    return response.redirect().toRoute('posts.index');
  }

  public async edit({view, params}: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    const categories = await Category.all()

    return view.render('post/edit', {
      post,
      categories
    })
  }

  public async update({params, request, response, session}: HttpContextContract) {
    const newPostSchema = schema.create({
      title: schema.string(),
      category_id: schema.number(),
      body: schema.string(),
    })
    const payload = await request.validate({ schema: newPostSchema })

    const post = await Post.findOrFail(params.id)
    post.title = payload.title
    post.slug = string.toSlug(payload.title)
    post.categoryId = payload.category_id
    post.body = payload.body
    await post.save()

    session.flash('success', 'Post updated')
    return response.redirect().toRoute('posts.index')
  }

  public async destroy({response, params, session}: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    await post.delete()

    session.flash('success', 'Post deleted')
    return response.redirect().toRoute('posts.index')
  }
}
```

### Views Post

Views kategori akan dipecah menjadi:
1. `resources/views/post/index.edge`
2. `resources/views/post/create.edge`
3. `resources/views/post/edit.edge`
4. `resources/views/post/_form.edge`

File `resources/views/post/index.edge`

```
@layout('layouts/main')

@section('content')

  <h3>Posts</h3>

  <div class="text-end my-3">
    <a href="{{ route('posts.create') }}" class="btn btn-primary"><b>Add</b></a>
  </div>

  @if(flashMessages.has('success'))
    <div class="alert alert-success">
      {{ flashMessages.get('success') }}
    </div>
  @end

  @each(post in posts)
    <div class="card mb-3">
      <div class="card-body">
        <h3><a href="{{ route('posts.edit', post) }}">{{ post.title }}</a></h3>
        <div>
          <small class="text-muted d-block"><i>{{ post.createdAt.toISODate() }}</i></small>
          <small class="text-muted d-block"><i>{{ post.category.name }}</i></small>
        </div>
      </div>
    </div>
  @endeach

@end
```

File `resources/views/post/create.edge`

```
@layout('layouts/main')

@section('content')

  <h3>Create Post</h3>
  <hr>
  <form action="{{ route('posts.store') }}" method="POST">

    @include('post/_form')

    <div class="mb-3">
      <button class="btn btn-primary"><b>Save</b></button>
      <a href="{{ route('posts.index') }}" class="btn btn-default"><b>Cancel</b></a>
    </div>

  </form>


@end
```

File `resources/views/post/edit.edge`

```
@layout('layouts/main')

@section('content')

  <h3>Edit Post</h3>
  <hr>
  <form action="{{ route('posts.update', post) }}?_method=PUT" method="POST">

    @include('post/_form')

    <div class="mb-3">
      <button class="btn btn-primary"><b>Save</b></button>
      <a href="{{ route('posts.index') }}" class="btn btn-default"><b>Cancel</b></a>
    </div>

  </form>
  <hr>

  <div class="mt-2">
    <form action="{{ route('posts.destroy', post) }}?_method=DELETE" method="POST">
      <button class="btn btn-danger" type="submit" onclick="return confirm('Are you sure to delete this data?')"><b>Delete</b></button>
    </form>
  </div>

@end
```

File `resources/views/post/_form.edge`

```
<div class="mb-3">
  <label for="title" class="form-label">Title</label>
  <input type="text" name="title" id="title"
    class="form-control {{ (flashMessages.has('errors.title')) ? 'is-invalid' : '' }}"
    value="{{ post.title }}">
  @if(flashMessages.has('errors.title'))
    <small class="invalid-feedback ms-2" role="alert">{{ flashMessages.get('errors.title') }}</small>
  @end
</div>
<div class="mb-3">
  <label for="category_id" class="form-label">Category</label>
  <select name="category_id" id="category_id"
    class="form-select {{ (flashMessages.has('errors.category_id')) ? 'is-invalid' : '' }}">
    @each(category in categories)
      <option value="{{ category.id }}" {{ (category.id === post.categoryId) ? 'selected' : '' }}>{{ category.name }}</option>
    @endeach
  </select>
  @if(flashMessages.has('errors.title'))
    <small class="invalid-feedback ms-2" role="alert">{{ flashMessages.get('errors.title') }}</small>
  @end
</div>
<div class="mb-3">
  <label for="body" class="form-label">Body</label>
  <textarea name="body" id="body"
    class="form-control {{ (flashMessages.has('errors.title')) ? 'is-invalid' : '' }}"
    cols="30" rows="10">{{ post.body }}</textarea>
  @if(flashMessages.has('errors.title'))
    <small class="invalid-feedback ms-2" role="alert">{{ flashMessages.get('errors.title') }}</small>
  @end
</div>
```

Serta untuk melengkapi kita juga akan mengubah file `resources/views/welcome.edge`

```
@layout('layouts/main')

@section('content')
  <div class="p-5 mb-4 bg-light rounded-3">
      <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold">CRUD AdonisJS</h1>
        <p class="col-md-8 fs-4">CRUD example using AdonisJS.</p>
        <a href="{{ route('posts.index') }}" class="btn btn-primary btn-lg" type="button">Posts</a>
      </div>
    </div>
@end
```

## Menghubungkan Controller Kategori dan Post Dengan View

View dan controller dihubungkan dengan routing file yang ada di `start/routes.ts`

```
import Route from '@ioc:Adonis/Core/Route'


Route.resource('/categories', 'CategoriesController').except(['show'])
Route.resource('/posts', 'PostsController').except(['show'])

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})
```


Ketika kita mengirim form untuk mengubah dan menghapus data kita perlu men-spoofing Http Method dari POST menjadi PUT/PATCH atau DELETE supaya dikenali oleh controller dengan mengubah konfigurasi di file `config/app.ts`, cari baris kode ` allowMethodSpoofing: false,` dan ubah menjadi  `allowMethodSpoofing: true,`. 

Untuk melihat hasilnya jalan kan development server dengan perintah `node ace serve --watch` dan buka dihalaman browser `127.0.0.1:3333`.

Source code bisa dilihat di [https://github.com/aziyan99/adonisj-crud-example](https://github.com/aziyan99/adonisj-crud-example)
