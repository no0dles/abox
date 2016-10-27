import {IActionScope} from "../action/action.scope";
import {IValidatorFunction} from "./validator.function";

export interface IValidatorMetadata {
  validators: { [propertyKey: string]: IValidatorFunction<any>[] };
}

export interface IValidatorScope extends IActionScope<IValidatorMetadata> {

}
