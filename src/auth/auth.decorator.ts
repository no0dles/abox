import {DecoratorFactory} from "../action/decorator.factory";

export interface IAuth {
  users?: string[];
  roles?: string[];
  claims?: string[];
}

export function Auth(auth: IAuth) {
  return DecoratorFactory.action("auth", auth);
}
