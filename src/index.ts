import { appConfig } from "./configs";
import { callGChatWebhook } from "./gchat.webhook";
import { getGitBotRateLimit } from "./github/github";
import { RateLimit } from "./github/github";

const { githubBotTokens } = appConfig;

if (githubBotTokens.length === 0) {
  console.error("No Git Bots has included!!!");
}

const poolSize: number = githubBotTokens.length;

async function getAllBotsLimits() {
  const gitBotRateLimits: RateLimit[] = [];
  for (let i = 0; i < poolSize; i++) {
    const rateLimit = await getGitBotRateLimit(githubBotTokens[i]);
    gitBotRateLimits.push(rateLimit);
  }

  return gitBotRateLimits;
}

async function formattedRateLimit() {
  const rateLimits = await getAllBotsLimits();

  let messageString = "";
  rateLimits.map((r, i) => {
    const bot = `GitHub Bot ${i + 1}`;
    const rate = r.rate;

    messageString = `${messageString} 
    ${bot} => limit: ${rate.limit} used: ${rate.used} remaining; ${rate.remaining}`;
  });

  return messageString;
}

formattedRateLimit().then((data) => callGChatWebhook(data));
