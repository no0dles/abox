import {ActionHandle} from "../src/action.handle";
import chai = require("chai");

const testFilter = (filter: any, data: any, isTrue: boolean) => {
  const handle = new ActionHandle(null, filter, null);
  chai.expect(handle.testFilter(data), "test method")
    .to.be.equal(isTrue, `${JSON.stringify(filter)} => ${JSON.stringify(data)}`);
};

describe('action.handle', () => {
  describe('#testFilter', () => {

    it('should not filter null/undefined', () => {
      testFilter(null, {}, true);
      testFilter(undefined, {}, true);
    });

    it('should filter matching properties', () => {
      testFilter({ message: "mocha" }, { message: "mocha" }, true);
      testFilter({ message: "mocha" }, { message: "mocha2" }, false);

      testFilter({ data: 2 }, { data: 2 }, true);
      testFilter({ data: 2 }, { data: 3 }, false);

      testFilter({ flag: true }, { flag: true }, true);
      testFilter({ flag: true }, { flag: false }, false);

      testFilter({ obj: null }, { obj: null }, true);
      testFilter({ obj: null }, { obj: {} }, false);
    });

    it('should filter non existing properties', () => {
      testFilter({ message: "mocha" }, { }, false);
    });
  });
});
