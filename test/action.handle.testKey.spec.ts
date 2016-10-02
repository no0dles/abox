import chai = require("chai");
import {ActionHandle} from "../src/action.handle";

const testPattern = (pattern: string, value: string, isTrue: boolean) => {
  const handle = new ActionHandle(pattern, null, null);
  chai.expect(handle.testKey(value), "test method").to.be.equal(isTrue, `${pattern} => ${value}`);
};

describe('action.handle', () => {
  describe('#testKey', () => {

    it('should not accept null/undefined', () => {
      testPattern("**", null, false);
      testPattern("**", undefined, false);
    });

    it('should accept *', () => {
      testPattern("*", "ping", true);
      testPattern("*", "ping.ping", false);
      testPattern("*", "", true);
    });

    it('should accept test.*', () => {
      testPattern("test.*", "test.ping", true);
      testPattern("test.*", "test.ping.pong", false);
      testPattern("test.*", "test", false);
      testPattern("test.*", "", false);
    });

    it('should accept *.test', () => {
      testPattern("*.test", "ping.test", true);
      testPattern("*.test", "ping.pong.test", false);
      testPattern("*.test", "test", false);
      testPattern("*.test", "", false);
    });

    it('should accept *.*', () => {
      testPattern("*.*", "ping.ping", true);
      testPattern("*.*", "ping.ping.pang", false);
      testPattern("*.*", "ping", false);
      testPattern("*.*", "", false);
    });

    it('should accept *.test.*', () => {
      testPattern("*.test.*", "ping.test.pong", true);
      testPattern("*.test.*", "ping.test", false);
      testPattern("*.test.*", "ping.test.pong.pang", false);
      testPattern("*.test.*", "test.pong", false);
      testPattern("*.test.*", "test", false);
      testPattern("*.test.*", "", false);
    });

    it('should accept **', () => {
      testPattern("**", "ping.ping.ping.ping", true);
      testPattern("**", "ping", true);
      testPattern("**", "ping.pong", true);
      testPattern("**", "", true);
    });

    it('should accept test.**', () => {
      testPattern("test.**", "test.ping.pong", true);
      testPattern("test.**", "test.ping", true);
      testPattern("test.**", "pong.test.ping", false);
      testPattern("test.**", "test", false);
      testPattern("test.**", "", false);
    });

    it('should accept **.test', () => {
      testPattern("**.test", "ping.pong.test", true);
      testPattern("**.test", "ping.test", true);
      testPattern("**.test", "ping.test.pong", false);
      testPattern("**.test", "test", false);
      testPattern("**.test", "", false);
    });

    it('should accept **.**', () => {
      testPattern("**.**", "ping", false);
      testPattern("**.**", "ping.pong", true);
      testPattern("**.**", "ping.pong.pang", true);
      testPattern("**.**", "", false);
    });

    it('should accept **.test.**', () => {
      testPattern("**.test.**", "ping.pi.test.po.pong", true);
      testPattern("**.test.**", "ping.test.pong", true);
      testPattern("**.test.**", "test.pong", false);
      testPattern("**.test.**", "ping.test", false);
      testPattern("**.test.**", "test", false);
      testPattern("**.test.**", "", false);
    });

    it('should accept **.test.*.test', () => {
      testPattern("**.test.*.test", "ping.pi.test.po.test", true);
      testPattern("**.test.*.test", "ping.test.po.test", true);
      testPattern("**.test.*.test", "test.po.test", false);
      testPattern("**.test.*.test", "test.test.test", false);
      testPattern("**.test.*.test", "test.test.test.test", true);
      testPattern("**.test.*.test", "test.test", false);
      testPattern("**.test.*.test", "", false);
    });

    it('should accept **.test.**.test', () => {
      testPattern("**.test.**.test", "ping.pi.test.pi.po.test", true);
      testPattern("**.test.**.test", "ping.test.po.test", true);
      testPattern("**.test.**.test", "ping.test.test", false);
      testPattern("**.test.**.test", "test.test", false);
      testPattern("**.test.**.test", "test.test.test", false);
      testPattern("**.test.**.test", "", false);
    });
  });
});
