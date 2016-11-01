import {ReflectionUtil} from "../util/reflection.util";

export class DecoratorFactory {
  /*public static property(key: string, value: any): Function {
    return function(target: any, propertyKey: string | symbol) {

      let properties = ReflectionUtil.getMetadata(target, key);

      if(!properties[propertyKey]) {
        properties[propertyKey] = {};
      }

      properties[propertyKey][key] = value;

      ReflectionUtil.setMetadata(target, key, properties);
    }
  }*/

  public static action(key: string, value: any): Function {
    return function(target: Function) {
      var original = target;

      ReflectionUtil.setMetadata(original.prototype, key, value);

      function construct(constructor: any, args: any[]) {

        var c: any = function () {
          return constructor.apply(this, args);
        };

        c.prototype = constructor.prototype;

        return new c();
      }

      var f : any = function (...args: any[]) {
        return construct(original, args);
      };

      f.prototype = original.prototype;

      return f;
    }
  }
}
