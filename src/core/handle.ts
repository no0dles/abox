import {IFilter} from "./filter";
import {Observable} from "rxjs";
import {ICallback} from "./callback";
import {Context} from "./context";
import {MetadataStore} from "../action/metadata.store";
import {IAction} from "../action/action";

export class Handle {
  constructor(
    protected metadata: MetadataStore,
    protected filters: IFilter[],
    protected callbacks: ICallback<any, any, any>[]) { }

  private filter(action: IAction<any>, scope: any): Observable<boolean> {
    return Observable
      .from(this.filters)
      .flatMap(filter => {
        const res = filter(action.data, scope, action.metadata);
        if(res instanceof Observable) {
          return res;
        } else {
          return Observable.of(res);
        }
      })
      .takeWhile(res => res)
      .toArray()
      .map(res => {
        return res.length === this.filters.length;
      });
  }

  public emit(action: IAction<any>, scope: any): Observable<any> {
    return this.filter(action, scope)
      .flatMap(result => {
        if(!result) {
          return Observable.empty();
        }

        return Observable
          .from(this.callbacks)
          .flatMap(callback => {
            const context = new Context(this.metadata, scope);
            callback(action.data, context, action.metadata);
            return context.result;
          });
      });
  }
}
