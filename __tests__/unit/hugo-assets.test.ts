import {describe, expect, test} from 'vitest';
import {
  getURL,
  getCandidateURLs,
  getOS,
  getArch,
  type HugoOS,
  type HugoArch
} from '../../src/hugo-assets';

describe('getOS()', () => {
  test('returns correct OS name for supported platforms', () => {
    expect(getOS('linux')).toBe('Linux');
    expect(getOS('darwin')).toBe('macOS');
    expect(getOS('win32')).toBe('Windows');
  });

  test('throws for unsupported platforms', () => {
    expect(() => getOS('freebsd')).toThrow('freebsd is not supported');
  });
});

describe('getArch()', () => {
  test('returns correct Arch name for supported architectures', () => {
    expect(getArch('x64')).toBe('64bit');
    expect(getArch('arm')).toBe('ARM');
    expect(getArch('arm64')).toBe('ARM64');
  });

  test('throws for unsupported architectures', () => {
    expect(() => getArch('ia64')).toThrow('ia64 is not supported');
  });
});

describe('getURL()', () => {
  test('get a URL to an asset for each platform', () => {
    const baseURL = 'https://github.com/gohugoio/hugo/releases/download/v0.58.2';
    const urlLinux = `${baseURL}/hugo_0.58.2_Linux-64bit.tar.gz`;
    const urlLinuxExtended = `${baseURL}/hugo_extended_0.58.2_Linux-64bit.tar.gz`;
    const urlMacOS = `${baseURL}/hugo_0.58.2_macOS-64bit.tar.gz`;
    const urlMacOSExtended = `${baseURL}/hugo_extended_0.58.2_macOS-64bit.tar.gz`;
    const urlWindows = `${baseURL}/hugo_0.58.2_Windows-64bit.zip`;
    expect(getURL('Linux', '64bit', false, '0.58.2')).toBe(urlLinux);
    expect(getURL('Linux', '64bit', true, '0.58.2')).not.toBe(urlLinux);
    expect(getURL('Linux' as HugoOS, '64bit', false, '0.58.2')).toBe(urlLinux);
    expect(getURL('Linux', '64bit', false, '0.58.1')).not.toBe(urlLinux);
    expect(getURL('Linux', '64bit', true, '0.58.2')).toBe(urlLinuxExtended);
    expect(getURL('macOS', '64bit', false, '0.58.2')).toBe(urlMacOS);
    expect(getURL('macOS', '64bit', true, '0.58.2')).toBe(urlMacOSExtended);
    expect(getURL('Windows', '64bit', false, '0.58.2')).toBe(urlWindows);
  });

  test('get a URL for various architectures', () => {
    const baseURL = 'https://github.com/gohugoio/hugo/releases/download/v0.120.0';

    // Linux ARM
    expect(getURL('Linux', 'ARM', false, '0.120.0')).toBe(
      `${baseURL}/hugo_0.120.0_Linux-ARM.tar.gz`
    );
    expect(getCandidateURLs('Linux', 'ARM', false, '0.120.0')).toContain(
      `${baseURL}/hugo_0.120.0_linux-arm.tar.gz`
    );

    // Linux ARM64
    expect(getURL('Linux', 'ARM64', false, '0.120.0')).toBe(
      `${baseURL}/hugo_0.120.0_Linux-ARM64.tar.gz`
    );
    expect(getCandidateURLs('Linux', 'ARM64', false, '0.120.0')).toContain(
      `${baseURL}/hugo_0.120.0_linux-arm64.tar.gz`
    );

    // Windows ARM64
    expect(getURL('Windows', 'ARM64', false, '0.120.0')).toBe(
      `${baseURL}/hugo_0.120.0_Windows-ARM64.zip`
    );
    expect(getCandidateURLs('Windows', 'ARM64', false, '0.120.0')).toContain(
      `${baseURL}/hugo_0.120.0_windows-arm64.zip`
    );

    // Unsupported platform returns empty current assets, but still has legacy asset
    expect(getCandidateURLs('FreeBSD' as HugoOS, '64bit', false, '0.120.0')).toEqual([
      `${baseURL}/hugo_0.120.0_FreeBSD-64bit.tar.gz`
    ]);

    // Linux unsupported arch
    expect(getCandidateURLs('Linux', 'IA64' as HugoArch, false, '0.120.0')).toEqual([
      `${baseURL}/hugo_0.120.0_Linux-IA64.tar.gz`
    ]);

    // macOS unsupported arch
    expect(getCandidateURLs('macOS', 'PowerPC' as HugoArch, false, '0.120.0')).toEqual([
      `${baseURL}/hugo_0.120.0_macOS-PowerPC.tar.gz`
    ]);

    // Windows unsupported arch
    expect(getCandidateURLs('Windows', 'Itanium' as HugoArch, false, '0.120.0')).toEqual([
      `${baseURL}/hugo_0.120.0_Windows-Itanium.zip`
    ]);
  });

  test('include current alias candidates for platforms with renamed release assets', () => {
    expect(getCandidateURLs('macOS', 'ARM64', true, '0.160.1')).toEqual([
      'https://github.com/gohugoio/hugo/releases/download/v0.160.1/hugo_extended_0.160.1_macOS-ARM64.tar.gz',
      'https://github.com/gohugoio/hugo/releases/download/v0.160.1/hugo_extended_0.160.1_darwin-arm64.tar.gz',
      'https://github.com/gohugoio/hugo/releases/download/v0.160.1/hugo_extended_0.160.1_darwin-universal.tar.gz'
    ]);

    expect(getCandidateURLs('Windows', '64bit', false, '0.160.1')).toEqual([
      'https://github.com/gohugoio/hugo/releases/download/v0.160.1/hugo_0.160.1_Windows-64bit.zip',
      'https://github.com/gohugoio/hugo/releases/download/v0.160.1/hugo_0.160.1_windows-amd64.zip'
    ]);
  });
});
