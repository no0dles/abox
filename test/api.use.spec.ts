import {Api} from "../src/api";
import {Action} from "../src/action.decorator";
import chai = require("chai");
import sinon = require("sinon");

@Action({ name: "ping" })
class Lorem {
  constructor(public message: string,
              public flag: boolean) {

  }
}

class NonActionClass {

}


describe('api', () => {
  it('should not emit non action classes', (done) => {
    const api = new Api();

    api.emit(new NonActionClass())
      .subscribe(res => {
        done(new Error("should not be called"));
      }, err => {
        done();
      })
  });

  it('should not handle non action classes', () => {
    const api = new Api();

    const handleNonAction = () => {
      api
        .on(NonActionClass)
        .handle((context, data) => {

        });
    };

    chai.expect(handleNonAction).to.throw(Error);
  });

  it('should return error', (done) => {
    const handleSpy = sinon.spy();

    const errorMessage = "flag can not be true";

    const api = new Api();

    const subApi = new Api();

    subApi
      .on("**")
      .where({ flag: true })
      .handle((context, data) => {
        handleSpy();

        context.done(new Error(errorMessage));
      });

    api.use(subApi);

    api
      .emit(new Lorem("ipsum", true))
      .subscribe(res => {
        done(new Error("should not be called"));
      }, err => {
        chai.expect(err.message).to.be.equal(errorMessage);
        chai.expect(handleSpy.callCount).to.be.equal(1);
        done();
      }, () => {
        done(new Error("should not be called"));
      });

  });
});
