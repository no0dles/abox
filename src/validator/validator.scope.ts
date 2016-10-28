import {IValidatorFunction} from "./validator.function";

export interface IValidatorMetadata {
  validators: { [propertyKey: string]: IValidatorFunction<any>[] };
}
