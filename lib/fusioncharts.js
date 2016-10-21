var FusionCharts = function () {};

FusionCharts.prototype.register = function (ext, arr) {
  var extName = arr[0];
  var fn = arr[1];
  console.log('Currently active extension: ' + extName);
  fn.bind(this, 565)();
};

FusionCharts.prototype.extAPI = function (obj) {
  obj.init(function () {
    var argsToApply = [];
    var cb = arguments[arguments.length - 1];

    for (var i = 0; i < arguments.length - 1; i++) {
      argsToApply.push(arguments[i]);
    }
    cb.apply(this, argsToApply);
  });
};

module.exports = FusionCharts;
