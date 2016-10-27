import {Module} from "./module";
import {DataFilter} from "./filter";
import {expect} from "chai";

describe('api', () => {
  describe('#use', () => {
    it('should copy handles', (done) => {
      const sourceModule = new Module();
      const destModule = new Module();

      sourceModule.on(DataFilter.has("key")).do(() => {
        done();
      });

      destModule.use(sourceModule);

      destModule.emit({"key": "test"}).subscribe(
        () => {},
        err => done(err),
        () => {}
      );

    });
  });

  describe('#emit', () => {
    it('should return response on emit', (done) => {
      const data = { "key": "echo", "message": "lorem" };
      const response = { "key": "response", "message": "lorem" };
      const module = new Module();

      module.on(DataFilter.value("key", "echo")).do((data, context) => {
        context.emit(response).done();
      });

      module.emit(data).subscribe(result => {
        expect(result).to.be.equal(response);
        done();
      }, err => {
        done(err);
      });
    });

    it('should throw error when data is null or undefined', (done) => {
      const module = new Module();

      module.emit(null).subscribe(
        () => {},
        () => {
          done();
        }
      );
    });
  });

  describe('#on', () => {

  });
});
