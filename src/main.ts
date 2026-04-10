import * as core from '@actions/core';
import * as exec from '@actions/exec';
import {getLatestVersionWithFallback} from './get-latest-version.js';
import {installer} from './installer.js';
import {Tool} from './constants.js';

export interface ActionResult {
  exitcode: number;
  output: string;
}

export async function showVersion(cmd: string, args: string[]): Promise<ActionResult> {
  const result: ActionResult = {
    exitcode: 0,
    output: ''
  };

  const options = {
    listeners: {
      stdout: (data: Buffer): void => {
        result.output += data.toString();
      }
    }
  };

  result.exitcode = await exec.exec(cmd, args, options);
  core.debug(`command: ${cmd} ${args}`);
  core.debug(`exit code: ${result.exitcode}`);
  core.debug(`stdout: ${result.output}`);
  return result;
}

export async function run(): Promise<ActionResult> {
  const toolVersion: string = core.getInput('hugo-version');
  const installVersion =
    toolVersion === '' || toolVersion === 'latest'
      ? await getLatestVersionWithFallback(Tool.Org, Tool.Repo)
      : toolVersion;

  core.info(`${Tool.Name} version: ${installVersion}`);
  await installer(installVersion);
  return await showVersion(Tool.CmdName, [Tool.CmdOptVersion]);
}
