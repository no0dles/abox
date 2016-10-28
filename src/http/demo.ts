import {ActionModule} from "../action/action.module";
import {HttpRequest} from "./actions";

const api = new ActionModule();

api.on(HttpRequest).do((data, context) => {
  console.log(data.body);
  for(let action of data.body.actions) {
    context.emit(action.key, action.data);
  }

  context.done();
});

export = api;
