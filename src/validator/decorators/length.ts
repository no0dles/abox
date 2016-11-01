import {ValidatorDecoratorFactory} from "../validator.decorator.factory";

export function Length(min?: number, max?: number, message?: string): Function {
  return ValidatorDecoratorFactory.create({
    message: message || '{field} has invalid length',
    validate: (data: any) => {
      if(data === null || data === undefined) {
        return true;
      }

      if(min !== null && min !== undefined && data.length < min) {
        return false;
      }

      if(max !== null && max !== undefined && data.length > max) {
        return false;
      }

      return true;
    }
  });
}
