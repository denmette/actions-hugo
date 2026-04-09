import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import * as io from '@actions/io';
import getOS from './get-os.js';
import getArch from './get-arch.js';
import getURL from './get-url.js';
import {getReleaseAssetURL} from './get-latest-version.js';
import * as path from 'path';
import {Tool, Action} from './constants.js';

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
  const extended: string = core.getInput('extended');
  core.debug(`Hugo extended: ${extended}`);

  const osName: string = getOS(process.platform);
  core.debug(`Operating System: ${osName}`);

  const archName: string = getArch(process.arch);
  core.debug(`Processor Architecture: ${archName}`);

  const toolURL: string = getURL(osName, archName, extended, version);
  core.debug(`toolURL: ${toolURL}`);

  const workDir = await createWorkDir();
  const binDir = await createBinDir(workDir);
  const tempDir = await createTempDir(workDir);

  let toolAssets: string;

  try {
    toolAssets = await tc.downloadTool(toolURL);
  } catch (error) {
    const message = error instanceof Error ? error.message : `${error}`;

    if (!message.includes('Unexpected HTTP response: 404')) {
      throw error;
    }

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
  }

  const toolBin =
    process.platform === 'win32'
      ? `${await tc.extractZip(toolAssets, tempDir)}/${Tool.CmdName}.exe`
      : `${await tc.extractTar(toolAssets, tempDir)}/${Tool.CmdName}`;

  await io.mv(toolBin, binDir);
}
