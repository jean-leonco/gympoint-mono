# Overview

GymPoint-api is node application, who uses [Adonis](https://adonisjs.com/). This API works as the core of GymPoint [web](https://github.com/jean-leonco/gympoint-web) and [mobile](https://github.com/jean-leonco/gympoint-mobile).

## Table of contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
- [Running](#running)
  - [Configuration](#configuration)
  - [Server](#server)
  - [Tests](#tests)
- [Debug](#debug)

## Getting Started

Choose a folder to save the project and clone the repository:

```sh
git clone https://github.com/jean-leonco/gympoint-api
```

### Prerequisites

Ensure you have the following resources to run properly the api:

- [Node](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/) or npm
- [Adonis CLI](https://adonisjs.com/docs/4.1/installation#_installing_adonisjs)
- Postgres
- Redis
- Email server

> You can either have the databases running in containers or directly in your machine\
> If you just want to test and don't have an e-mail server, try to create on at [mailtrap](https://mailtrap.io)

### Installing

Access the project folder in your terminal and run `yarn install` or `npm install`:

- Copy the .env.example file to the same directory and rename to .env
- Replace the .env information with your credentials

## Running

The server comes with some features like the http server, queue for jobs and tests.

## Configuration

First off all you need to run database migrations `adonis migration:run --seed`.

## Server

Meetapp-api will need two terminal tabs to works. In one of them, run `adonis serve`. And in the other, run `adonis kue:listen`.

### Tests

To run the tests, use `adonis test` and for coverage report, use `yarn coverage` or `npm coverage`.

## Debug

You can use a tool like [Insomnia](https://insomnia.rest) to debug API or you can use the [web](https://github.com/jean-leonco/gympoint-web)/[mobile](https://github.com/jean-leonco/gympoint-mobile) GymPoint
