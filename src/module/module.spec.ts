import {Module} from "./module";
import {expect} from "chai";
import {MetadataStore} from "../api/metadata.store";
import {DataFilter} from "../filters/data.filter";
import {MetadataFilter} from "../filters/metadata.filter";

describe('module', () => {
  describe('#use', () => {
    it('should copy handles', (done) => {
      const sourceModule = new Module(new MetadataStore());
      const destModule = new Module(new MetadataStore());
      const action = {
        data: {},
        metadata: {"key": "test"}
      };

      sourceModule.on(MetadataFilter.has("key")).do(() => {
        done();
      });

      destModule.use(sourceModule);

      destModule.emit(action).subscribe(
        () => {},
        err => done(err),
        () => {}
      );

    });
  });

  describe('#emit', () => {
    it('should return response on emit', (done) => {
      const action = {
        data: { "message": "lorem" },
        metadata: { "key": "echo"}
      };
      const response = { "key": "response", "message": "lorem" };
      const module = new Module(new MetadataStore());

      module.on(MetadataFilter.value("key", "echo")).do((data, context) => {
        context.emit(response).done();
      });

      module.emit(action).subscribe(result => {
        expect(result.data).to.be.equal(response);
        done();
      }, err => {
        done(err);
      });
    });

    it('should throw error when data is null or undefined', (done) => {
      const module = new Module(new MetadataStore());

      module.emit(null).subscribe(
        () => {},
        () => {
          done();
        }
      );
    });
  });
});
