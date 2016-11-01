import {ConfigLoader} from "./config.loader";
import * as express from "express";
import * as bodyParser from 'body-parser';
import * as http from "http";
import * as socketio from "socket.io";
import {HttpRequest} from "../http/actions";
import {IConfig} from "./config";

export class Server {
  private configLoader: ConfigLoader;
  private app: express.Express;
  private server: http.Server;

  constructor(private config: IConfig) {

  }

  start() {
    if(this.config.http.enabled) {
      this.app = express();
      this.app.use(bodyParser.json());


      this.app.post("/emit", (req: express.Request, res: express.Response) => {
        api
          .emit(new HttpRequest(req.headers, req.body))
          .toArray()
          .subscribe(actions => {
            res.json({
              actions: actions.map(action => {
                return {
                  key: action.metadata.key,
                  data: action.data
                };
              })
            });
          });
      });

      this.server = this.app.listen(this.configLoader.config.http.port);

      if(this.config.http.websocket.enabled) {
        var io = socketio(this.server);

        io.on('emit', function () {

        });
      }
    }
  }
}
