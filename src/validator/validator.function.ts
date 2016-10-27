export interface IValidatorFunction<TValue> {
  message: string;
  validate(data: TValue): boolean;
}
