import {HandleFactory} from "./handle.factory";
import {expect} from "chai";
import {MetadataStore} from "../api/metadata.store";

describe('handle.factory', () => {
  it('should fire callback when do() is called', (done) => {
    const factory = new HandleFactory(new MetadataStore());
    factory.callback = (handle) => {
      expect(handle).not.to.be.equal(null);
      expect(handle).not.to.be.equal(undefined);
      done();
    };

    factory.do(() => {});
  });

  it('should only fire callback when one is set', () => {
    const factory = new HandleFactory(new MetadataStore());

    factory.do(() => {});
  });
});
