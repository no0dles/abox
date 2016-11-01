#!/usr/bin/env node

import * as program from "commander";
import {ConfigLoader} from "./config.loader";
import {Server} from "./server";

program
  .version('0.0.0')
  .option('-c', '--config <path>', 'set config path. default to ./config.json');

program
  .command('*')
  .action((env, options) => {
    const config = ConfigLoader.readConfig(options.config || 'config.json');
    const server = new Server(config);

    server.start();
  });

program.parse(process.argv);
