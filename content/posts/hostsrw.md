+++
title = 'Hostsrw'
date = 2024-12-27T10:11:23Z
draft = false
tags = ['Project', 'Go']
FeatureCaption = 'Cover Image for Hostsrw'
+++

![GitHub Repo stars](https://img.shields.io/github/stars/aziyan99/hostsrw?style=social) ![GitHub forks](https://img.shields.io/github/forks/aziyan99/hostsrw?style=social) ![GitHub issues](https://img.shields.io/github/issues/aziyan99/hostsrw?style=social)

Read and Write windows hosts file

<a href="https://github.com/aziyan99/hostsrw" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 10px 20px; margin-top: 15px; margin-bottom: 25px; background-color: #28a745; color: white; text-align: center; text-decoration: none; border-radius: 5px; font-weight: bold;">
  View Source on GitHub
</a>

---

## README



`hostsrw` is a simple cli app / package that able to read and write windows hosts file.

## Installation

Download the latest release from the release page or clone this repository and build the project using `Make` command. The executeable will be available inside the `build` directory.

To build the hostsrw without using `Make`:
```
go build -mod=readonly -ldflags "-s -w" -o .\build\hostsrw.exe .\cmd\hostsrw\main.go
```

## Usage CLI

```
hostsrw add [entry]        : Add a new entry.
hostsrw rm  [entry]        : Remove an existng entry.
hostsrw exists [entry]     : Determine if entry is exists.
```

## Usage Programmatically
Programmatically/package usage will need elevated admin permission.

```go
allHosts := hostsrw.All()

existsHosts := hostsrw.Exists("foo.local")

hostsrw.Add("foo.local")

hostsrw.Remove("foo.local")
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://github.com/aziyan99/hostsrw/blob/main/LICENSE)

