import {ActionModule} from "../action/action.module";
import {HttpRequest} from "./actions";

export const httpModule = new ActionModule();

httpModule.on(HttpRequest).do((data, context) => {
  for(let action of data.body.actions) {
    console.log(action);
  }
});
