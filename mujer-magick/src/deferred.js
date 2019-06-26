
/**
 * Promise like object that allows to resolve it promise from outside code. Example:
 *
```
class Api {
  fooReady = new Deferred<Data>()
  private knower() {
    inOtherMoment(data=>{
      this.fooReady.resolve(data)
    })
  }
}
```
 */
module.exports.Deferred = /** @class */ (function () {
  function Deferred(callback) {
      var instance = this;
      this.resolve = null;
      this.reject = null;
      this.promise = new Promise(function (resolve, reject) {
          instance.resolve = resolve;
          instance.reject = reject;
      });
      if (typeof callback === 'function') {
          callback.call(this, this.resolve, this.reject);
      }
  }
  Deferred.prototype.then = function (resolve) {
      return this.promise.then(resolve);
  };
  Deferred.prototype.catch = function (r) {
      return this.promise.catch(r);
  };
  return Deferred;
}());