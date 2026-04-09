import {afterEach, beforeEach, describe, expect, test, vi} from 'vitest';
import {getURL, getLatestVersion, getReleaseAssetURL} from '../src/get-latest-version.js';
import {Tool} from '../src/constants.js';

const mockGet = vi.fn();

vi.mock('@actions/http-client', () => ({
  HttpClient: vi.fn().mockImplementation(function () {
    return {
      get: mockGet
    };
  })
}));

beforeEach(() => {
  vi.resetModules();
  mockGet.mockReset();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('getURL()', () => {
  test('return expected URL', () => {
    const urlBrewExpected = `https://formulae.brew.sh/api/formula/${Tool.Repo}.json`;
    const urlBrew: string = getURL(Tool.Org, Tool.Repo, 'brew');
    expect(urlBrew).toMatch(urlBrewExpected);

    const urlGithubExpected = `https://api.github.com/repos/${Tool.Org}/${Tool.Repo}/releases/latest`;
    const urlGithub: string = getURL(Tool.Org, Tool.Repo, 'github');
    expect(urlGithub).toMatch(urlGithubExpected);
  });
});

describe('getLatestVersion()', () => {
  test('return latest version via brew', async () => {
    mockGet.mockResolvedValue({
      message: {
        statusCode: 200,
        statusMessage: 'OK'
      },
      readBody: vi
        .fn()
        .mockResolvedValue(JSON.stringify({versions: {stable: Tool.TestVersionLatest}}))
    });

    const versionLatest: string = await getLatestVersion(Tool.Org, Tool.Repo, 'brew');
    expect(versionLatest).toMatch(Tool.TestVersionLatest);
  });

  test('return latest version via GitHub', async () => {
    mockGet.mockResolvedValue({
      message: {
        statusCode: 200,
        statusMessage: 'OK'
      },
      readBody: vi.fn().mockResolvedValue(JSON.stringify({tag_name: Tool.TestVersionLatest}))
    });

    const versionLatest: string = await getLatestVersion(Tool.Org, Tool.Repo, 'github');
    expect(versionLatest).toMatch(Tool.TestVersionLatest);
  });

  test('return exception 404', async () => {
    mockGet.mockResolvedValue({
      message: {
        statusCode: 404,
        statusMessage: 'Not Found'
      },
      readBody: vi.fn().mockResolvedValue('')
    });

    await expect(getLatestVersion(Tool.Org, Tool.Repo, 'brew')).rejects.toThrow(
      `Failed to fetch https://formulae.brew.sh/api/formula/${Tool.Repo}.json: 404`
    );
  });
});

describe('getReleaseAssetURL()', () => {
  test('fall back to current darwin universal asset naming', async () => {
    mockGet.mockResolvedValue({
      message: {
        statusCode: 200,
        statusMessage: 'OK'
      },
      readBody: vi.fn().mockResolvedValue(
        JSON.stringify({
          assets: [
            {
              browser_download_url:
                'https://github.com/gohugoio/hugo/releases/download/v0.160.1/hugo_extended_0.160.1_darwin-universal.tar.gz',
              name: 'hugo_extended_0.160.1_darwin-universal.tar.gz'
            }
          ]
        })
      )
    });

    await expect(
      getReleaseAssetURL(Tool.Org, Tool.Repo, 'macOS', 'ARM64', 'true', '0.160.1')
    ).resolves.toBe(
      'https://github.com/gohugoio/hugo/releases/download/v0.160.1/hugo_extended_0.160.1_darwin-universal.tar.gz'
    );
  });

  test('fall back to current windows amd64 asset naming', async () => {
    mockGet.mockResolvedValue({
      message: {
        statusCode: 200,
        statusMessage: 'OK'
      },
      readBody: vi.fn().mockResolvedValue(
        JSON.stringify({
          assets: [
            {
              browser_download_url:
                'https://github.com/gohugoio/hugo/releases/download/v0.160.1/hugo_0.160.1_windows-amd64.zip',
              name: 'hugo_0.160.1_windows-amd64.zip'
            }
          ]
        })
      )
    });

    await expect(
      getReleaseAssetURL(Tool.Org, Tool.Repo, 'Windows', '64bit', 'false', '0.160.1')
    ).resolves.toBe(
      'https://github.com/gohugoio/hugo/releases/download/v0.160.1/hugo_0.160.1_windows-amd64.zip'
    );
  });

  test('throw when no compatible asset exists', async () => {
    mockGet.mockResolvedValue({
      message: {
        statusCode: 200,
        statusMessage: 'OK'
      },
      readBody: vi.fn().mockResolvedValue(JSON.stringify({assets: []}))
    });

    await expect(
      getReleaseAssetURL(Tool.Org, Tool.Repo, 'macOS', 'ARM64', 'false', '0.160.1')
    ).rejects.toThrow('No compatible release asset found');
  });
});
