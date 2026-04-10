import {describe, expect, test, vi} from 'vitest';
import * as core from '@actions/core';
import * as main from '../../src/main.js';

vi.mock('@actions/core');
vi.mock('../../src/main.js');

describe('index.ts', () => {
  test('calls main.run()', async () => {
    // Import src/index.ts to trigger the immediately invoked function
    await import('../../src/index.js');

    expect(main.run).toHaveBeenCalledTimes(1);
  });

  test('logs error and sets failed when main.run() throws', async () => {
    const error = new Error('Test error');
    vi.mocked(main.run).mockRejectedValue(error);

    // Reset module to re-trigger immediately invoked function
    vi.resetModules();
    await import('../../src/index.js');

    expect(core.setFailed).toHaveBeenCalledWith(expect.stringContaining('Test error'));
  });

  test('logs string error and sets failed when main.run() throws a string', async () => {
    vi.mocked(main.run).mockRejectedValue('String error');

    vi.resetModules();
    await import('../../src/index.js');

    expect(core.setFailed).toHaveBeenCalledWith(expect.stringContaining('String error'));
  });
});
