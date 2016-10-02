import {Reflection} from "./metadata.reflection";
import {ACTION_METADATA_KEY} from "./consts";
import {IActionMetadata} from "./action.metadata.interface";

export function Action(metadata: IActionMetadata) {
  return function(target: Function) {
    var original = target;

    Reflection.setMetadata(ACTION_METADATA_KEY, original.prototype, metadata);

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
