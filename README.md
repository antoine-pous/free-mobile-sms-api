Free Mobile SMS API
============
[![Codecov Coverage](https://img.shields.io/codecov/c/github/antoine-pous/free-mobile-sms-api/master.svg?style=flat-square)](https://codecov.io/gh/antoine-pous/free-mobil-sms-api/)

This package let you send SMS to your Free Mobile number using the official API.

## Requirements
1. You need an activated Free Mobile phone number
2. The option "Notifications par SMS" must be activated on the [account settings page](https://mobile.free.fr/moncompte/index.php?page=options)

## Installation
Using yarn:
```
yarn add free-mobile-sms-api
```

Using NPM
```
npm install free-mobile-sms-api
```

## Requirements
Setting up environment variables:

| Variable | Description |
|---|---|
| `FREE_MOBILE_SMS_API_USER` | Your user account ID, it's your login on Free Mobile website |
| `FREE_MOBILE_SMS_API_PASSWORD` | The key provided in your [account settings page](https://mobile.free.fr/moncompte/index.php?page=options) |

## Usage
Firstly you need to instantiate the package
```ts
import {freeMobileSmsApi} from "free-mobile-sms-api" 
const sms: FreeMobileSmsApi = new FreeMobileSmsApi()
```
then you can:


Send instantly a message
```ts
sms.send("Hello world!").then(console.log).catch(console.error)
```

Queue your messages to ensure to deliver them in the right order.
Queueing a message return the queued message internal UUID
```ts
const smsId: string = sms.queueMessage("Hello world!")
```

You can also queue many messages at once:
```ts
const smsId: string = sms.queueMessages([
  "Hello world! 1/3"
  , "Hello world! 2/3"
  , "Hello world! 3/3"
])
```

You can remove any queued element until it were sent
```ts
sms.remove(smsId);
```

You can get the full list of queued sms too
```ts
freeMobileSmsApi.entries();
// [[id, message],[id, message]...]
```

### Codes:
- 200 Success
- 400 One of needed parameters is missing or incorrect
- 402 Too many requests sent, please wait few time
- 403 Access denied, check your credentials
- 500 SMS API got an internal error, try again later

## Disclaimer
This package doesn't use a complex queue mechanism for one reason, Free Mobile provide this feature for a fair usage, you're not supposed
to spam their API during the whole days with thousands queries.

For my own usage i rarely reach 50 SMS/day with some batches of 15-20 messages sent if few seconds, everything run smooth.
I never encountered a `402` error since 7 years I'm using it.