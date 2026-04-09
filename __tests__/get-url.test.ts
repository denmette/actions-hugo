import {describe, expect, test} from 'vitest';
import getURL, {getCandidateURLs} from '../src/get-url.js';

describe('getURL()', () => {
  test('get a URL to an asset for each platform', () => {
    const baseURL = 'https://github.com/gohugoio/hugo/releases/download/v0.58.2';
    const urlLinux = `${baseURL}/hugo_0.58.2_Linux-64bit.tar.gz`;
    const urlLinuxExtended = `${baseURL}/hugo_extended_0.58.2_Linux-64bit.tar.gz`;
    const urlMacOS = `${baseURL}/hugo_0.58.2_macOS-64bit.tar.gz`;
    const urlMacOSExtended = `${baseURL}/hugo_extended_0.58.2_macOS-64bit.tar.gz`;
    const urlWindows = `${baseURL}/hugo_0.58.2_Windows-64bit.zip`;
    expect(getURL('Linux', '64bit', 'false', '0.58.2')).toBe(urlLinux);
    expect(getURL('Linux', '64bit', 'true', '0.58.2')).not.toBe(urlLinux);
    expect(getURL('MyOS', '64bit', 'false', '0.58.2')).not.toBe(urlLinux);
    expect(getURL('Linux', '64bit', 'false', '0.58.1')).not.toBe(urlLinux);
    expect(getURL('Linux', '64bit', 'true', '0.58.2')).toBe(urlLinuxExtended);
    expect(getURL('macOS', '64bit', 'false', '0.58.2')).toBe(urlMacOS);
    expect(getURL('macOS', '64bit', 'true', '0.58.2')).toBe(urlMacOSExtended);
    expect(getURL('Windows', '64bit', 'false', '0.58.2')).toBe(urlWindows);
  });

  test('include current alias candidates for platforms with renamed release assets', () => {
    expect(getCandidateURLs('macOS', 'ARM64', 'true', '0.160.1')).toEqual([
      'https://github.com/gohugoio/hugo/releases/download/v0.160.1/hugo_extended_0.160.1_macOS-ARM64.tar.gz',
      'https://github.com/gohugoio/hugo/releases/download/v0.160.1/hugo_extended_0.160.1_darwin-arm64.tar.gz',
      'https://github.com/gohugoio/hugo/releases/download/v0.160.1/hugo_extended_0.160.1_darwin-universal.tar.gz'
    ]);

    expect(getCandidateURLs('Windows', '64bit', 'false', '0.160.1')).toEqual([
      'https://github.com/gohugoio/hugo/releases/download/v0.160.1/hugo_0.160.1_Windows-64bit.zip',
      'https://github.com/gohugoio/hugo/releases/download/v0.160.1/hugo_0.160.1_windows-amd64.zip'
    ]);
  });
});
