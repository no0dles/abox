import {ICallback} from "./callback";
import {IFilter} from "./filter";
import {Handle} from "./handle";

export class HandleFactory<TData, TContext, TScope> {
  private filters: IFilter[];

  public callback: (handle: Handle<TContext>) => void;

  constructor(private contextFactory: { new(scope: TScope): TContext }) {
    this.filters = [];
  }

  public where(filter: IFilter): HandleFactory<TData, TContext, TScope> {
    this.filters.push(filter);
    return this;
  }

  public do(...callbacks: ICallback<TData, TContext, TScope>[]): void {
    if(!this.callback) return;

    this.callback(new Handle(this.contextFactory, this.filters, callbacks));
  }
}
