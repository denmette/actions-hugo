import {afterEach, beforeEach, describe, expect, test, vi} from 'vitest';
import {getURL, getLatestVersion} from '../src/get-latest-version.js';
import {Tool} from '../src/constants.js';

const mockGet = vi.fn();

vi.mock('@actions/http-client', () => ({
  HttpClient: vi.fn().mockImplementation(() => ({
    get: mockGet
  }))
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
