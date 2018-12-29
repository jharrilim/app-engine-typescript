# Deploying to Google App Engine with Typescript/Node

A guide to get you up and running on the Google App Engine using Typescript targetting Node.

## Table of Contents
- [Deploying to Google App Engine with Typescript/Node](#deploying-to-google-app-engine-with-typescriptnode)
  - [Table of Contents](#table-of-contents)
  - [Lexicon](#lexicon)
  - [Prerequisites](#prerequisites)
  - [Steps to MVP](#steps-to-mvp)
    - [Create an app.yaml](#create-an-appyaml)
    - [Create a Typescript Project](#create-a-typescript-project)
    - [Customize the tsconfig.json](#customize-the-tsconfigjson)
    - [Install Some Project Dependencies](#install-some-project-dependencies)
      - [Dependencies](#dependencies)
      - [Dev Dependencies](#dev-dependencies)
    - [Add NPM Scripts](#add-npm-scripts)
    - [Add Some Code](#add-some-code)
    - [Add .gcloudignore](#add-gcloudignore)
    - [Deploy](#deploy)

## Lexicon
- __.gcloudignore__: files to ignore when uploading to Google Cloud. Uses the same syntax as .gitignore.
- __gcloud__: CLI interface for Google Cloud, [can be obtained here.](https://cloud.google.com/sdk/)
- __app.yaml__: Configuration for your Google Cloud App Engine app. [Reference here.](https://cloud.google.com/appengine/docs/standard/python/config/appref)
- __gcp-build__: Special node script that Google Cloud runs before it calls `npm start`.

## Prerequisites
- Cloud SDK CLI tool installed (gcloud)
- Node installed (10.x+ for this repo)

## Steps to MVP

To deploy to Google App Engine with your Typescript project, use the following steps:

### Create an app.yaml

The app.yaml contains some infrastructure information for your deployment. You may use something like this:

```yaml
runtime: nodejs10
instance_class: F1
automatic_scaling:
  max_instances: 1
```
> Note: as of writing, the only node runtimes supported are `nodejs10` and `nodejs8`.

The settings I have chosen keep me within free tier. [You may customize it to your liking.](https://cloud.google.com/appengine/docs/standard/python/config/appref)


### Create a Typescript Project

Create the inital tsconfig.json to get started with Typescript:

```
tsc --init
```

### Customize the tsconfig.json

We should make a couple modifications to the tsconfig.json. We will want to specify the directory where our code will lie using the `rootDir` field, and we need to specify a directory to output js files to using `outDir`. You may output js beside the ts files by not specifying anything, but that gets a little too messy.

### Install Some Project Dependencies

#### Dependencies

```sh
npm i express
```

#### Dev Dependencies

```sh
npm i -D typescript @types/express
```



### Add NPM Scripts

Your `package.json` should at minimum have these scripts:

```json

"scripts": {
    "start": "node ./dist/index.js",
    "gcp-build": "tsc -p ."
  }
```

> Google Cloud will run your `gcp-build` script if specified, and use `npm start` to run your application.
> Use `gcp-build` to run your Typescript compiler, or use your own build script.
> `npm start` must be able to get into the `index.js` created by `tsc`.

### Add Some Code

Make a src directory:

```sh
mkdir src
```

Then add some basic server code:

```ts
// src/index.ts

import express = require('express');

const port = Number(process.env.PORT) || 8080;

const app = express();
app.enable('trust proxy');


const server = app.use('/', (req, res, next) => {
    res.status(200).send('Hello Google App Engine');
}).listen(port);
```

### Add .gcloudignore

Ignore files you don't want to upload to Google Cloud:

```
.gcloudignore
.git
.gitignore
node_modules/
scripts
dist
```

### Deploy

You may deploy your app to the Google App Engine using the following:

```
gcloud app deploy
```

> Note: For this to work, you had to have gone through the process of installing the Cloud SDK CLI.
> [Instructions for setting up the Cloud SDK can be found here.](https://cloud.google.com/sdk/docs/)