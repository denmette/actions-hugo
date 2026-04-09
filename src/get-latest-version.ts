import * as httpm from '@actions/http-client';

type BrewVersionResponse = {
  versions: {
    stable: string;
  };
};

type GitHubReleaseResponse = {
  tag_name: string;
};

type GitHubReleaseAsset = {
  browser_download_url: string;
  name: string;
};

type GitHubReleaseAssetsResponse = {
  assets: GitHubReleaseAsset[];
};

async function getJson<T>(url: string): Promise<T> {
  const client = new httpm.HttpClient('actions-hugo');
  const response = await client.get(url);
  const statusCode = response.message.statusCode || 0;
  const statusMessage = response.message.statusMessage || '';

  if (statusCode >= 400) {
    throw new Error(`Failed to fetch ${url}: ${statusCode} ${statusMessage}`.trim());
  }

  return JSON.parse(await response.readBody()) as T;
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
  const json = await getJson<BrewVersionResponse | GitHubReleaseResponse>(url);
  let latestVersion = '';
  if (api === 'brew') {
    latestVersion = (json as BrewVersionResponse).versions.stable;
  } else if (api === 'github') {
    latestVersion = (json as GitHubReleaseResponse).tag_name;
  }
  return latestVersion;
}

function normalizeTag(version: string): string {
  return version.startsWith('v') ? version : `v${version}`;
}

function getReleaseTagURL(org: string, repo: string, version: string): string {
  return `https://api.github.com/repos/${org}/${repo}/releases/tags/${normalizeTag(version)}`;
}

function getAssetCandidates(os: string, arch: string, extended: string, version: string): string[] {
  const extendedPart = extended === 'true' ? 'extended_' : '';
  const prefix = `hugo_${extendedPart}${version}_`;

  switch (os) {
    case 'Linux':
      switch (arch) {
        case '64bit':
          return [`${prefix}Linux-64bit.tar.gz`, `${prefix}linux-amd64.tar.gz`];
        case 'ARM':
          return [`${prefix}Linux-ARM.tar.gz`, `${prefix}linux-arm.tar.gz`];
        case 'ARM64':
          return [`${prefix}Linux-ARM64.tar.gz`, `${prefix}linux-arm64.tar.gz`];
      }
      break;
    case 'macOS':
      switch (arch) {
        case '64bit':
          return [
            `${prefix}macOS-64bit.tar.gz`,
            `${prefix}darwin-amd64.tar.gz`,
            `${prefix}darwin-universal.tar.gz`
          ];
        case 'ARM64':
          return [
            `${prefix}macOS-ARM64.tar.gz`,
            `${prefix}darwin-arm64.tar.gz`,
            `${prefix}darwin-universal.tar.gz`
          ];
      }
      break;
    case 'Windows':
      switch (arch) {
        case '64bit':
          return [`${prefix}Windows-64bit.zip`, `${prefix}windows-amd64.zip`];
        case 'ARM64':
          return [`${prefix}Windows-ARM64.zip`, `${prefix}windows-arm64.zip`];
      }
      break;
  }

  throw new Error(`No asset candidates configured for ${os}/${arch}`);
}

export async function getReleaseAssetURL(
  org: string,
  repo: string,
  os: string,
  arch: string,
  extended: string,
  version: string
): Promise<string> {
  const url = getReleaseTagURL(org, repo, version);
  const json = await getJson<GitHubReleaseAssetsResponse>(url);
  const assets = json.assets || [];

  for (const candidate of getAssetCandidates(os, arch, extended, version)) {
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
