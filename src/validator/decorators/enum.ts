import {ValidatorDecoratorFactory} from "../validator.decorator.factory";

export function Enum(values: any[], message?: string): Function {
  return ValidatorDecoratorFactory.create({
    message: message || '{field} has invalid value',
    validate: (data: any) => {
      if(data === null || data === undefined) {
        return true;
      }

      if(values.indexOf(data) === -1) {
        return false;
      }

      return true;
    }
  });
}
