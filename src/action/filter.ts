import {FilterFactory} from "../core/filter.factory";
import {IFilterMapper} from "../core/filter.mapper";

export class MetadataMapper implements IFilterMapper {
  public map(data: any, scope: any): any {
    return scope["metadata"];
  }
}

export var MetadataFilter = new FilterFactory(MetadataMapper);
