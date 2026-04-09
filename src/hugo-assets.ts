function getExtension(os: string): string {
  if (os === 'Windows') {
    return 'zip';
  }

  return 'tar.gz';
}

function getLegacyAssetName(os: string, arch: string, extended: string, version: string): string {
  const extendedPrefix = extended === 'true' ? 'extended_' : '';
  return `hugo_${extendedPrefix}${version}_${os}-${arch}.${getExtension(os)}`;
}

function getCurrentAssetNames(
  os: string,
  arch: string,
  extended: string,
  version: string
): string[] {
  const extendedPrefix = extended === 'true' ? 'extended_' : '';
  const prefix = `hugo_${extendedPrefix}${version}_`;

  switch (os) {
    case 'Linux':
      switch (arch) {
        case '64bit':
          return [`${prefix}linux-amd64.tar.gz`];
        case 'ARM':
          return [`${prefix}linux-arm.tar.gz`];
        case 'ARM64':
          return [`${prefix}linux-arm64.tar.gz`];
      }
      break;
    case 'macOS':
      switch (arch) {
        case '64bit':
          return [`${prefix}darwin-amd64.tar.gz`, `${prefix}darwin-universal.tar.gz`];
        case 'ARM64':
          return [`${prefix}darwin-arm64.tar.gz`, `${prefix}darwin-universal.tar.gz`];
      }
      break;
    case 'Windows':
      switch (arch) {
        case '64bit':
          return [`${prefix}windows-amd64.zip`];
        case 'ARM64':
          return [`${prefix}windows-arm64.zip`];
      }
      break;
  }

  return [];
}

export function getCandidateAssetNames(
  os: string,
  arch: string,
  extended: string,
  version: string
): string[] {
  return [
    getLegacyAssetName(os, arch, extended, version),
    ...getCurrentAssetNames(os, arch, extended, version)
  ];
}

export function getCandidateURLs(
  os: string,
  arch: string,
  extended: string,
  version: string
): string[] {
  const baseURL = `https://github.com/gohugoio/hugo/releases/download/v${version}`;
  return getCandidateAssetNames(os, arch, extended, version).map(
    assetName => `${baseURL}/${assetName}`
  );
}
