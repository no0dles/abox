import {IFilter} from "./filter";
import {Observable} from "rxjs/Observable";
import {IFilterMapper} from "./filter.mapper";

export class FilterFactory {
  private mapper: IFilterMapper;

  constructor(mapper: { new(): IFilterMapper }) {
    this.mapper = new mapper();
  }

  public value(key: string, value: any): IFilter {
    return this.custom(key, (data) => data === value);
  }

  public pattern(key: string, regex: RegExp): IFilter {
    return this.custom(key, (data) => regex.test(data));
  }

  public has(key: string): IFilter {
    return this.custom(key, (data) => data !== null && data !== undefined);
  }

  public custom(key: string, validate: (value: any) => boolean | Observable<boolean>): IFilter {
    return (data, scope) => {
      const value = this.mapper.map(data, scope) || {};
      return validate(value[key]);
    }
  }
}
