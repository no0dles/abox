import {Context} from "./context";

export interface ICallback<TData, TScope> {
  (data: TData, context?: Context<TScope>): void;
}
