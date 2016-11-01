import {Api} from "../core/api/api";
import {HttpRequest} from "./actions";

export const httpModule = new Api();

httpModule.on(HttpRequest).do((data, context) => {
  for(let action of data.body.actions) {
    console.log(action);
  }
});
