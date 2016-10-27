import {expect} from "chai";
import {Context} from "./context";
import {Handle} from "./handle";
import {DataFilter} from "./filter";
import {Observable} from "rxjs";

const data = { "lorem": "ipsum" };
const scope = { "foo": "bar" };
const result = { "hello": "world" };

describe('handle', () => {

  it('should emit callbacks with no filters', (done) => {
    const filters = [];
    const callbacks = [(data: any, context: Context<any>) => {
      expect(data).to.be.equal(data);
      expect(context.scope).to.be.equal(scope);

      context
        .emit(result)
        .done();
    }];

    const handle = new Handle(filters, callbacks);

    handle
      .emit(data, scope)
      .subscribe(res => {
        expect(res).to.be.equal(result);
        done();
      }, err => {
        done(err);
      });
  });

  it('should emit callbacks with true filters', (done) => {
    const filters = [
      DataFilter.value("lorem", "ipsum")
    ];

    const callbacks = [(data: any, context: Context<any>) => {
      expect(data).to.be.equal(data);
      expect(context.scope).to.be.equal(scope);

      context
        .emit(result)
        .done();
    }];

    const handle = new Handle(filters, callbacks);

    handle
      .emit(data, scope)
      .subscribe(res => {
        expect(res).to.be.equal(result);
        done();
      }, err => {
        done(err);
      });
  });


  it('should not emit callbacks with false filters', (done) => {
    const filters = [
      DataFilter.value("lorem", "ipsum2")
    ];

    const callbacks = [(data: any, context: Context<any>) => {
      expect(data).to.be.equal(data);
      expect(context.scope).to.be.equal(scope);

      context
        .emit(result)
        .done();
    }];

    const handle = new Handle(filters, callbacks);

    handle
      .emit(data, scope)
      .subscribe(res => {
        done(new Error("should not go here"));
      }, err => {
        done(err);
      }, () => {
        done();
      });
  });

  it('should filter by observables', (done) => {
    const filters = [
      DataFilter.custom("lorem", (val) => Observable.of<boolean>(false))
    ];

    const callbacks = [(data: any, context: Context<any>) => {
      expect(data).to.be.equal(data);
      expect(context.scope).to.be.equal(scope);

      context
        .emit(result)
        .done();
    }];

    const handle = new Handle(filters, callbacks);

    handle
      .emit(data, scope)
      .subscribe(res => {
        done(new Error("should not go here"));
      }, err => {
        done(err);
      }, () => {
        done();
      });
  });


  it('should not run more filters than required', (done) => {
    const filters = [
      DataFilter.value("lorem", "ipsum2"),
      (scope, data) => {
        done(new Error("should not be called"));
        return false;
      }
    ];

    const callbacks = [(data: any, context: Context<any>) => {
      expect(data).to.be.equal(data);
      expect(context.scope).to.be.equal(scope);

      context
        .emit(result)
        .done();
    }];

    const handle = new Handle(filters, callbacks);

    handle
      .emit(data, scope)
      .subscribe(res => {
        done(new Error("should not go here"));
      }, err => {
        done(err);
      }, () => {
        done();
      });
  });
});
