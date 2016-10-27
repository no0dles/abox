import {ScopeMapper, DataMapper} from "./filter.mapper";
import {expect} from "chai";

describe('filter.mapper', () => {

  describe('ScopeMapper', () => {
    it('should map to scope', () => {
      const mapper = new ScopeMapper();
      const data = { "lorem": "ipsum" };
      const scope = { "hello": "world" };
      const result = mapper.map(data, scope);

      expect(result).to.be.equal(scope);
    });
  });

  describe('DataMapper', () => {
    it('should map to scope', () => {
      const mapper = new DataMapper();
      const data = { "lorem": "ipsum" };
      const scope = { "hello": "world" };
      const result = mapper.map(data, scope);

      expect(result).to.be.equal(data);
    });
  });

});
