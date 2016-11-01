import {IValidatorMetadata} from "./validator.scope";
import {Api} from "../core/api/api";
import {Context} from "../core/context/context";
import {MetadataFilter} from "../core/filters/metadata.filter";
import {Observable} from "rxjs";

export var module = new Api();

module
  .on("**")
  .where(MetadataFilter.has("properties"))
  .do((data: any, context: Context<any>, metadata: IValidatorMetadata) => {

    let result = Observable.empty();

    for(let propertyKey in metadata.validators) {
      const validators = metadata.validators[propertyKey];

      for(let validator of validators) {

        let validation = validator.validate(data[propertyKey], data, context.scope, metadata);
        if(!(validation instanceof Observable)) {
          validation = Observable.of(validation);
        }

        validation.map(valid => {
          if(!valid) {
            let message = validator.message || "";

            message = message.replace("{field}", propertyKey);
            message = message.replace("{value}", data[propertyKey]);

            return message;
          }

          return null;
        });

        result = Observable.merge(validation, result);
      }
    }

    result
      .filter(res => res !== null)
      .toArray()
      .subscribe(errors => {
        if(errors.length === 0) {
          context.done();
        } else {
          context.done(new Error())
        }
      });

  });
