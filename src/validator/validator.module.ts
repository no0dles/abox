import {IValidatorMetadata} from "./validator.scope";
import {ActionModule} from "../action/action.module";
import {Context} from "../core/context";
import {MetadataFilter} from "../core/filter";

export var module = new ActionModule();

module
  .on("**")
  .where(MetadataFilter.has("properties"))
  .do((data: any, context: Context<any>, metadata: IValidatorMetadata) => {

    for(let propertyKey in metadata.validators) {
      const validators = metadata.validators[propertyKey];

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
