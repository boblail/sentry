export default class RequestError extends Error {
  constructor(method, path) {
    super(`${method || 'GET'} ${path}`);
    this.name = new.target.prototype.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  /**
   * Updates Error with XHR response
   */
  setResponse(resp) {
    this.resp = resp;

    if (resp) {
      this.setMessage(
        `${this.message} ${resp.status !== 'undefined' ? resp.status : 'n/a'}`
      );

      // Some callback handlers expect these properties on the error object
      if (resp.responseJSON) {
        this.responseJSON = resp.responseJSON;
        this.status = resp.status;
      }
    }
  }

  setMessage(message) {
    this.message = message;
  }

  removeFrames(numLinesToRemove) {
    // Drop some frames so stacktrace starts at callsite
    //
    // Note that babel will adds a call to support extending Error object
    const lines = this.stack.split('\n');
    this.stack = [lines[0], ...lines.slice(numLinesToRemove)].join('\n');
  }
}
