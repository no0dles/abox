import {Handle} from "./handle";
import {Observable} from "rxjs";
import {HandleFactory} from "./handle.factory";
import {IFilter} from "./filter";
import {MetadataStore} from "../action/metadata.store";

export class Module {
  protected handles: Handle[];

  constructor(protected metadata: MetadataStore) {
    this.handles = [];
  }

  public use(module: Module): void {
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

  public on<TData>(filter: IFilter): HandleFactory<TData, any> {
    const factory = new HandleFactory(this.metadata);

    factory.callback = (handle) => {
      this.handles.push(handle);
    };

    return factory.where(filter);
  }
}
