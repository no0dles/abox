import {ICallback} from "./callback";
import {IFilter} from "./filter";
import {Handle} from "./handle";
import {MetadataStore} from "../action/metadata.store";

export class HandleFactory<TData, TScope, TMetadata> {
  private filters: IFilter[];

  public callback: (handle: Handle) => void;

  constructor(protected metadata: MetadataStore) {
    this.filters = [];
  }

  public where(filter: IFilter): HandleFactory<TData, TScope, TMetadata> {
    this.filters.push(filter);
    return this;
  }

  public do(...callbacks: ICallback<TData, TScope, TMetadata>[]): void {
    if(!this.callback) return;

    this.callback(new Handle(this.metadata, this.filters, callbacks));
  }
}
