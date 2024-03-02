# SQL Editor

Atlan Interview challenge to build a web-based application capable of running SQL queries and displaying the results of said query.

NOTE: This project uses in-memory database to run the queries. It does not connect to any external database.

## Demo
https://sql-editor-snowy.vercel.app/

## Video Walkthrough
https://www.youtube.com/watch?v=412gWJB9Jx8

## Requirements

[Task Requirements](./requirements.md)

## Features

**Required**

- [x] Query Editor
- [x] Results table
- [x] Export Results into json
- [x] Saved Queries

**Additional**
- [ ] ~~Query History~~
- [x] Table Schema
- [ ] ~~Paginated Results~~
- [ ] ~~Dark Mode~~

## Tech Stack
- React
- Tailwind CSS
- Shadcn Components
- Code Mirror
- alasql - helps in running SQL queries on in-memory database

## Performance
![Lighthouse Insights](/assets/lighthouse.png)

1. With lighthouse report fixed issues with accessibility and best practices
2. Query editor is lazy loaded to improve initial load time

## Installation

Use the following commands to install and run the application

```bash
git clone https://https://github.com/itsmadhusudhan/sql-editor.git
cd sql-editor
pnpm install
pnpm start
```
