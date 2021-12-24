import { appConfig } from "./configs";
import { getGitBotRateLimit } from "./github/github";

const githubBotTokens = appConfig.githubBotTokens;

if (githubBotTokens.length === 0) {
  console.error("No Git Bots has included!!!");
}

const poolSize: number = githubBotTokens.length;

for (let i = 0; i < poolSize; i++) {
  getGitBotRateLimit(githubBotTokens[i])
    .then((res) => console.log("RES : ", res))
    .catch((e) => console.error(e));
}
