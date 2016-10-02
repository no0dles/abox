import {Api} from "../src/api";
import {Action} from "../src/action.decorator";
import chai = require("chai");
import sinon = require("sinon");

@Action({ name: "ping" })
class Ping {
  constructor(public message: string) {

  }
}

@Action({ name: "pong" })
class Pong {
  constructor(public message: string) {

  }
}

describe('api', () => {
  it('should do a ping and a pong', (done) => {
    const api = new Api();
    const pingSpy = sinon.spy();
    const pongSpy = sinon.spy();
    const resSpy = sinon.spy();


    api
      .on(Ping)
      .handle((context, data, metadata) => {
        pingSpy();

        chai.expect(metadata, 'ping metadata').to.contain.keys('name');
        chai.expect(metadata.name, 'ping metadata name').to.be.equal('ping');

        chai.expect(data, 'ping data').to.contain.keys('message');
        chai.expect(data.message, 'ping message').to.be.equal('mocha');

        context.done(new Pong(data.message));
      });

    api
      .on(Pong)
      .handle((context, data, metadata) => {
        pongSpy();

        chai.expect(metadata, 'pong metadata').to.contain.keys('name');
        chai.expect(metadata.name, 'pong metadata name').to.be.equal('pong');

        chai.expect(data, 'pong data').to.contain.keys('message');
        chai.expect(data.message, 'pong message').to.be.equal('mocha');

        context.done();
      });

    api
      .emit(new Ping("mocha"))
      .subscribe(res => {
        resSpy();

        chai.expect(pingSpy.callCount, 'ping spy').to.be.equal(1);
        chai.expect(pongSpy.callCount, 'pong spy').to.be.equal(1);

        chai.expect(res, 'response').to.contain.keys('message');
        chai.expect(res.message, 'response message').to.be.equal('mocha');

      }, err => {
        done(err);
      }, () => {
        chai.expect(resSpy.callCount, 'response spy').to.be.equal(1);

        done();
      });
  });
});
