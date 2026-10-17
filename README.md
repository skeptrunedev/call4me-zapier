# call4me for Zapier

[call4me](https://call4.me) phones businesses for you: an AI caller books, reschedules, cancels or asks, follows the call to its outcome, and can patch you in. This is its [Zapier](https://zapier.com) integration, built on the [Zapier Platform CLI](https://docs.zapier.com/platform/build-cli/overview) against the [call4me REST API](https://call4.me/api/openapi.json).

## What it does

| Kind    | Name                   | API                                  |
| ------- | ---------------------- | ------------------------------------ |
| Trigger | Call Finished          | `GET /api/calls` (finished calls)    |
| Action  | Place Call             | `POST /api/calls`                    |
| Action  | Schedule Call          | `POST /api/scheduled-calls`          |
| Action  | Answer Caller Question | `POST /api/calls/{id}/answer`        |
| Action  | Hang Up Call           | `POST /api/calls/{id}/hang-up`       |
| Search  | Find Call              | `GET /api/calls/{id}`                |

Auth is a call4me API key sent as `Authorization: Bearer cb_live_...`, tested with the free `GET /api/balance`. The Category dropdown comes from `GET /api/requirements`. Calls are billed per minute from the account's prepaid balance.

## Develop

```sh
npm install -g zapier-platform-cli
npm install
zapier-platform validate
CALL4ME_API_KEY=cb_live_... npm test   # read-only routes only; never places a call
```

## Deploy

```sh
zapier-platform login
zapier-platform register "call4me"   # first time only
zapier-platform push
```
