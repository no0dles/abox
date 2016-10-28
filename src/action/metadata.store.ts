import {ReflectionUtil} from "./reflection.util";

export interface IMetadataResolve {
  key: string;
  metadata: any;
}

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

  public resolve(actionOrKey: any | string): IMetadataResolve {
    let key;

    if(typeof actionOrKey === "string") {
      key = actionOrKey;
    } else {
      key = ReflectionUtil.getMetadata<string>(actionOrKey, "key");

      if(!this.metadata[key]) {
        this.metadata[key] = ReflectionUtil.getMetadata(actionOrKey);
      }
    }

    return {
      key: key,
      metadata: this.metadata[key] || {}
    };
  }

  store(action: any): string {
    const key = ReflectionUtil.getMetadata<string>(action, "key");
    const metadata = ReflectionUtil.getMetadata(action);

    this.metadata[key] = metadata;

    return key;
  }
}
