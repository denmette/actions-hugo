import {afterEach, beforeEach, describe, expect, test, vi} from 'vitest';
import * as io from '@actions/io';
import os from 'os';
import path from 'path';
import {Tool, Action} from '../src/constants.js';
import {HUGO_TEST_FIXTURES} from './fixtures/hugo.js';

type ActionResult = import('../src/main.js').ActionResult;
const installTimeoutMs = 60000;

describe('Integration testing run()', () => {
  beforeEach(async () => {
    vi.resetModules();

    const workDir = path.join(`${process.env.HOME}`, Action.WorkDirName);
    await io.rmRF(workDir);

    process.env['RUNNER_TEMP'] = process.env['RUNNER_TEMP'] || os.tmpdir();
  });

  afterEach(async () => {
    const workDir = path.join(`${process.env.HOME}`, Action.WorkDirName);
    await io.rmRF(workDir);

    delete process.env['INPUT_HUGO-VERSION'];
    delete process.env['INPUT_EXTENDED'];
    vi.doUnmock('../src/get-latest-version.js');
  });

  test(
    'succeed in installing a custom version',
    async () => {
      const main = await import('../src/main.js');
      const testVersion = HUGO_TEST_FIXTURES.pinnedVersion;
      process.env['INPUT_HUGO-VERSION'] = testVersion;
      const result: ActionResult = await main.run();
      expect(result.exitcode).toBe(0);
      expect(result.output).toMatch(`hugo v${testVersion}`);
    },
    installTimeoutMs
  );

  test(
    'succeed in installing a custom extended version',
    async () => {
      const main = await import('../src/main.js');
      const testVersion = HUGO_TEST_FIXTURES.pinnedVersion;
      process.env['INPUT_HUGO-VERSION'] = testVersion;
      process.env['INPUT_EXTENDED'] = 'true';
      const result: ActionResult = await main.run();
      expect(result.exitcode).toBe(0);
      expect(result.output).toMatch(`hugo v${testVersion}`);
      expect(result.output).toMatch(`extended`);
    },
    installTimeoutMs
  );

  test(
    'succeed in installing the latest version',
    async () => {
      vi.doMock('../src/get-latest-version.js', () => ({
        getLatestVersion: vi.fn().mockResolvedValue(HUGO_TEST_FIXTURES.latestVersion)
      }));

      const main = await import('../src/main.js');
      process.env['INPUT_HUGO-VERSION'] = 'latest';
      const result: ActionResult = await main.run();
      expect(result.exitcode).toBe(0);
      expect(result.output).toMatch(`hugo v${HUGO_TEST_FIXTURES.latestVersion}`);
    },
    installTimeoutMs
  );

  test(
    'succeed in installing the latest extended version',
    async () => {
      vi.doMock('../src/get-latest-version.js', () => ({
        getLatestVersion: vi.fn().mockResolvedValue(HUGO_TEST_FIXTURES.latestVersion)
      }));

      const main = await import('../src/main.js');
      process.env['INPUT_HUGO-VERSION'] = 'latest';
      process.env['INPUT_EXTENDED'] = 'true';
      const result: ActionResult = await main.run();
      expect(result.exitcode).toBe(0);
      expect(result.output).toMatch(`hugo v${HUGO_TEST_FIXTURES.latestVersion}`);
      expect(result.output).toMatch(`extended`);
    },
    installTimeoutMs
  );

  test('fail to install the latest version due to 404 of brew', async () => {
    vi.doMock('../src/get-latest-version.js', () => ({
      getLatestVersion: vi
        .fn()
        .mockRejectedValue(
          new Error(`Failed to fetch https://formulae.brew.sh/api/formula/${Tool.Repo}.json: 404`)
        )
    }));

    const main = await import('../src/main.js');
    process.env['INPUT_HUGO-VERSION'] = 'latest';

    await expect(main.run()).rejects.toThrow(
      `Failed to fetch https://formulae.brew.sh/api/formula/${Tool.Repo}.json: 404`
    );
  });
});

describe('showVersion()', () => {
  let result: {exitcode: number; output: string} = {
    exitcode: 0,
    output: ''
  };

  test('return version', async () => {
    const main = await import('../src/main.js');
    result = await main.showVersion('git', ['--version']);
    expect(result.exitcode).toBe(0);
    expect(result.output).toMatch(/git version/);
  });

  test('return not found', async () => {
    const main = await import('../src/main.js');
    await expect(main.showVersion('gitgit', ['--version'])).rejects.toThrow(Error);
  });
});
