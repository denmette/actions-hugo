import {beforeEach, describe, expect, test, vi} from 'vitest';
import {getCandidateURLs} from '../src/get-url.js';

const mockGetInput = vi.fn();
const mockDebug = vi.fn();
const mockAddPath = vi.fn();
const mockDownloadTool = vi.fn();
const mockExtractTar = vi.fn();
const mockExtractZip = vi.fn();
const mockMkdirP = vi.fn();
const mockMv = vi.fn();
const mockGetReleaseAssetURL = vi.fn();

vi.mock('@actions/core', () => ({
  addPath: mockAddPath,
  debug: mockDebug,
  getInput: mockGetInput
}));

vi.mock('@actions/tool-cache', () => ({
  downloadTool: mockDownloadTool,
  extractTar: mockExtractTar,
  extractZip: mockExtractZip
}));

vi.mock('@actions/io', () => ({
  mkdirP: mockMkdirP,
  mv: mockMv
}));

vi.mock('../src/get-os.js', () => ({
  default: () => 'macOS'
}));

vi.mock('../src/get-arch.js', () => ({
  default: () => 'ARM64'
}));

vi.mock('../src/get-latest-version.js', async importOriginal => {
  const actual = await importOriginal<typeof import('../src/get-latest-version.js')>();

  return {
    ...actual,
    getReleaseAssetURL: mockGetReleaseAssetURL
  };
});

describe('installer()', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.HOME = '/tmp';

    mockGetInput.mockReturnValue('');
    mockExtractTar.mockResolvedValue('/tmp/extracted');
    mockExtractZip.mockResolvedValue('/tmp/extracted');
  });

  test('uses direct candidate URLs before GitHub release API fallback', async () => {
    const {installer} = await import('../src/installer.js');
    const version = '0.160.1';
    const candidateURLs = getCandidateURLs('macOS', 'ARM64', 'true', version);

    mockGetInput.mockReturnValue('true');
    mockDownloadTool.mockRejectedValueOnce(new Error('Unexpected HTTP response: 404'));
    mockDownloadTool.mockResolvedValueOnce('/tmp/archive.tar.gz');

    await installer(version);

    expect(mockDownloadTool).toHaveBeenNthCalledWith(1, candidateURLs[0]);
    expect(mockDownloadTool).toHaveBeenNthCalledWith(2, candidateURLs[1]);
    expect(mockGetReleaseAssetURL).not.toHaveBeenCalled();
    expect(mockAddPath).toHaveBeenCalledWith('/tmp/actions_hugo/bin');
    expect(mockMv).toHaveBeenCalled();
  });

  test('falls back to release asset lookup after all direct candidates 404', async () => {
    const {installer} = await import('../src/installer.js');
    const version = '0.160.1';
    const candidateURLs = getCandidateURLs('macOS', 'ARM64', 'false', version);
    const fallbackURL =
      'https://github.com/gohugoio/hugo/releases/download/v0.160.1/hugo_0.160.1_release-api-fallback.tar.gz';

    mockDownloadTool.mockImplementation(async (url: string) => {
      if (url === fallbackURL) {
        return '/tmp/archive.tar.gz';
      }

      throw new Error('Unexpected HTTP response: 404');
    });
    mockGetReleaseAssetURL.mockResolvedValue(fallbackURL);

    await installer(version);

    expect(mockDownloadTool).toHaveBeenCalledTimes(candidateURLs.length + 1);
    expect(mockGetReleaseAssetURL).toHaveBeenCalledWith(
      'gohugoio',
      'hugo',
      'macOS',
      'ARM64',
      '',
      version
    );
  });

  test('rethrows non-404 download errors immediately', async () => {
    const {installer} = await import('../src/installer.js');

    mockDownloadTool.mockRejectedValue(new Error('socket hang up'));

    await expect(installer('0.146.1')).rejects.toThrow('socket hang up');
    expect(mockGetReleaseAssetURL).not.toHaveBeenCalled();
  });
});
