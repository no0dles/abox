import {Key} from "../action/key.decorator";
import {Required} from "../validator/decorators/required";

@Key("abox.http.request")
export class HttpRequest {
  @Required()
  public headers: { [key: string]: string; };

  @Required()
  public body: any;

  constructor(headers: { [key: string]: string; }, body: any) {
    this.headers = headers;
    this.body = body;
  }
}
