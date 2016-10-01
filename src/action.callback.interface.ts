import {IActionMetadata} from "./action.metadata.interface";
import {Observable} from "rxjs";
import {IActionContext} from "./action.context.interface";

export interface IActionCallback<TAction> {
  (context: IActionContext, data: TAction, metadata?: IActionMetadata): void | Observable<any>;
}
