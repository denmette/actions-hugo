import {transferableAbortController} from 'node:util';
import {runInThisContext} from 'node:vm';

type CompatGlobal = typeof globalThis & {
  AbortSignal: typeof globalThis.AbortSignal & {
    any?: (signals: AbortSignal[]) => AbortSignal;
  };
  structuredClone?: <T>(value: T) => T;
};

const compatGlobal = globalThis as CompatGlobal;

if (!compatGlobal.AbortController || !compatGlobal.AbortSignal) {
  compatGlobal.AbortController = runInThisContext('AbortController') as typeof AbortController;
  compatGlobal.AbortSignal = runInThisContext('AbortSignal') as CompatGlobal['AbortSignal'];
}

if (!compatGlobal.structuredClone) {
  compatGlobal.structuredClone = <T>(value: T): T => value;
}

if (!compatGlobal.DOMException) {
  compatGlobal.DOMException = runInThisContext('DOMException') as typeof DOMException;
}

if (!compatGlobal.AbortSignal.any && transferableAbortController) {
  compatGlobal.AbortSignal.any = (signals: AbortSignal[]): AbortSignal => {
    const controller = transferableAbortController();
    for (const signal of signals) {
      if (signal.aborted) {
        controller.abort(signal.reason);
        break;
      }
      signal.addEventListener('abort', () => controller.abort(signal.reason), {
        once: true
      });
    }
    return controller.signal;
  };
}

export {};
