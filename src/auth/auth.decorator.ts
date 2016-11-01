import {DecoratorFactory} from "../core/decorator/decorator.factory";
import {IAuthorization} from "./authorization";

export function Auth(auth: IAuthorization) {
  return DecoratorFactory.action("auth", auth);
}
