const {transferableAbortController} = require('util');
const {runInThisContext} = require('vm');

if (!global.AbortController || !global.AbortSignal) {
  const AbortController = runInThisContext('AbortController');
  const AbortSignal = runInThisContext('AbortSignal');
  global.AbortController = AbortController;
  global.AbortSignal = AbortSignal;
}

if (!global.structuredClone) {
  global.structuredClone = value => value;
}

if (!global.DOMException) {
  global.DOMException = runInThisContext('DOMException');
}

if (!global.AbortSignal.any && transferableAbortController) {
  global.AbortSignal.any = signals => {
    const controller = transferableAbortController();
    for (const signal of signals) {
      if (signal.aborted) {
        controller.abort(signal.reason);
        break;
      }
      signal.addEventListener(
        'abort',
        () => controller.abort(signal.reason),
        {once: true}
      );
    }
    return controller.signal;
  };
}
