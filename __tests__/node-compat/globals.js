const {transferableAbortController} = require('util');
const {runInThisContext} = require('vm');

if (!global.AbortController || !global.AbortSignal) {
  const controller = transferableAbortController();
  global.AbortController = controller.constructor;
  global.AbortSignal = controller.signal.constructor;
}

global.Event = global.Event || runInThisContext('Event');
global.EventTarget = global.EventTarget || runInThisContext('EventTarget');
