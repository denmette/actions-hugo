import {beforeEach, describe, expect, test, vi} from 'vitest';
import type {ExecOptions} from '@actions/exec';
import {Tool} from '../../src/constants.js';

const mockGetInput = vi.fn();
const mockInfo = vi.fn();
const mockDebug = vi.fn();
const mockExec = vi.fn();
const mockGetLatestVersionWithFallback = vi.fn();
const mockInstaller = vi.fn();

vi.mock('@actions/core', () => ({
  debug: mockDebug,
  getInput: mockGetInput,
  info: mockInfo
}));

vi.mock('@actions/exec', () => ({
  exec: mockExec
}));

vi.mock('../../src/get-latest-version.js', async importOriginal => {
  const actual = await importOriginal<typeof import('../../src/get-latest-version.js')>();

  return {
    ...actual,
    getLatestVersionWithFallback: mockGetLatestVersionWithFallback
  };
});

vi.mock('../../src/installer.js', () => ({
  installer: mockInstaller
}));

describe('run()', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('propagates latest-version lookup failures', async () => {
    const {run} = await import('../../src/main.js');
    const error = new Error(
      `Failed to fetch https://formulae.brew.sh/api/formula/${Tool.Repo}.json: 404`
    );
    mockGetInput.mockImplementation((name: string) => (name === 'hugo-version' ? 'latest' : ''));
    mockGetLatestVersionWithFallback.mockRejectedValue(error);

    await expect(run()).rejects.toThrow(error.message);
    expect(mockInstaller).not.toHaveBeenCalled();
  });
});

describe('showVersion()', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('returns command output', async () => {
    const {showVersion} = await import('../../src/main.js');
    mockExec.mockImplementation((_cmd: string, _args: string[], options: ExecOptions) => {
      options.listeners?.stdout?.(Buffer.from('git version 2.50.1'));
      return Promise.resolve(0);
    });

    const result = await showVersion('git', ['--version']);

    expect(result.exitcode).toBe(0);
    expect(result.output).toMatch(/git version/);
  });

  test('propagates exec errors', async () => {
    const {showVersion} = await import('../../src/main.js');
    mockExec.mockRejectedValue(new Error('command not found'));

    await expect(showVersion('gitgit', ['--version'])).rejects.toThrow('command not found');
  });
});
