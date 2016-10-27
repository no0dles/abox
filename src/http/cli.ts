import * as express from "express";
import * as path from "path";
import * as bodyParser from 'body-parser';
import {ActionModule} from "../action/action.module";
import {HttpRequest} from "./actions";
import {ReflectionUtil} from "../action/reflection.util";

const apiPath = process.argv[2];

if(!apiPath) {
  throw new Error("Pass path to api file");
}

const api = require(path.join(process.cwd(), apiPath)) as ActionModule;

const server = express();

server.use(bodyParser.json());

server.post("/emit", (req: express.Request, res: express.Response) => {
  api
    .emit(new HttpRequest(req.headers, req.body))
    .toArray()
    .subscribe(actions => {
      res.json({
        actions: actions.map(action => {
          return {
            key: ReflectionUtil.getMetadata(action, "key"),
            data: action
          }
        })
      });
    });
});

server.listen(3000);
