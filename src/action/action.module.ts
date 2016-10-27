import {Observable} from "rxjs/Observable";
import {KeyFilter} from "./key.filter";
import {ReflectionUtil} from "./reflection.util";
import {IActionScope} from "./action.scope";
import {Module} from "../core/module";
import {HandleFactory} from "../core/handle.factory";
import {Type} from "./type";
import {ActionContext} from "./action.context";

export class ActionModule {
  protected module: Module<ActionContext>;
  protected metadata: { [key: string]: any };

  constructor() {
    this.module = new Module<ActionContext>(ActionContext);
    this.metadata = {};
  }

  use(actionModule: ActionModule) {
    this.module.use(actionModule.module);
    for(let key in actionModule.metadata) {
      this.metadata[key] = actionModule.metadata[key];
    }
  }

  public emit(key: string, data: any, scope?: any): Observable<any>;
  public emit(action: any, scope?: any): Observable<any>;
  public emit(actionOrKey: any | string, dataOrScope?: any, scope?: any): Observable<any> {
    let key: string, data: any;

    if(typeof actionOrKey === "string") {
      key = actionOrKey;
      data = dataOrScope;
    } else {
      scope = dataOrScope;
      key = ReflectionUtil.getMetadata<string>(actionOrKey, "key");
      data = actionOrKey;
    }

    if(!scope) {
      scope = {};
    }

    scope["key"] = key;
    scope["metadata"] = this.metadata[key];

    return this.module.emit(data, scope);
  }

  public on<TAction>(actionOrKey: Type<TAction> | string): HandleFactory<TAction, ActionContext, IActionScope<any>> {
    if(typeof actionOrKey === "string") {
      return this.module.on(KeyFilter.create(actionOrKey));
    } else {
      const key = ReflectionUtil.getMetadata<string>(actionOrKey, "key");
      const metadata = ReflectionUtil.getMetadata(actionOrKey);

      this.metadata[key] = metadata;

      return this.module.on(KeyFilter.create(key));
    }
  }
}
