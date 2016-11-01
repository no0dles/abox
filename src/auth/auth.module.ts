import {Api} from "../core/api/api";
import {IAuthScope} from "./auth.scope";
import {IContext} from "../core/context/context";
import {MetadataFilter} from "../core/filters/metadata.filter";
import {Observable} from "rxjs";
import {IAuthorization} from "./authorization";
import {IAuthMetadata} from "./auth.metadata";
import {Authentication} from "./auth.message";


export class AuthModule {
  public readonly module: Api;

  constructor() {
    this.module = new Api();
    this.init();
  }

  init() {
    this.module
      .on("**")
      .where(MetadataFilter.has("authentication"))
      .do((data: any, context: IContext<IAuthScope>, metadata: IAuthMetadata) => {

        if(!context.scope.authorization ||
          !context.scope.authorization.permissions) {
          return context.done(new Error("unauthenticated"));
        }

        for(let authorizedPermission of context.scope.authorization.permissions) {
          for(let requiredPermission of metadata.authentication.permissions) {
            if(authorizedPermission === requiredPermission) {
              return context.done();
            }
          }
        }

        context.done(new Error("unauthorized"));
      });
  }

  authentication<TAuthentication>(callback: (authentication: TAuthentication) => Observable<IAuthorization>) {
    this.module.on(Authentication).do((data: Authentication<any>, context: IContext<IAuthScope>) => {
      callback(data.authentication).subscribe(res => {
        context.scope.authorization = res;
      }, err => {
        context.done(err);
      }, () => {
        context.done();
      });
    });
  }
}
