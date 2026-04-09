import {getCandidateURLs} from './hugo-assets.js';

export default function getURL(
  os: string,
  arch: string,
  extended: string,
  version: string
): string {
  return getCandidateURLs(os, arch, extended, version)[0];
}

export {getCandidateURLs};
