import {expect} from "chai";
import {Context} from "./context";
import {MetadataStore} from "../api/metadata.store";

describe('context', () => {

  it('should return emitted action in result without done', (done) => {
    const context = new Context(new MetadataStore(), {});
    const action = { key: "lorem", data: "ipsum" };

    context.emit(action);
    context.result.subscribe(result => {
      expect(result.data).to.be.equal(action);
      done();
    }, err => { done(err); });
  });

  it('should complete result on done', (done) => {
    const context = new Context(new MetadataStore(), {});

    context.done();
    context.result.subscribe(
      () => { },
      (err) => { done(err); },
      () => { done() }
    );
  });

  it('should throw errors', (done) => {
    const context = new Context(new MetadataStore(), {});
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
