import {ValidatorDecoratorFactory} from "../validator.decorator.factory";

export function Pattern(pattern: RegExp, message?: string): Function {
  return ValidatorDecoratorFactory.create({
    message: message || '{field} is not in a valid format',
    validate: (data: string) => {
      if(data === null || data === undefined)
        return true;

      return pattern.test(data);
    }
  });
}
