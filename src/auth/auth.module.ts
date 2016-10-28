import {ActionModule} from "../action/action.module";
import {IAuthScope} from "./auth.scope";
import {Context} from "../core/context";
import {MetadataFilter} from "../core/filter";

export var module = new ActionModule();

module
  .on("**")
  .where(MetadataFilter.has("auth"))
  .do((data: any, context: Context<IAuthScope>) => {
    context.done();
  });
