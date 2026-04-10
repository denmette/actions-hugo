import {beforeEach, describe, expect, test, vi} from 'vitest';
import {getCandidateURLs} from '../../src/hugo-assets';

const mockGetInput = vi.fn();
const mockGetBooleanInput = vi.fn();
const mockDebug = vi.fn();
const mockInfo = vi.fn();
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
  info: mockInfo,
  getInput: mockGetInput,
  getBooleanInput: mockGetBooleanInput
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

vi.mock('../../src/hugo-assets', async importOriginal => {
  const actual = await importOriginal<typeof import('../../src/hugo-assets')>();

  return {
    ...actual,
    getOS: () => 'macOS',
    getArch: () => 'ARM64'
  };
});

vi.mock('../../src/get-latest-version', async importOriginal => {
  const actual = await importOriginal<typeof import('../../src/get-latest-version')>();

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
    mockGetBooleanInput.mockReturnValue(false);
    mockExtractTar.mockResolvedValue('/tmp/extracted');
    mockExtractZip.mockResolvedValue('/tmp/extracted');
  });

  test('uses direct candidate URLs before GitHub release API fallback', async () => {
    const {installer} = await import('../../src/installer');
    const version = '0.160.1';
    const candidateURLs = getCandidateURLs('macOS', 'ARM64', true, version);

    mockGetBooleanInput.mockReturnValue(true);
    mockDownloadTool.mockRejectedValueOnce(new Error('Unexpected HTTP response: 404'));
    mockDownloadTool.mockResolvedValueOnce('/tmp/archive.tar.gz');

    await installer(version);

    expect(mockDownloadTool).toHaveBeenNthCalledWith(1, candidateURLs[0]);
    expect(mockDownloadTool).toHaveBeenNthCalledWith(2, candidateURLs[1]);
    expect(mockGetReleaseAssetURL).not.toHaveBeenCalled();
    expect(mockAddPath).toHaveBeenCalledWith(expect.stringMatching(/actions_hugo[\\/]+bin$/));
    expect(mockMv).toHaveBeenCalled();
  });

  test('falls back to release asset lookup after all direct candidates 404', async () => {
    const {installer} = await import('../../src/installer');
    const version = '0.160.1';
    const candidateURLs = getCandidateURLs('macOS', 'ARM64', false, version);
    const fallbackURL =
      'https://github.com/gohugoio/hugo/releases/download/v0.160.1/hugo_0.160.1_release-api-fallback.tar.gz';

    mockGetBooleanInput.mockReturnValue(false);
    mockDownloadTool.mockImplementation((url: string) => {
      if (url === fallbackURL) {
        return Promise.resolve('/tmp/archive.tar.gz');
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
      false,
      version
    );
  });

  test('rethrows non-404 download errors immediately', async () => {
    const {installer} = await import('../../src/installer');

    mockDownloadTool.mockRejectedValue(new Error('socket hang up'));

    await expect(installer('0.146.1')).rejects.toThrow('socket hang up');
    expect(mockGetReleaseAssetURL).not.toHaveBeenCalled();
  });

  test('uses USERPROFILE on Windows if HOME is not set', async () => {
    const originalPlatform = process.platform;
    const originalHome = process.env.HOME;
    const originalUserProfile = process.env.USERPROFILE;

    Object.defineProperty(process, 'platform', {value: 'win32'});
    delete process.env.HOME;
    process.env.USERPROFILE = 'D:\\Users\\Test';

    const {getHomeDir} = await import('../../src/installer');
    expect(getHomeDir()).toBe('D:\\Users\\Test');

    Object.defineProperty(process, 'platform', {value: originalPlatform});
    process.env.HOME = originalHome;
    process.env.USERPROFILE = originalUserProfile;
  });

  test('falls back to C:\\ on Windows if both HOME and USERPROFILE are not set', async () => {
    const originalPlatform = process.platform;
    const originalHome = process.env.HOME;
    const originalUserProfile = process.env.USERPROFILE;

    Object.defineProperty(process, 'platform', {value: 'win32'});
    delete process.env.HOME;
    delete process.env.USERPROFILE;

    const {getHomeDir} = await import('../../src/installer');
    expect(getHomeDir()).toBe('C:\\');

    Object.defineProperty(process, 'platform', {value: originalPlatform});
    process.env.HOME = originalHome;
    process.env.USERPROFILE = originalUserProfile;
  });
});
