import {ActionModule} from "../action/action.module";
import {MetadataFilter} from "../action/filter";
import {IAuthScope} from "./auth.scope";
import {Context} from "../core/context";

export var module = new ActionModule();

module
  .on("**")
  .where(MetadataFilter.has("auth"))
  .do((data: any, context: Context<IAuthScope>) => {
    context.done();
  });
