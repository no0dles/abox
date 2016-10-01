import "reflect-metadata";

export class Reflection {
  static getMetadata<TMetadata>(key: string, target: any): TMetadata {
    if(!target) return null;
    return Reflect.getMetadata(key, target) as TMetadata;
  }

  static setMetadata(key: string, target: any, metadata: any) {
    Reflect.defineMetadata(key, metadata, target);
  }
}
