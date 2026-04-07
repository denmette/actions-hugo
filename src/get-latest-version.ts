import * as httpm from '@actions/http-client';

type BrewVersionResponse = {
  versions: {
    stable: string;
  };
};

type GitHubReleaseResponse = {
  tag_name: string;
};

async function getJson(url: string): Promise<BrewVersionResponse | GitHubReleaseResponse> {
  const client = new httpm.HttpClient('actions-hugo');
  const response = await client.get(url);
  const statusCode = response.message.statusCode || 0;
  const statusMessage = response.message.statusMessage || '';

  if (statusCode >= 400) {
    throw new Error(`Failed to fetch ${url}: ${statusCode} ${statusMessage}`.trim());
  }

  return JSON.parse(await response.readBody()) as BrewVersionResponse | GitHubReleaseResponse;
}

export function getURL(org: string, repo: string, api: string): string {
  let url = '';

  if (api === 'brew') {
    url = `https://formulae.brew.sh/api/formula/${repo}.json`;
  } else if (api === 'github') {
    url = `https://api.github.com/repos/${org}/${repo}/releases/latest`;
  }

  return url;
}

export async function getLatestVersion(org: string, repo: string, api: string): Promise<string> {
  const url = getURL(org, repo, api);
  const json = await getJson(url);
  let latestVersion = '';
  if (api === 'brew') {
    latestVersion = (json as BrewVersionResponse).versions.stable;
  } else if (api === 'github') {
    latestVersion = (json as GitHubReleaseResponse).tag_name;
  }
  return latestVersion;
}
