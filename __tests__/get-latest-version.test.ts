import {afterEach, beforeEach, describe, expect, test, vi} from 'vitest';
import {
  getURL,
  getLatestVersion,
  getLatestVersionWithFallback,
  getReleaseAssetURL
} from '../src/get-latest-version.js';
import {Tool} from '../src/constants.js';
import {HUGO_TEST_FIXTURES} from './fixtures/hugo.js';

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
        .mockResolvedValue(JSON.stringify({versions: {stable: HUGO_TEST_FIXTURES.latestVersion}}))
    });

    const versionLatest: string = await getLatestVersion(Tool.Org, Tool.Repo, 'brew');
    expect(versionLatest).toMatch(HUGO_TEST_FIXTURES.latestVersion);
  });

  test('return latest version via GitHub', async () => {
    mockGet.mockResolvedValue({
      message: {
        statusCode: 200,
        statusMessage: 'OK'
      },
      readBody: vi
        .fn()
        .mockResolvedValue(JSON.stringify({tag_name: HUGO_TEST_FIXTURES.latestVersion}))
    });

    const versionLatest: string = await getLatestVersion(Tool.Org, Tool.Repo, 'github');
    expect(versionLatest).toMatch(HUGO_TEST_FIXTURES.latestVersion);
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

  test('fall back to GitHub when brew lookup fails', async () => {
    mockGet
      .mockResolvedValueOnce({
        message: {
          statusCode: 503,
          statusMessage: 'Service Unavailable'
        },
        readBody: vi.fn().mockResolvedValue('')
      })
      .mockResolvedValueOnce({
        message: {
          statusCode: 200,
          statusMessage: 'OK'
        },
        readBody: vi
          .fn()
          .mockResolvedValue(JSON.stringify({tag_name: HUGO_TEST_FIXTURES.latestVersion}))
      });

    await expect(getLatestVersionWithFallback(Tool.Org, Tool.Repo)).resolves.toBe(
      HUGO_TEST_FIXTURES.latestVersion
    );
  });
});

describe('getReleaseAssetURL()', () => {
  test('fall back to current darwin universal asset naming', async () => {
    const version = HUGO_TEST_FIXTURES.latestVersion;
    const downloadURL = `https://github.com/gohugoio/hugo/releases/download/v${version}/hugo_extended_${version}_darwin-universal.tar.gz`;

    mockGet.mockResolvedValue({
      message: {
        statusCode: 200,
        statusMessage: 'OK'
      },
      readBody: vi.fn().mockResolvedValue(
        JSON.stringify({
          assets: [
            {
              browser_download_url: downloadURL,
              name: `hugo_extended_${version}_darwin-universal.tar.gz`
            }
          ]
        })
      )
    });

    await expect(
      getReleaseAssetURL(Tool.Org, Tool.Repo, 'macOS', 'ARM64', 'true', version)
    ).resolves.toBe(downloadURL);
  });

  test('fall back to current windows amd64 asset naming', async () => {
    const version = HUGO_TEST_FIXTURES.latestVersion;
    const downloadURL = `https://github.com/gohugoio/hugo/releases/download/v${version}/hugo_${version}_windows-amd64.zip`;

    mockGet.mockResolvedValue({
      message: {
        statusCode: 200,
        statusMessage: 'OK'
      },
      readBody: vi.fn().mockResolvedValue(
        JSON.stringify({
          assets: [
            {
              browser_download_url: downloadURL,
              name: `hugo_${version}_windows-amd64.zip`
            }
          ]
        })
      )
    });

    await expect(
      getReleaseAssetURL(Tool.Org, Tool.Repo, 'Windows', '64bit', 'false', version)
    ).resolves.toBe(downloadURL);
  });

  test('throw when no compatible asset exists', async () => {
    const version = HUGO_TEST_FIXTURES.latestVersion;

    mockGet.mockResolvedValue({
      message: {
        statusCode: 200,
        statusMessage: 'OK'
      },
      readBody: vi.fn().mockResolvedValue(JSON.stringify({assets: []}))
    });

    await expect(
      getReleaseAssetURL(Tool.Org, Tool.Repo, 'macOS', 'ARM64', 'false', version)
    ).rejects.toThrow('No compatible release asset found');
  });
});
