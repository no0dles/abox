export class ConfigMerger {
  public static merge(config: any, baseConfig: any) {
    for(let key in config) {
      if(typeof config[key] === "object") {
        baseConfig[key] = ConfigMerger.merge(config[key], baseConfig[key] || {});
      } else {
        baseConfig[key] = config[key];
      }
    }

    return baseConfig;
  }
}
