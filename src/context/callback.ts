import {IContext} from "./context";

export interface ICallback<TData, TScope, TMetadata> {
  (data: TData, context?: IContext<TScope>, metadata?: TMetadata): void;
}
