import {Observable} from "rxjs/Observable";

export interface IFilter {
  (data: any, scope: any, metadata: any): boolean | Observable<boolean>;
}
