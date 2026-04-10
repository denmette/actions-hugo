import {describe, expect, test, vi, beforeEach, afterEach} from 'vitest';
import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import * as exec from '@actions/exec';
import * as io from '@actions/io';
import * as path from 'path';
import * as fs from 'fs';
import {run} from '../../src/main';

// We will mock only the lowest level boundaries
vi.mock('@actions/core');
vi.mock('@actions/tool-cache');
vi.mock('@actions/exec');
vi.mock('@actions/io', async () => {
  const actual = await vi.importActual<typeof import('@actions/io')>('@actions/io');
  return {
    ...actual,
    mkdirP: vi.fn().mockResolvedValue(undefined),
    mv: vi.fn().mockResolvedValue(undefined)
  };
});

// Mocking HttpClient inside get-latest-version.ts
const mockGet = vi.fn();
vi.mock('@actions/http-client', () => ({
  HttpClient: vi.fn().mockImplementation(function () {
    return {
      get: mockGet
    };
  })
}));

describe('Integration: run()', () => {
  const tempDir = path.join(process.cwd(), '__tests__', 'tmp');

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.HOME = tempDir;
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, {recursive: true});
    }

    // Default inputs
    vi.mocked(core.getInput).mockImplementation((name: string) => {
      if (name === 'hugo-version') return 'latest';
      return '';
    });
    vi.mocked(core.getBooleanInput).mockImplementation((name: string) => {
      if (name === 'extended') return false;
      return false;
    });
  });

  afterEach(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, {recursive: true, force: true});
    }
  });

  test('full successful flow for latest version', async () => {
    // 1. Mock version resolution (Brew)
    mockGet.mockResolvedValueOnce({
      message: {statusCode: 200},
      readBody: vi.fn().mockResolvedValue(JSON.stringify({versions: {stable: '0.120.0'}}))
    });

    // 2. Mock tool download (tc.downloadTool)
    vi.mocked(tc.downloadTool).mockResolvedValue('/fake/path/hugo.tar.gz');

    // 3. Mock extraction
    vi.mocked(tc.extractTar).mockResolvedValue('/fake/path/extracted');

    // 4. Mock execution of hugo version
    vi.mocked(exec.exec).mockImplementation((_cmd, _args, options) => {
      if (options?.listeners?.stdout) {
        options.listeners.stdout(Buffer.from('hugo v0.120.0'));
      }
      return Promise.resolve(0);
    });

    const result = await run();

    // Verify the whole chain
    expect(core.info).toHaveBeenCalledWith('Hugo version: 0.120.0');
    expect(tc.downloadTool).toHaveBeenCalled();
    expect(tc.extractTar).toHaveBeenCalledWith(
      '/fake/path/hugo.tar.gz',
      expect.stringContaining('_temp')
    );
    expect(io.mv).toHaveBeenCalledWith(
      expect.stringMatching(/[\\/]hugo$/),
      expect.stringMatching(/[\\/]bin$/)
    );
    expect(result.exitcode).toBe(0);
    expect(result.output).toContain('hugo v0.120.0');
  });

  test('full flow with specific version and fallback to GitHub API', async () => {
    vi.mocked(core.getInput).mockImplementation((name: string) => {
      if (name === 'hugo-version') return '0.119.0';
      return '';
    });
    vi.mocked(core.getBooleanInput).mockImplementation((name: string) => {
      if (name === 'extended') return true;
      return false;
    });

    // Mock direct download failure (404)
    vi.mocked(tc.downloadTool)
      .mockRejectedValueOnce(new Error('Unexpected HTTP response: 404')) // first candidate
      .mockRejectedValueOnce(new Error('Unexpected HTTP response: 404')) // second candidate
      .mockRejectedValueOnce(new Error('Unexpected HTTP response: 404')) // third candidate
      .mockResolvedValueOnce('/fake/path/hugo_fallback.tar.gz'); // fallback

    // Mock GitHub Release API for fallback URL
    mockGet.mockResolvedValue({
      message: {statusCode: 200},
      readBody: vi.fn().mockResolvedValue(
        JSON.stringify({
          assets: [
            {
              name: 'hugo_extended_0.119.0_macOS-ARM64.tar.gz',
              browser_download_url: 'https://github.com/fallback-url'
            }
          ]
        })
      )
    });

    vi.mocked(tc.extractTar).mockResolvedValue('/fake/path/extracted');
    vi.mocked(exec.exec).mockResolvedValue(0);

    await run();

    expect(tc.downloadTool).toHaveBeenCalledTimes(4); // 3 candidates + 1 fallback
    expect(mockGet).toHaveBeenCalled(); // Should have called GitHub API for fallback
    expect(vi.mocked(tc.downloadTool).mock.calls[3][0]).toBe('https://github.com/fallback-url');
  });
});
