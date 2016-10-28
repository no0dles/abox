import {Observable} from "rxjs/Observable";
import {FilterFactory} from "./filter.factory";
import {ScopeMapper, DataMapper, MetadataMapper} from "./filter.mapper";

export interface IFilter {
  (data: any, scope: any, metadata: any): boolean | Observable<boolean>;
}

export var ScopeFilter = new FilterFactory(ScopeMapper);
export var DataFilter = new FilterFactory(DataMapper);
export var MetadataFilter = new FilterFactory(MetadataMapper);
