import {IActionCallback} from "./action.callback.interface";
import {Observable} from "rxjs";
import {ActionContext} from "./action.context";
import {Api} from "./api";
import {IActionMetadata} from "./action.metadata.interface";

export class ActionHandle {
  constructor(public key: string,
              public filter: any,
              public callbacks: IActionCallback<any>[]) {

  }

  public test(key: string): boolean {
    //:todo
    return this.key === key || this.key === "*";
  }

  public execute(module: Api, data: any, metadata: IActionMetadata, scope: any): Observable<any> {
    return Observable
      .from(this.callbacks)
      .flatMap(callback => {
        let context = new ActionContext(module, scope);
        let result = callback(context, data, metadata);

        if(result instanceof Observable) {
          return result;
        } else {
          return context.result;
        }
      });
  }
}
