export default class Logger {
  constructor(options) {
    this.enableDebug = options.enableDebug;
  }

  DoDebug(msg, obj) {
    if (this.enableDebug) {
      this.DoLog(msg, obj, "DEBUG");
    }
  }

  DoError(msg, obj) {
    this.DoLog(msg, obj, "ERROR");
  }

  DoInfo(msg, obj) {
    this.DoLog(msg, obj, "INFO");
  }

  DoLog(msg, obj, prefix) {
    console.log(
      "%c[%s] %c(%s) %c%s",
      "font-size: 14px; color: cyan",
      prefix,
      "font-size: 10px; color: gray",
      new Date().toLocaleString(),
      "font-size: 12px; color: white",
      msg,
      obj === undefined ? "" : { obj }
    );
  }
}
