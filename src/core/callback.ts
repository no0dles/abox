export interface ICallback<TData, TContext, TScope> {
  (data: TData, context?: TContext<TScope>): void;
}
