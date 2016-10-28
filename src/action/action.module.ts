import {Observable} from "rxjs/Observable";
import {KeyFilter} from "./key.filter";
import {IActionScope} from "./action.scope";
import {Module} from "../core/module";
import {HandleFactory} from "../core/handle.factory";
import {Type} from "./type";
import {MetadataStore} from "./metadata.store";

export class ActionModule {
  protected module: Module;
  protected metadata: MetadataStore;

  constructor() {
    this.metadata = new MetadataStore();
    this.module = new Module(this.metadata);
  }

  use(actionModule: ActionModule) {
    this.module.use(actionModule.module);
    this.metadata.use(actionModule.metadata);
  }

  public emit(key: string, data: any, scope?: any): Observable<any>;
  public emit(action: any, scope?: any): Observable<any>;
  public emit(actionOrKey: any | string, dataOrScope?: any, scope?: any): Observable<any> {
    let key: string, data: any;

    if(typeof actionOrKey === "string") {
      data = dataOrScope;
    } else {
      scope = dataOrScope;
      data = actionOrKey;
    }

    if(!scope) {
      scope = {};
    }

    let resolve = this.metadata.resolve(actionOrKey);

    scope["key"] = resolve.key;
    scope["metadata"] = resolve.metadata;

    return this.module.emit(data, scope);
  }

  public on<TAction>(actionOrKey: Type<TAction> | string): HandleFactory<TAction, IActionScope<any>> {
    let key;

    if(typeof actionOrKey === "string") {
      key = actionOrKey;
    } else {
      key = this.metadata.store(actionOrKey);
    }

    return this.module.on(KeyFilter.create(key));
  }
}
