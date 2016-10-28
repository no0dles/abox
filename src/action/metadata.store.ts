import {ReflectionUtil} from "./reflection.util";

export class MetadataStore {
  protected metadata: { [key: string]: any };

  constructor() {
    this.metadata = {};
  }

  public use(store: MetadataStore): void {
    for(let key in store.metadata) {
      this.metadata[key] = store.metadata[key];
    }
  }

  public resolve<TMetadata>(actionOrKey: any | string): TMetadata {
    let key;

    if(typeof actionOrKey === "string") {
      key = actionOrKey;
    } else {
      key = ReflectionUtil.getMetadata<string>(actionOrKey, "key");

      if(!this.metadata[key]) {
        this.metadata[key] = ReflectionUtil.getMetadata(actionOrKey);
      }
    }

    return this.metadata[key] || {} as TMetadata;
  }

  store(action: any): string {
    const key = ReflectionUtil.getMetadata<string>(action, "key");

    if(!key) throw new Error("Could not store object");

    const metadata = ReflectionUtil.getMetadata(action);

    this.metadata[key] = metadata;

    return key;
  }
}
