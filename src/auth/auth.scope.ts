import {IAuth} from "./auth.decorator";
import {IActionScope} from "../action/action.scope";

export interface IAuthScope extends IActionScope<IAuthScope> {
  auth: IAuth;
}
