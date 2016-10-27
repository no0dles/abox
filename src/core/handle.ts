import {IFilter} from "./filter";
import {Observable} from "rxjs";
import {ICallback} from "./callback";
import {IContext} from "./context";

export class Handle<TContext extends IContext> {
  constructor(
    protected contextFactory: { new(scope: any): TContext },
    protected filters: IFilter[],
    protected callbacks: ICallback<any, TContext, any>[]) { }

  private filter(data: any, scope: any): Observable<boolean> {
    return Observable
      .from(this.filters)
      .flatMap(filter => {
        const res = filter(data, scope);
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

  public emit(data: any, scope: any): Observable<any> {
    return this.filter(data, scope)
      .flatMap(result => {
        if(!result) {
          return Observable.empty();
        }

        return Observable
          .from(this.callbacks)
          .flatMap(callback => {
            const context = new this.contextFactory(scope);
            callback(data, context);
            return context.result;
          });
      });
  }
}
