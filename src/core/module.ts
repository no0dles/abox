import {Handle} from "./handle";
import {Observable} from "rxjs";
import {HandleFactory} from "./handle.factory";
import {IFilter} from "./filter";

export class Module<TContext> {
  protected handles: Handle<any>[];

  constructor(private contextFactory: { new(scope: any): TContext }) {
    this.handles = [];
  }

  public use(module: Module<any>): void {
    this.handles.push(...module.handles);
  }

  public emit(data: any, scope?: any): Observable<any> {
    if(!scope) {
      scope = {};
    }

    if(!data) {
      return Observable.throw(new Error("data can not be null or undefined"));
    }

    return Observable
      .from(this.handles)
      .flatMap(handle => {
        return handle.emit(data, scope);
      })
      .flatMap(data => {
        return Observable.merge(this.emit(data, scope), Observable.of(data));
      });
  }

  public on<TData>(filter: IFilter): HandleFactory<TData, TContext, any> {
    const factory = new HandleFactory(this.contextFactory);

    factory.callback = (handle) => {
      this.handles.push(handle);
    };

    return factory.where(filter);
  }
}
