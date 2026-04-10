import * as httpm from '@actions/http-client';
import {getCandidateAssetNames, type HugoOS, type HugoArch} from './hugo-assets';

export enum APIProvider {
  Brew = 'brew',
  GitHub = 'github'
}

async function getJson<T>(url: string): Promise<T> {
  const client = new httpm.HttpClient('actions-hugo');
  const response = await client.get(url);
  const statusCode = response.message.statusCode || 0;
  const statusMessage = response.message.statusMessage || '';

  if (statusCode >= 400) {
    throw new Error(`Failed to fetch ${url}: ${statusCode} ${statusMessage}`.trim());
  }

  const body = await response.readBody();
  try {
    return JSON.parse(body) as T;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to parse response from ${url}: ${message}`, {cause: error});
  }
}

type GitHubReleaseAsset = {
  browser_download_url: string;
  name: string;
};

type GitHubReleaseAssetsResponse = {
  assets: GitHubReleaseAsset[];
};

export function getURL(org: string, repo: string, api: APIProvider): string {
  switch (api) {
    case APIProvider.Brew:
      return `https://formulae.brew.sh/api/formula/${repo}.json`;
    case APIProvider.GitHub:
      return `https://api.github.com/repos/${org}/${repo}/releases/latest`;
  }
}

export async function getLatestVersion(
  org: string,
  repo: string,
  api: APIProvider
): Promise<string> {
  const url = getURL(org, repo, api);
  const json = await getJson<unknown>(url);

  if (api === APIProvider.Brew) {
    if (
      typeof json === 'object' &&
      json !== null &&
      'versions' in json &&
      typeof (json as {versions: unknown}).versions === 'object' &&
      (json as {versions: {stable?: unknown}}).versions.stable !== undefined
    ) {
      return String((json as {versions: {stable: string}}).versions.stable);
    }
    throw new Error(`Unexpected Brew API response structure from ${url}`);
  }

  if (
    typeof json === 'object' &&
    json !== null &&
    'tag_name' in json &&
    (json as {tag_name: unknown}).tag_name !== undefined
  ) {
    return String((json as {tag_name: string}).tag_name);
  }
  throw new Error(`Unexpected GitHub API response structure from ${url}`);
}

export async function getLatestVersionWithFallback(org: string, repo: string): Promise<string> {
  try {
    return await getLatestVersion(org, repo, APIProvider.Brew);
  } catch (error) {
    if (error instanceof Error) {
      console.warn(`Brew API failed: ${error.message}. Falling back to GitHub API.`);
    }
    return await getLatestVersion(org, repo, APIProvider.GitHub);
  }
}

function normalizeTag(version: string): string {
  return version.startsWith('v') ? version : `v${version}`;
}

function getReleaseTagURL(org: string, repo: string, version: string): string {
  return `https://api.github.com/repos/${org}/${repo}/releases/tags/${normalizeTag(version)}`;
}

export async function getReleaseAssetURL(
  org: string,
  repo: string,
  os: HugoOS,
  arch: HugoArch,
  extended: boolean,
  version: string
): Promise<string> {
  const url = getReleaseTagURL(org, repo, version);
  const json = await getJson<unknown>(url);

  if (
    typeof json !== 'object' ||
    json === null ||
    !('assets' in json) ||
    !Array.isArray((json as {assets: unknown}).assets)
  ) {
    throw new Error(`Unexpected GitHub API response structure from ${url}: missing assets array`);
  }

  const assets = (json as GitHubReleaseAssetsResponse).assets;

  for (const candidate of getCandidateAssetNames(os, arch, extended, version)) {
    const asset = assets.find(releaseAsset => releaseAsset.name === candidate);

    if (asset) {
      return asset.browser_download_url;
    }
  }

  throw new Error(
    `No compatible release asset found for ${normalizeTag(
      version
    )} (${os}/${arch}, extended=${extended})`
  );
}
