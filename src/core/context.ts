import {Observable} from "rxjs/Observable";
import {ReplaySubject} from "rxjs/ReplaySubject";

export interface IContext {
  scope: any;
  result: Observable<any>
  emit(data: any): any;
  done(err?: any): void;
}

export class Context<TScope> {
  protected subject: ReplaySubject<any>;

  public readonly scope: TScope;

  constructor(scope: TScope) {
    this.scope = scope;
    this.subject = new ReplaySubject<any>();
  }

  public get result(): Observable<any> {
    return this.subject;
  }

  public emit(data: any): Context<TScope> {
    this.subject.next(data);
    return this;
  }

  public done(err?: any): void {
    if(err) {
      this.subject.error(err);
    } else {
      this.subject.complete();
    }
  }
}
