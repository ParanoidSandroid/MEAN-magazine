# Online Magazine

This project was initially developed for the online magazine skra-punk.com.
The base we used was [Mean.js](https://github.com/meanjs/mean).
From there we included:
- Multi-user support
- Administration panel, complete with WYSIWYG html [editor](ckeditor.com)
- Different views based on account access rights
- RESTful API
- Facebook support
- SEO

## Technologies used
- [AngularJS](https://angularjs.org)
- [NodeJS](https://nodejs.org)
- [MongoDB](https://mongodb.org)
- [Express](expressjs.com)

Also we used [Grunt](gruntjs.com) as our developer tool to automate
common tasks (watching files for changes, loading configuration, minifying assets, live reloading).

## How to run
### Clone with git
```bash
git clone https://github.com/ParanoidSandroid/MEAN-magazine.git
```
### Then inside the project folder
Install dependencies with npm:
```bash
npm install
```
Build project with:
```bash
grunt build
```
Run with:
```bash
grunt
```
or
```bash
npm run start
```
