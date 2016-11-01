import {IValidator} from "./validator.function";

export interface IValidatorMetadata {
  validators: { [propertyKey: string]: IValidator<any>[] };
}
