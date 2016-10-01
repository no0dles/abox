import {Observable, ReplaySubject} from "rxjs";
import {Api} from "./api";
import {Reflection} from "./metadata.reflection";
import {IActionMetadata} from "./action.metadata.interface";
import {ACTION_METADATA_KEY} from "./consts";
import {IActionContext} from "./action.context.interface";


export class ActionContext implements IActionContext {
  private subject: ReplaySubject<any>;

  constructor(private api: Api,
              public scope: any) {
    this.subject = new ReplaySubject<any>();
  }

  get result(): Observable<any> {
    return this.subject;
  }

  emit<TAction>(action: TAction): void {
    let metadata = Reflection.getMetadata<IActionMetadata>(ACTION_METADATA_KEY, action);

    if(metadata.internal) {
      this.api.emit(action, this);
    } else {
      this.subject.next(action);
    }
  }

  done(err?: any): void {
    if(err) {
      if(err instanceof Error) {
        this.subject.error(err);
      } else {
        this.emit(err);
      }
    }

    this.subject.complete();
  }
}
