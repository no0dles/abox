import {ActionModule} from "../action/action.module";
import {HttpRequest} from "./actions";
import {Required} from "../validator/decorators/required";
import {Key} from "../action/key.decorator";

const api = new ActionModule();


@Key("demo.echo")
class DemoEcho {
  @Required()
  message: string;
}

api.on(DemoEcho).do((data, context) => {
  console.log(data);
  context.emit("demo.echo.response", { message: data.message }).done();
});

api.on(HttpRequest).do((data, context) => {
  console.log(data.body);
  for(let action of data.body.actions) {
    context.emit(action.key, action.data);
  }

  context.done();
});

export = api;
