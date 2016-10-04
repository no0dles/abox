# abox - Api Toolbox
[![Build Status](https://travis-ci.org/no0dles/abox.svg?branch=master)](https://travis-ci.org/no0dles/abox)
[![npm version](https://badge.fury.io/js/abox.svg)](https://badge.fury.io/js/abox)
[![codecov](https://codecov.io/gh/no0dles/abox/branch/master/graph/badge.svg)](https://codecov.io/gh/no0dles/abox)

## Quickstart

### Installation
```
npm install abox --save
```

### Code Example
action.ts
```typescript
import {Action} from "abox";

@Action({ name: "ping" })
export class Ping {
  constructor(public message: string) {

  }
}

@Action({ name: "pong" })
export class Pong {
  constructor(public message: string) {

  }
}
```

app.ts
```typescript
import {Api} from "abox";
import {Ping, Pong} from "./actions";

const api = new Api();

api
  .on(Ping)
  .handle((context, data) => {
    context.done(new Pong(data.message));
  });

api
  .on(Pong)
  .handle((context, data) => {
    console.log("Pong:", data.message);
    context.done();
  });

export = api;
```
