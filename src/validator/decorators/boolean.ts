import {ValidatorDecoratorFactory} from "../validator.decorator.factory";

export function Boolean(message?: string): Function {
  return ValidatorDecoratorFactory.create({
    message: message || '{field} is not a valid boolean',
    validate: (data: any) => {
      return typeof data === "boolean" || data === null || data === undefined;
    }
  });
}
