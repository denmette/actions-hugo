import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import * as io from '@actions/io';
import * as path from 'path';
import {getCandidateURLs, getOS, getArch, type HugoOS, type HugoArch} from './hugo-assets';
import {getReleaseAssetURL} from './get-latest-version';
import {Tool, Action} from './constants';

export function getHomeDir(): string {
  if (process.platform === 'win32') {
    return process.env['USERPROFILE'] || 'C:\\';
  } else {
    return `${process.env.HOME}`;
  }
}

export async function createWorkDir(): Promise<string> {
  const workDir = path.join(getHomeDir(), Action.WorkDirName);
  await io.mkdirP(workDir);
  core.debug(`workDir: ${workDir}`);
  return workDir;
}

export async function createTempDir(workDir: string): Promise<string> {
  const tempDir = path.join(workDir, Action.TempDirName);
  await io.mkdirP(tempDir);
  core.debug(`tempDir: ${tempDir}`);
  return tempDir;
}

export async function createBinDir(workDir: string): Promise<string> {
  const binDir = path.join(workDir, 'bin');
  await io.mkdirP(binDir);
  core.addPath(binDir);
  core.debug(`binDir: ${binDir}`);
  return binDir;
}

export async function installer(version: string): Promise<void> {
  const extended = core.getBooleanInput('extended');
  core.debug(`Hugo extended: ${extended}`);

  const osName: HugoOS = getOS(process.platform);
  core.debug(`Operating System: ${osName}`);

  const archName: HugoArch = getArch(process.arch);
  core.debug(`Processor Architecture: ${archName}`);

  const toolURLs = getCandidateURLs(osName, archName, extended, version);
  core.debug(`Candidate URLs: ${toolURLs.join(', ')}`);

  const workDir = await createWorkDir();
  const binDir = await createBinDir(workDir);
  const tempDir = await createTempDir(workDir);

  let toolAssets = '';
  let lastError: Error | undefined;

  for (const candidateURL of toolURLs) {
    core.debug(`Attempting to download: ${candidateURL}`);

    try {
      toolAssets = await tc.downloadTool(candidateURL);
      break;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (!lastError.message.includes('Unexpected HTTP response: 404')) {
        throw lastError;
      }
      core.debug(`404 for ${candidateURL}, trying next candidate...`);
    }
  }

  if (toolAssets === '') {
    core.info('Direct download failed, attempting fallback via GitHub API...');
    try {
      const fallbackToolURL = await getReleaseAssetURL(
        Tool.Org,
        Tool.Repo,
        osName,
        archName,
        extended,
        version
      );
      core.debug(`fallbackToolURL: ${fallbackToolURL}`);
      toolAssets = await tc.downloadTool(fallbackToolURL);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to download Hugo ${version}: ${message}`, {cause: error});
    }
  }

  core.info(`Successfully downloaded Hugo to ${toolAssets}`);
  const toolBin =
    process.platform === 'win32'
      ? path.join(await tc.extractZip(toolAssets, tempDir), `${Tool.CmdName}.exe`)
      : path.join(await tc.extractTar(toolAssets, tempDir), Tool.CmdName);

  core.debug(`Moving ${toolBin} to ${binDir}`);
  await io.mv(toolBin, binDir);
  core.info('Hugo installed successfully');
}
