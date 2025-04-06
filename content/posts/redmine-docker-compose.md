---
title: "Redmine: Setup Redmine dengan Docker Compose"
date: 2025-03-17T19:54:54+07:00
draft: false
tags: ['Docker', 'Docker Compose', 'Redmine']
summary: "Redmine adalah web-based project management yang bisa menjadi alternatif Jira, Trello, Azure Board, Asana, ataupun project management lainnya"
---

## Docker Compose

```yml
services:

  redmine:
    image: redmine
    restart: always
    ports:
      - 8080:3000
    environment:
      REDMINE_DB_MYSQL: db
      REDMINE_DB_PASSWORD: example
      REDMINE_SECRET_KEY_BASE: supersecretkey
    volumes:
      - ./redmine_data:/usr/src/redmine/files

  db:
    image: mysql:8.0
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: example
      MYSQL_DATABASE: redmine
    volumes:
      - ./mysql_data:/var/lib/mysql
```
