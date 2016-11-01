import {IConfig} from "./config";

export const DEFAULT_CONFIG: IConfig = {
  http: {
    enabled: true,
    port: 3000,
    websocket: {
      enabled: false
    }
  },
  tcp: {
    enabled: false
  }
};
