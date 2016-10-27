import {ValidatorDecoratorFactory} from "../validator.decorator.factory";

export function Required(message?: string): Function {
  return ValidatorDecoratorFactory.create({
    message: message || '{field} is required',
    validate: (data: any) => {
      return data !== null && data !== undefined;
    }
  });
}
