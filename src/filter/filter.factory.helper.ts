import {DataMapper} from "./filter.mapper";
import {FilterFactory} from "./filter.factory";
import {expect} from "chai";

export function testValueFilter(data: any, key: any, value: any, matching: boolean) {
  const factory = new FilterFactory(DataMapper);
  const scope = {};
  const metadata = {};
  const filter = factory.value(key, value);
  const result = filter(data, scope, metadata);

  expect(result, key).to.be.equal(matching);
}

export function testPatternFilter(data: any, key: any, pattern: RegExp, matching: boolean) {
  const factory = new FilterFactory(DataMapper);
  const scope = {};
  const metadata = {};
  const filter = factory.pattern(key, pattern);
  const result = filter(data, scope, metadata);

  expect(result, key).to.be.equal(matching);
}

export function testHasFilter(data: any, key: any, matching: boolean) {
  const factory = new FilterFactory(DataMapper);
  const scope = {};
  const metadata = {};
  const filter = factory.has(key);
  const result = filter(data, scope, metadata);

  expect(result, key).to.be.equal(matching);
}
