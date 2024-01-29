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
 # Needed for authorizing any TogglAPI call
TOGGL_API_TOKEN

 # For use in any TogglAPI call
TOGGL_WORKSPACE_ID

 # Emails are send from this mail-account
GMAIL_USER_EMAILa

 # ClientID of your Google Workspace API Client
GMAIL_CLIENT_ID

 # ClientID of your Google Workspace API Client
GMAIL_CLIENT_SECRET

 # Refresh token for clientId/secret combination use google oAuth Playground
GMAIL_REFRESH_TOKEN

 # (OPTIONAL) Name form the "from" in the email
GMAIL_FROM_NAME

 # Create a Slack App in workspace,
 # give it chat:write/channel:write/im:write permissions, put token here
 # Use the bot token to write as bot, use user token to write as user
SLACK_AUTH_TOKEN

 # Your MemberId in your workspace, this is that your app can send yourself messages
SLACK_USER_ID
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
