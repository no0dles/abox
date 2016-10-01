import {Observable} from "rxjs";

export interface IActionContext {
  scope: any;
  result: Observable<any>;
  emit(action: any): void;
  done(err?: any): void;
}
