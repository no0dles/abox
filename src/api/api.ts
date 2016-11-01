import {Observable} from "rxjs/Observable";
import {KeyFilter} from "../filters/key.filter";
import {Module} from "../module/module";
import {HandleFactory} from "../module/handle.factory";
import {Type} from "./type";
import {MetadataStore} from "./metadata.store";
import {IAction} from "../context/action";

export class Api {
  protected module: Module;
  protected metadata: MetadataStore;

  constructor() {
    this.metadata = new MetadataStore();
    this.module = new Module(this.metadata);
  }

  public use(api: Api): void {
    this.module.use(api.module);
    this.metadata.use(api.metadata);
  }

  public emit(data: any, scope?: any): Observable<any> {
    let action: IAction<any> = {
      data: data,
      metadata: this.metadata.resolve(data)
    };

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
