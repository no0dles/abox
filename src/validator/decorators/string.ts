import {ValidatorDecoratorFactory} from "../validator.decorator.factory";

export function String(message?: string): Function {
  return ValidatorDecoratorFactory.create({
    message: message || '{field} is not a valid string',
    validate: (data: string) => {
      return typeof data === "string" || data === null || data === undefined;
    }
  });
}
