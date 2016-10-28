import {Context} from "./context";

export interface ICallback<TData, TScope, TMetadata> {
  (data: TData, context?: Context<TScope>, metadata?: TMetadata): void;
}
