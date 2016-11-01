export interface IConfig {
  http: {
    enabled: boolean;
    port: number;
    websocket: {
      enabled: boolean;
    }
  },
  tcp: {
    enabled: boolean
  }
}
