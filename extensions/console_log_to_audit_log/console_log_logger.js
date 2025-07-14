
let logMessageType = browser.webfuseSession.env.log_type;

console.log('Console messages will write to the Webfuse Audit Log. ssss');

const consoleMethods = logMessageType.split(',');

console.log(consoleMethods);
const originalConsole = {};

// Save original methods
consoleMethods.forEach(method => {
  originalConsole[method] = console[method];

  console[method] = function (...args) {

    // 1. Call original console method
    originalConsole[method].apply(console, args);

    try {
      // 2. Serialize log message
      const logMessage = args.map(arg => {
        try {
          return typeof arg === 'object' ? JSON.stringify(arg) : String(arg);
        } catch (e) {
          return String(arg);
        }
      }).join(' ');

      // 3. Gather contextual data
      const context = {
        [`console.${method}`]: logMessage,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        domain: window.location.hostname,
        path: window.location.pathname,
        userAgent: navigator.userAgent,
        referrer: document.referrer
      };
      originalConsole.log(context);

      // 4. Write to Audit Log (if enabled)
      browser.webfuseSession.log(context);
      originalConsole.log("log line sent to Webfuse Audit log");

    } catch (err) {
      originalConsole.log('Error sending to Webfuse:', err);
    }
  };
});