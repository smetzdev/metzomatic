# Metzomatic

[NestJS](https://nestjs.com/) based application for handling automations specific to all my personal domains.
I used this to try out the NestJS framework.

## Installation

```bash
$ npm install
```

## Env Vars

Following env vars are expected (can be loaded via a root .env file)

```bash
TOGGL_API_TOKEN # Needed for authorizing any TogglAPI call
TOGGL_WORKSPACE_ID # For use in any TogglAPI call
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Swagger Documentation

You can view a documentation about all endpoints while visiting `/api`
