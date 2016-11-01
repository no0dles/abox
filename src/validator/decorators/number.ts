import {ValidatorDecoratorFactory} from "../validator.decorator.factory";

export function Number(min?: number, max?: number, message?: string): Function {
  return ValidatorDecoratorFactory.create({
    message: message || '{field} is not a valid number',
    validate: (data: string) => {
      return typeof data === "number" || data === null || data === undefined;
    }
  });
}
