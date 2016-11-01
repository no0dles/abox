import {Observable} from "rxjs";

export interface IValidator<TValue> {
  message: string;
  validate: IValidatorFunction<TValue>;
}

export interface IValidatorFunction<TValue> {
  (value: TValue, data?: any, scope?: any, metadata?: any): Observable<boolean> | boolean;
}
