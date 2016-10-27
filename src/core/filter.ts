import {Observable} from "rxjs/Observable";
import {FilterFactory} from "./filter.factory";
import {ScopeMapper, DataMapper} from "./filter.mapper";

export interface IFilter {
  (data: any, scope: any): boolean | Observable<boolean>;
}

export var ScopeFilter = new FilterFactory(ScopeMapper);
export var DataFilter = new FilterFactory(DataMapper);
