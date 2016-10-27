import {ActionModule} from "../action/action.module";
import {HttpRequest} from "./actions";

const api = new ActionModule();

api.on(HttpRequest).do((data, context) => {
  for(let action of data.body.actions) {
    console.log(action);
  }

  context.done();
});

export = api;
