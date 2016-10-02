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
    if(key === null || key === undefined) return false;

    if(this.key === key) return true;
    if(this.key === "**") return true;

    const parts = this.key.split(".");
    const matches = key.split(".");

    let index = 0;
    let matchIndex = 0;

    let currentPart = parts[index];
    let nextPart = false;

    for(; matchIndex < matches.length; matchIndex++) {
      let currentMatch = matches[matchIndex];

      if(nextPart) {
        nextPart = false;
        currentPart = parts[++index];

        if(currentPart === undefined)
          return false;
      }

      if(currentPart === "*") {
        nextPart = true;
      } else if(currentPart === "**") {
        if(parts[index+1] === matches[matchIndex+1]) {
          nextPart = true;
        } else if(parts[index+1] === "**") {
          nextPart = true;
        }
      } else {
        if(currentMatch !== currentPart) {
          return false;
        }

        nextPart = true;
      }
    }

    if(parts.length > index + 1) {
      return false;
    }

    return true;
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
