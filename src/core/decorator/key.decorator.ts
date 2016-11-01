import {DecoratorFactory} from "./decorator.factory";

export function Key(key: string) {
  return DecoratorFactory.action("key", key);
}
