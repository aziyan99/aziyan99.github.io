+++
date = '2025-07-21T10:44:18+07:00'
draft = false
title = 'Unit Test: Naming Convention Biar Nggak Pusing Sendiri'
locale = "id_ID"
tags = ['Unit Testing', 'PHP', 'Best Practices', 'TDD']
+++

Pernah nggak sih buka *project* lama, trus liat deretan *unit test* yang namanya abstrak kayak password wifi tetangga? `test1`, `test_function_a`, atau yang paling parah: `test_works`. Seriusan, *naming convention* atau aturan penamaan buat *unit testing* itu super krusial.

*Test* yang ditulis dengan baik harusnya bertindak sebagai "dokumentasi hidup" dari kode aplikasi. Kalau ada orang baru (atau kita sendiri 6 bulan dari sekarang) baca nama *test*-nya, mereka harus langsung paham *"Oh, fitur ini tuh kerjanya begini toh"*.

Jadi, mari kita bahas beberapa *naming convention* paling populer yang bisa langsung diimplementasikan. *Brace yourselves!*

## 1. Metode "should"

Ini salah satu *style* penamaan paling klasik dan gampang banget dimengerti. Polanya sederhana: nama *test* selalu diawali dengan kata `test` (kalau *framework*-nya mewajibkan, seperti PHPUnit) lalu diikuti dengan subjek uji coba dan ekspektasi hasilnya (biasanya dengan imbuhan `_should_`).

**Pola:** `test_<MethodName>_should_<ExpectedBehavior>`
**Pola Alternatif:** `test_should_<ExpectedBehavior>_when_<Condition>`

**Contoh:**
```php
public function test_calculateTotal_should_returnZero_when_cartIsEmpty()
{
    // ...
}

public function test_should_throwException_when_emailFormatIsInvalid()
{
    // ...
}

public function test_login_should_redirectUserToDashboard()
{
    // ...
}
```

**Kelebihan:** Sangat natural dibaca kayak kalimat bahasa Inggris biasa.
**Kekurangan:** Kadang namanya bisa jadi panjaaaaaang banget sampai melewati *code margin*.

## 2. Metode Given-When-Then (BDD Style)

Gaya ini diadopsi dari konsep *Behavior-Driven Development* (BDD). Sangat terstruktur dan fokus ke *state* atau skenario dari aplikasi.

**Pola:** `test_given<Preconditions>_when<Action>_then<ExpectedResult>`

**Contoh:**
```php
public function test_givenEmptyCart_whenCalculateTotal_thenReturnZero()
{
    // ...
}

public function test_givenBannedUser_whenAttemptLogin_thenDenyAccess()
{
    // ...
}
```

**Kelebihan:** Strukturnya rigid, jelas, dan maksa kita buat mikirin *state* (Given), aksi (When), sama hasil (Then) sebelum nulis kode *test*-nya.
**Kekurangan:** Sama kayak metode `should`, bisa jadi lumayan panjang. Trus kadang nyari padanan kata yang pas buat `Given` agak *tricky*.

## 3. Format "Return Value - Under Condition" (Roy Osherove's Style)

Dipopulerkan oleh Roy Osherove (penulis buku legendaris *The Art of Unit Testing*). Format ini terdiri dari tiga bagian yang dipisah sama tanda *underscore* (`_`).

**Pola:** `<UnitOfWork>_<StateUnderTest>_<ExpectedBehavior>`

* Catatan: `UnitOfWork` itu method atau *feature* yang dites. `StateUnderTest` itu kondisinya, dan `ExpectedBehavior` itu hasil akhirnya.

**Contoh:**
```php
public function test_CalculateTotal_EmptyCart_ReturnsZero()
{
    // ...
}

public function test_Login_InvalidCredentials_ThrowsAuthenticationException()
{
    // ...
}

public function test_Register_UsernameAlreadyTaken_ReturnsFalse()
{
    // ...
}
```

**Kelebihan:** Sangat ringkas, padat informasi, gampang di-*scan* pake mata pas liat hasil test yang banyak. Biasanya ditulis pakai *PascalCase* biar makin rapi.
**Kekurangan:** Kalau nggak konsisten make format 3-bagian ini, jadinya berantakan. Harus sepakat sama tim dari awal.

## 4. Feature-Specific Naming (Laravel Style)

Kalau sering merhatiin repositori *open-source* modern (termasuk *core* dari Laravel), mereka punya gaya sendiri yang lebih asik dan fokus ke ekspektasinya ketimbang mikirin nama *method*-nya secara harfiah. Namanya biasa ditulis *snake_case* dan selalu dimulai dengan `it_`.

Metode ini sebenarnya turunan dari PEST PHP atau Jest (Javascript) tapi diadaptasi buat PHPUnit. Biar nggak perlu nulis awalan `test_` di nama methodnya, kita bisa tambahin blok anontasi `@test` di atas *function*-nya.

**Pola:** `it_` <kalimat penjelasan aksi>

**Contoh:**
```php
/** @test */
public function it_calculates_total_as_zero_for_empty_carts()
{
    // ...
}

/** @test */
public function it_prevents_banned_users_from_logging_in()
{
    // ...
}

/** @test */
public function it_dispatches_welcome_email_upon_registration()
{
    // ...
}
```

**Kelebihan:** Sangat *fluent* dibacanya. Coba bayangin dibaca sebagai list:
* *it calculates total as zero for empty carts* \
* *it prevents banned users from logging in* \
Berasa baca *spec sheet* (dokumen requirement), kan?

**Kekurangan:** Butuh anotasi `@test` buat jalan di PHPUnit (meskipun ini mah perkara sepele).

## EF_E_KYU(?)

### "Bro, dari 4 itu mana yang paling bagus?"
Nggak ada silver bullet alias "yang paling bener". Semua pilihan itu *valid*, yang penting adalah **konsistensi**. Kalau di awal *project* udah sepakat pakai format Osherove, yaudah sikat terus bentuk muka belakang pakai gaya *underscore*. Jangan dicampur satu file *method* `it_does_something`, eh file sebelahnya `test_Login_Invalid_Fails`. Pusing!

### "Boleh bahasa Indonesia nggak sih nulis test?"
Secara teknis kaga dosa, tapi sangat **nggak direkomendasikan**. *Test* bahasa Indonesia kesannya canggung buat dicerna, contohnya: `test_HitungTotal_KeranjangKosong_KembalikanNol()`. Agak *awkward* kan jadinya?

Pokoknya, rajin-rajin baca *codebase* orang lain (terutama *open-source*) biar bisa ngerasain mana naming convention pelabelan yang paling sreg di hati. *Stay foolish!*

## Referensi
1. [The Art of Unit Testing - Naming Standards](http://osherove.com/blog/2005/4/3/naming-standards-for-unit-tests.html)
2. [PhpUnit documentation](https://phpunit.de/documentation.html)
