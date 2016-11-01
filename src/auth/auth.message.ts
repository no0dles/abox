import {Key} from "../core/decorator/key.decorator";
import {Required} from "../validator/decorators/required";

@Key("auth.authentication")
export class Authentication<TAuthentication> {
  @Required()
  public authentication: TAuthentication;
}
