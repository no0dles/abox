import {Observable} from "rxjs/Observable";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {MetadataStore} from "../action/metadata.store";
import {IContextResult} from "./context.result";

export class Context<TScope> {
  protected subject: ReplaySubject<IContextResult>;

  public readonly scope: TScope;

  constructor(private metadata: MetadataStore, scope: TScope) {
    this.scope = scope;
    this.subject = new ReplaySubject<IContextResult>();
  }

  public get result(): Observable<IContextResult> {
    return this.subject;
  }


  public emit(key: string, data: any): Context<TScope>;
  public emit(action: any): Context<TScope>;
  public emit(actionOrKey: any | string, data?: any): Context<TScope> {
    const resolve = this.metadata.resolve(actionOrKey);

    this.subject.next({
      key: resolve.key,
      data: typeof actionOrKey === "string" ? data : actionOrKey,
      metadata: resolve.metadata
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
