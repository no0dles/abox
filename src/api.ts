import {IActionCallback} from "./action.callback.interface";
import {Observable} from "rxjs";
import {Type} from "./type.interface";
import {Reflection} from "./metadata.reflection";
import {ActionHandle} from "./action.handle";
import {ACTION_METADATA_KEY} from "./consts";
import {IActionMetadata} from "./action.metadata.interface";
import {IActionContext} from "./action.context.interface";

export class Api {
  protected handles: ActionHandle[];

  constructor() {
    this.handles = [];
  }

  public use(api: Api): void {
    this.handles.push(...api.handles);
  }

  public emit<TAction>(data: TAction, context?: IActionContext): Observable<any> {
    let metadata = Reflection.getMetadata<IActionMetadata>(ACTION_METADATA_KEY, data);

    const scope = {};

    return Observable.from(this.handles)
      .filter(handle => {
        return handle.testKey(metadata.name);
      })
      .filter(handle => {
        return handle.testFilter(data);
      })
      .flatMap(handle => {
        return handle.execute(this, data, metadata, scope);
      })
      .flatMap(action => {
        return Observable.merge(this.emit(action, context), Observable.of(action));
      });
  }

  private handle<TAction>(types: (Type<TAction> | string)[], filter: any, ...callback: IActionCallback<TAction>[]) {
    for(let type of types) {
      if(typeof type === 'string') {
        this.handles.push(new ActionHandle(type, filter, callback));
      } else {
        let metadata = Reflection.getMetadata<IActionMetadata>(ACTION_METADATA_KEY, type.prototype);
        if(!metadata) {
          throw new Error(`Could not find metadata on ${type.prototype}`);
        }
        this.handles.push(new ActionHandle(metadata.name, filter, callback));
      }
    }
  }

  public on<TAction>(...types: (Type<TAction> | string)[]) {
    return {
      where: (filter: any) => {
        return {
          handle: (...callback: IActionCallback<TAction>[]) => {
            return this.handle(types, filter, ...callback);
          }
        };
      },
      handle: (...callback: IActionCallback<TAction>[]) => {
        return this.handle<TAction>(types, null, ...callback);
      }
    }
  }
}
