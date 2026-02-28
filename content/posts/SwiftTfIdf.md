+++
title = 'Swifttfidf'
date = 2022-01-23T13:22:22Z
draft = false
tags = ['Project', 'Swift']
FeatureCaption = 'Cover Image for Swifttfidf'
+++

![GitHub Repo stars](https://img.shields.io/github/stars/aziyan99/SwiftTfIdf?style=social) ![GitHub forks](https://img.shields.io/github/forks/aziyan99/SwiftTfIdf?style=social) ![GitHub issues](https://img.shields.io/github/issues/aziyan99/SwiftTfIdf?style=social)

An ordinary swift package, have a bunch looping of calculating TFIDF

<a href="https://github.com/aziyan99/SwiftTfIdf" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 10px 20px; margin-top: 15px; margin-bottom: 25px; background-color: #28a745; color: white; text-align: center; text-decoration: none; border-radius: 5px; font-weight: bold;">
  View Source on GitHub
</a>

---

## README



An ordinary swift package, have a bunch looping of calculating TFIDF and of course to ranking words. This package work only with iOS v12 and later because it use tokenizer.

## Take a peek

<br />
<img src="https://i.ibb.co/xjR7yZF/Simulator-Screen-Shot-i-Phone-12-2022-01-23-at-22-17-13.png" alt="ss :v" style="height: 300px;"/>
<br />

## Install

Just install like usual, using swift package manager
1. `File` > `Add Packages...`
2. Paste `https://github.com/aziyan99/SwiftTfIdf` in the search form (top-right)
3. Choose the first one `SwiftTfIdf` with `main` branch

## How to use

Use it like usual, no magic here (magic will be add in the future :v)
1. import the package `import SwiftTfIdf`
2. Instance it `let tfIdf = SwiftTfIdf(text: String, stopWords: [String], topN: Int)`. **text** is the raw text that need to be ranking, **stopWords** the stop words (array of String), and **topN** how much the top words that want to get.
3. Call the `.finalCount()` function to get the results `let results = tfIdf.finalCount()`. The funcion will returning array of dictionary `[(key: String, value: Float)]` with `key` is the words and `value` is ranking value.

## How it works

The calculation happend base on looping and sequentials, splitting the text to a bunch of array of sentences and words, calculate the tf, calculate the df and the tfidf, sorting the results, and ranking it. That means the more words that are processed the longer the execution time. An example of implementation will be adding soon.
<br />
<br />
<img src="https://i.redd.it/4npl9yfg5js11.jpg" alt="https://i.redd.it/4npl9yfg5js11.jpg" style="height: 300px; width:300px;"/>

## Todo

- [ ] Writing the test case
- [ ] Adjust & improving the looping performance
- [ ] Restructuring the code
- [ ] Improve time complexity
- [ ] Adding logo (maybe will make it cool :v)

## Depedencies

1. `NaturalLanguage`
2. `Foundation`

## License

The Swift TF-IDF is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).


