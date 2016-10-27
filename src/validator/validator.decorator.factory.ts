import {IValidatorFunction} from "./validator.function";
import {ReflectionUtil} from "../action/reflection.util";

export class ValidatorDecoratorFactory {
  public static create<TValue>(fn: IValidatorFunction<TValue>): Function {
    return function(target: any, propertyKey: string | symbol) {

      let validators = ReflectionUtil.getMetadata(target, "validators") || {};

      if(!validators[propertyKey]) {
        validators[propertyKey] = [];
      }

      validators[propertyKey].push(fn);

      ReflectionUtil.setMetadata(target, "validators", validators);
    }
  }
}
