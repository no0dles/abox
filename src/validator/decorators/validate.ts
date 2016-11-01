import {ValidatorDecoratorFactory} from "../validator.decorator.factory";
import {IValidatorFunction} from "../validator.function";

export function Validate(callback: IValidatorFunction<any>, message?: string): Function {
  return ValidatorDecoratorFactory.create({
    message: message || '{field} is invalid',
    validate: (value: any, data: any, scope: any, metadata: any) => {
      return callback(value, data, scope, metadata);
    }
  });
}
