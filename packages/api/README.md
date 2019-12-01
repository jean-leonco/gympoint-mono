# Table of contents

- [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
  - [Running](#running)
    - [Configuration](#configuration)
    - [Server](#server)
    - [Tests](#tests)
  - [Debug](#debug)

## Getting Started

### Prerequisites

Ensure you have the following resources to run properly the api:

- [Node](https://nodejs.org/en/)
- [Adonis CLI](https://adonisjs.com/docs/4.1/installation#_installing_adonisjs)
- Postgres
- Redis
- Email server

> You can either have the databases running in containers or directly in your machine\
> If you just want to test and don't have an e-mail server, try to create on at [Mailtrap](https://mailtrap.io)

## Running

The server comes with some features like the http server, queue for jobs and tests.

### Configuration

First off all, copy the .env.example file to the same directory and rename to .env. Replace the .env information with your credentials

Then you need to run database migrations `adonis migration:run --seed`.

### Server

To run the server in development mode, run `adonis server --dev`. To run in production mode, run `yarn start` or `npm start`.

### Tests

To run the tests, use `yarn test` or `npm test` and for coverage report, use `yarn coverage` or `npm coverage`.

## Debug

You can use a tool like [Insomnia](https://insomnia.rest) to debug API or you can use the [web](https://github.com/jean-leonco/gympoint-mono/tree/master/packages/web)/[mobile](https://github.com/jean-leonco/gympoint-mono/tree/master/packages/mobile) GymPoint
