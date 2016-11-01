import {Api} from "../core/api/api";
import {HttpRequest} from "./actions";
import {Required} from "../validator/decorators/required";
import {Key} from "../core/decorator/key.decorator";
import {Context} from "../core/context/context";

const api = new Api();


@Key("demo.echo")
class Echo {
  @Required()
  public message: string;
}

@Key("demo.echo.response")
class DemoEchoResponse {
  constructor(@Required() public message: string) {

  }
}

api.on(Echo).do((data, context) => {
  context.emit(new DemoEchoResponse(data.message)).done();
});

api.on(HttpRequest).do((data, context: Context<any>) => {
  for(let action of data.body.actions) {
    context.emit(action.key, action.data);
  }

  context.done();
});

export = api;
