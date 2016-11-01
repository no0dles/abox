import {Observable} from "rxjs/Observable";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {MetadataStore} from "../api/metadata.store";
import {IAction} from "./action";

export interface IContext<TScope> {
  scope: TScope;
  result: Observable<IAction<any>>;
  emit(action: any): IContext<TScope>;
  done(err?: any): void;
}

export class Context<TScope> {
  protected subject: ReplaySubject<IAction<any>>;

  public readonly scope: TScope;

  constructor(private metadata: MetadataStore, scope: TScope) {
    this.scope = scope;
    this.subject = new ReplaySubject<IAction<any>>();
  }

  public get result(): Observable<IAction<any>> {
    return this.subject;
  }

  public emit(key: string, data: any): Context<TScope>;
  public emit(action: any): Context<TScope>;
  public emit(actionOrKey: any | string, data?: any): Context<TScope> {
    const metadata = this.metadata.resolve(actionOrKey);

    this.subject.next({
      data: typeof actionOrKey === "string" ? data : actionOrKey,
      metadata: metadata
    });

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
