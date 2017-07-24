# abox - Api Toolbox

[![Greenkeeper badge](https://badges.greenkeeper.io/no0dles/abox.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/no0dles/abox.svg?branch=master)](https://travis-ci.org/no0dles/abox)
[![npm version](https://badge.fury.io/js/abox.svg)](https://badge.fury.io/js/abox)
[![codecov](https://codecov.io/gh/no0dles/abox/branch/master/graph/badge.svg)](https://codecov.io/gh/no0dles/abox)

## Quickstart

### Installation
```
npm install abox --save
```

### Code Example
messages.ts
```typescript
import {Key} from "abox";

@Key("ping")
export class Ping {
  constructor(public message: string) {

  }
}

@Key("pong")
export class Pong {
  constructor(public message: string) {

  }
}
```

app.ts
```typescript
import {Api} from "abox";
import {Ping, Pong} from "./messages";

const api = new Api();

api
  .on(Ping)
  .do((ping, context) => {
    context
      .emit(new Pong(ping.message))
      .done();
  });

api
  .on(Pong)
  .do((pong, context) => {
    console.log("Pong:", pong.message);
    context.done();
  });

export = api;
```
