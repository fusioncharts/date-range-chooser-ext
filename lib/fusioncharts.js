'use strict';
var FusionCharts = function () {
  var i;
  var l = extList.length;
  var self = this;

  if (self.test) {
    self.require = function () {
      var callBack = arguments[arguments.length - 1];
      var callBackArgument = [];

      for (var i = 0; i < arguments.length - 1; i++) {
        if (arguments[i] === 'X-Axis') {
          callBackArgument.push({
            getCurrentVisibleRange: function () {
              return {
                startDate: 0,
                endDate: 1000
              };
            },
            min: 0,
            max: 2000
          });
        } else if (arguments[i] === 'chart') {
          callBackArgument.push(self);
        } else if (arguments[i] === 'graphics') {
          if (typeof Raphael === 'function') {
            var paper = Raphael(10, 10, 500, 500);
          }
          callBackArgument.push(paper);
        } else {
          callBackArgument.push(self[arguments[i]]);
        }
      }
      callBack.apply(self, callBackArgument);
    };
    self.extensions = [];
    for (i = 0; i < l; i += 1) {
      var tempExt = new extList[i]();
      tempExt.init(self.require);
      if (typeof Raphael === 'function') {
        tempExt.draw();
      }
      self.extensions.push(tempExt);
    }
  }
};

FusionCharts.prototype = {
  test: true,
  getFormattedDate: function (timestamp) {
    return new Date(timestamp).toLocaleDateString();
  },
  getTimestamp: function (date) {
    var dt = new Date(date);
    return +new Date(dt.toLocaleDateString());
  }
};

FusionCharts.register = function (ext, arr) {
  var extName = arr[0];
  var fn = arr[1];
  console.log('Currently active extension: ' + extName);
  fn.bind(this, 565)();
};

FusionCharts.getComponent = function (componentType, componentName) {
  var toolBox = {
    x: 24,
    y: 56,
    width: 100,
    height: 20,
    index: 4
  };

  if (componentType === 'api' && componentName === 'toolbox') {
    return toolBox;
  }

  return null;
};
var extList = [];

FusionCharts.extAPI = function (obj) {
  var tempConstructor = function () {};
  tempConstructor.prototype = obj;

  extList.push(tempConstructor);
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = FusionCharts;
} else {
  window.FusionCharts = FusionCharts;
}
