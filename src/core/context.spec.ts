import {expect} from "chai";
import {Context} from "./context";

describe('context', () => {

  it('should return emitted action in result without done', (done) => {
    const context = new Context({});
    const action = { key: "lorem", data: "ipsum" };

    context.emit(action);
    context.result.subscribe(result => {
      expect(result).to.be.equal(action);
      done();
    }, err => { done(err); });
  });

  it('should complete result on done', (done) => {
    const context = new Context({});

    context.done();
    context.result.subscribe(
      () => { },
      (err) => { done(err); },
      () => { done() }
    );
  });

  it('should throw errors', (done) => {
    const context = new Context({});
    const error = new Error("rand");

    context.done(error);
    context.result.subscribe(
      () => { },
      (err) => {
        expect(err).to.be.equal(err);
        done();
      },
      () => { }
    );
  });
});
