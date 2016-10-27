import {testValueFilter, testPatternFilter, testHasFilter} from "./filter.factory.helper";

describe('filter.factory', () => {

  describe('#value', () => {

    it('should return false when mapper returns null', () => {
      testValueFilter(null, "str", "lorem", false);
    });

    it('should return true when value is matching', () => {
      testValueFilter({ "str": "lorem"}, "str", "lorem", true);
      testValueFilter({ "chr": 'c'}, "chr", 'c', true);
      testValueFilter({ "num": 1}, "num", 1, true);
      testValueFilter({ "bol": false}, "bol", false, true);
    });

    it('should return false when value is not matching', () => {
      testValueFilter({ "str": "lorem"}, "str", "lorem2", false);
      testValueFilter({ "chr": 'c'}, "chr", 'b', false);
      testValueFilter({ "num": 1}, "num", 2, false);
      testValueFilter({ "dat": new Date(10)}, "dat", new Date(10), false);
      testValueFilter({ "bol": false}, "bol", true, false);
    });

    it('should return false when key not exists', () => {
      testValueFilter({ "str": "lorem"}, "str2", "lorem", false);
    });

    it('should return true when key not exists and value is undefined', () => {
      testValueFilter({ }, "empty", null, false);
      testValueFilter({ }, "empty", undefined, true);
    });
  });

  describe('#pattern', () => {
    it('should return true when value is matching', () => {
      testPatternFilter({ "str": "lorem"}, "str", /lor.+/, true);
      testPatternFilter({ "chr": 'c'}, "chr", /[a-c]+/, true);
      testPatternFilter({ "num": 1}, "num", /[1-3]+/, true);
      testPatternFilter({ "bol": false}, "bol", /false/, true);
    });

    it('should return false when value is matching', () => {
      testPatternFilter({ "str": "lorem" }, "str", /lorE.+/, false);
      testPatternFilter({ "chr": 'c' }, "chr", /[a-b]+/, false);
      testPatternFilter({ "num": 1 }, "num", /[2-3]+/, false);
      testPatternFilter({ "bol": false }, "bol", /true/, false);
    });

    it('should return false when key not exists', () => {
      testPatternFilter({ "str": "lorem"}, "str2", /lorem/, false);
    });
  });

  describe('#has', () => {
    it('should return true when key exists', () => {
      testHasFilter({ "str": "lorem"}, "str", true);
    });

    it('should return false when key not exists', () => {
      testHasFilter({ }, "str", false);
    });
  });
});
