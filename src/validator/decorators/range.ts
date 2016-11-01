import {ValidatorDecoratorFactory} from "../validator.decorator.factory";

export function Range(min?: number, max?: number, message?: string): Function {
  return ValidatorDecoratorFactory.create({
    message: message || '{field} is not in range',
    validate: (data: number) => {
      if(data === null || data === undefined) {
        return true;
      }

      if(min !== null && min !== undefined && data < min) {
        return false;
      }

      if(max !== null && max !== undefined && data > max) {
        return false;
      }

      return true;
    }
  });
}
