import { Octokit } from "@octokit/rest";

export interface RateItem {
  limit: number;
  used: number;
  remaining: number;
  reset: number;
}
export interface RateLimit {
  resources: {
    core: RateItem;
    search: RateItem;
    graphql: RateItem;
    integration_manifest: RateItem;
    source_import: RateItem;
    code_scanning_upload: RateItem;
    actions_runner_registration: RateItem;
    scim: RateItem;
  };
  rate: RateItem;
}

export async function getGitBotRateLimit(gitToken: string): Promise<RateLimit> {
  const octokit: Octokit = new Octokit({ auth: gitToken });
  const res = await octokit.request("GET /rate_limit");

  return res.data as RateLimit;

}
