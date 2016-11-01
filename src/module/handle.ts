import {IFilter} from "../filter/filter";
import {Observable} from "rxjs";
import {ICallback} from "../context/callback";
import {Context} from "../context/context";
import {MetadataStore} from "../api/metadata.store";
import {IAction} from "../context/action";

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
