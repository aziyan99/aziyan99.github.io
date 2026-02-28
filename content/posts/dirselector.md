+++
title = 'Dirselector'
date = 2024-12-29T07:52:19Z
draft = false
tags = ['Project', 'Go']
FeatureCaption = 'Cover Image for Dirselector'
+++

![GitHub Repo stars](https://img.shields.io/github/stars/aziyan99/dirselector?style=social) ![GitHub forks](https://img.shields.io/github/forks/aziyan99/dirselector?style=social) ![GitHub issues](https://img.shields.io/github/issues/aziyan99/dirselector?style=social)

A simple directory selector written in Golang

<a href="https://github.com/aziyan99/dirselector" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 10px 20px; margin-top: 15px; margin-bottom: 25px; background-color: #28a745; color: white; text-align: center; text-decoration: none; border-radius: 5px; font-weight: bold;">
  View Source on GitHub
</a>

---

## README



`dirselector` is a simple cli app that show directory selector and print the selected
directory into the console.

## Installation

Download the latest release from the release page or clone this repository and build the project using `Make` command. The executeable will be available inside the `build` directory.

To build the dirselector without using `Make`:
```
go build -mod=readonly -ldflags "-s -w" -o .\build\dirselector.exe .\cmd\dirselector\dirselector.go
```

## Usage

```
.\dirselector.exe
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License
[MIT](https://github.com/aziyan99/dirselector/blob/main/LICENSE)

