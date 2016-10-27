import {IValidatorScope} from "./validator.scope";
import {ActionModule} from "../action/action.module";
import {MetadataFilter} from "../action/filter";
import {Context} from "../core/context";

export var module = new ActionModule();

module
  .on("**")
  .where(MetadataFilter.has("properties"))
  .do((data: any, context: Context<IValidatorScope>) => {

    for(let propertyKey in context.scope.metadata.validators) {
      const validators = context.scope.metadata.validators[propertyKey];

      for(let validator of validators) {

        if(!validator.validate(data[propertyKey])) {
          let message = validator.message || "";

          message = message.replace("{field}", propertyKey);
          message = message.replace("{value}", data[propertyKey]);

          context.done(new Error(message));

          return;
        }
      }
    }

    context.done();
  });
