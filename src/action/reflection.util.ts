import "reflect-metadata";

export class ReflectionUtil {
  static getMetadata<TValue>(target: any, key?: string): TValue {
    if(!target) return null;

    const metadata = Reflect.getMetadata("metadata", target) || {};

    if(key) {
      return metadata[key];
    }

    return metadata;
  }

  static setMetadata(target: any, key: string, value: any) {
    const metadata = ReflectionUtil.getMetadata(target, "metadata") || {};

    metadata[key] = value;

    Reflect.defineMetadata("metadata", metadata, target);
  }
}
