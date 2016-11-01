import * as path from "path";
import * as fs from "fs";
import {IConfig} from "./config";
import {ConfigMerger} from "./config.merger";
import {DEFAULT_CONFIG} from "./default.config";

export class ConfigLoader {
  public static readConfig(url: string): IConfig {
    const configPath = path.join(process.cwd(), url);

    if(!fs.exists(configPath)) {
      throw new Error("no config file found");
    }

    return ConfigMerger.merge(require(configPath), DEFAULT_CONFIG) as IConfig;
  }
}
