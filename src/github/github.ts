import { Octokit } from "@octokit/rest";

export interface RateLimit {}

export async function getGitBotRateLimit(gitToken: string): Promise<RateLimit> {
  const octokit: Octokit = new Octokit({ auth: gitToken });

  const res = await octokit.request("GET /rate_limit");

  return res.data;
  //   const PATH = ``;
  //   try {
  //     const res = await Axios.default.get(PATH, {
  //       headers: {},
  //     });

  //     return res.data as RateLimit;
  //   } catch (e) {
  //     console.error("GitHub Rate Limit Get Failed : ", e.message);
  //   }
}
