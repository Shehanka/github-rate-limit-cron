import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export interface AppConfig {
  port: number;
  googleChatWebhookURL: string;
  githubBotTokens: [];
}

let appConfig: AppConfig;

(() => {
  const config = path.resolve(__dirname, "../../configs.yaml");

  try {
    appConfig = yaml.load(fs.readFileSync(config, "utf8")) as AppConfig;
  } catch (e) {
    throw new Error(`Failed load configuration from [${e}]`);
  }
})();

export { appConfig };
