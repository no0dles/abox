import {Observable} from "rxjs/Observable";
import {KeyFilter} from "./key.filter";
import {Module} from "../core/module";
import {HandleFactory} from "../core/handle.factory";
import {Type} from "./type";
import {MetadataStore} from "./metadata.store";
import {IAction} from "./action";

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
    let action: IAction<any> = { data: {}, metadata: {} };

    if(typeof actionOrKey === "string") {
      action.data = dataOrScope;
    } else {
      scope = dataOrScope;
      action.data = actionOrKey;
    }

    action.metadata = this.metadata.resolve(actionOrKey);

    if(!scope) {
      scope = {};
    }

    return this.module.emit(action, scope);
  }

  public on<TAction, TScope, TMetadata>(actionOrKey: Type<TAction> | string): HandleFactory<TAction, TScope, TMetadata> {
    let key;

    if(typeof actionOrKey === "string") {
      key = actionOrKey;
    } else {
      key = this.metadata.store(actionOrKey.prototype);
    }

    return this.module.on(KeyFilter.create(key));
  }
}
