export interface IFilterMapper {
  map(data: any, scope: any, metadata: any): any;
}

export class ScopeMapper implements IFilterMapper {
  public map(data: any, scope: any, metadata: any): any {
    return scope;
  }
}

export class DataMapper implements IFilterMapper {
  public map(data: any, scope: any, metadata: any): any {
    return data;
  }
}

export class MetadataMapper implements IFilterMapper {
  public map(data: any, scope: any, metadata: any): any {
    return metadata;
  }
}
