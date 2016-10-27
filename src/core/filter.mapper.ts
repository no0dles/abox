export interface IFilterMapper {
  map(data: any, scope: any): any;
}

export class ScopeMapper implements IFilterMapper {
  public map(data: any, scope: any): any {
    return scope;
  }
}

export class DataMapper implements IFilterMapper {
  public map(data: any, scope: any): any {
    return data;
  }
}
