/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var DateRange = __webpack_require__(2);

	window.dr = new DateRange();

	;(function (env, factory) {
	  if (( false ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
	    module.exports = env.document ? factory(env) : function (win) {
	      if (!win.document) {
	        throw new Error('Window with document not present');
	      }
	      return factory(win, true);
	    };
	  } else {
	    env.DateRangeChooser = factory(env, true);
	  }
	})(typeof window !== 'undefined' ? window : undefined, function (_window, windowExists) {
	  var FC = _window.FusionCharts;
	  FC.register('extension', ['private', 'date-range-chooser', function () {
	    var DateTimeFormatter = this.hcLib.DateTimeFormatter;
	    FC.registerComponent('extensions', 'date-range-chooser', DateRange({ FusionCharts: FC,
	      DateTimeFormatter: DateTimeFormatter }));
	  }]);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	module.exports = function (dep) {
	  /**
	   * Class representing the DateRange.
	   */
	  var DateRange = function () {
	    function DateRange() {
	      _classCallCheck(this, DateRange);

	      /**
	       * @private
	       */
	      this.startDt = 0;
	      this.endDt = 0;
	      this.startDataset = 0;
	      this.endDataset = 0;
	      this.toolbox = dep.FusionCharts.getComponent('api', 'toolbox');
	      this.DateTimeFormatter = dep.DateTimeFormatter;
	      this.HorizontalToolbar = this.toolbox.HorizontalToolbar;
	      this.ComponentGroup = this.toolbox.ComponentGroup;
	      this.SymbolStore = this.toolbox.SymbolStore;
	      this.isDrawn = false;
	    }

	    /**
	     * An object representing the start and end dates.
	     * @type {DateRange.range}
	     */


	    _createClass(DateRange, [{
	      key: 'getTimestamp',
	      value: function getTimestamp(dateStr) {
	        var dateFormat = this.config.dateFormat,
	            dateFormatter = new dep.DateTimeFormatter(dateFormat);
	        return +dateFormatter.getNativeDate(dateStr);
	      }
	    }, {
	      key: 'getDate',
	      value: function getDate(timestamp) {
	        var dateFormat = this.config.dateFormat;
	        return this.DateTimeFormatter.formatAs(timestamp, dateFormat);
	      }

	      /**
	       * Sets the configurable options of the extension (e.g. cosmetics)
	       * @param {Object} configObj The configuration object containing various extension options
	       */

	    }, {
	      key: 'setConfig',
	      value: function setConfig(configObj) {}

	      /**
	       * Gets the configurable options of the extension (e.g. cosmetics)
	       * @return {object} configObj The configuration object containing various extension options
	       */

	    }, {
	      key: 'getConfig',
	      value: function getConfig() {
	        return {
	          calendarVisible: 'false'
	        };
	      }
	    }, {
	      key: 'createExtData',
	      value: function createExtData(extData) {
	        var config = {};
	        config.disabled = extData.disabled || 'false';
	        config.layout = extData.layout || 'inline';
	        config.orientation = extData.orientation || 'horizontal';
	        config.position = extData.position || 'top';
	        config.alignment = extData.alignment || 'right';
	        config.dateFormat = extData.dateFormat || '%d-%m-%Y';
	        config.fromText = extData.fromText || 'From:';
	        config.toText = extData.toText || 'To:';
	        config.styles = extData.styles || {
	          'width': 120,
	          'height': 22,

	          'font-family': '"Lucida Grande", sans-serif',
	          'font-size': 13,
	          'font-color': '#4B4B4B',

	          'input-fill': '#FFFFFF',
	          'input-border-thickness': 1,
	          'input-border-color': '#CED5D4',
	          'input-border-radius': 1,

	          'input-focus-fill': '#FFFFFF',
	          'input-focus-border-thickness': 1,
	          'input-focus-border-color': '#1E1F1F',

	          'input-error-fill': '#FFEFEF',
	          'input-error-border-thickness': 1,
	          'input-error-border-color': '#D25353'
	        };
	        return config;
	      }

	      /**
	       * Fusioncharts life cycle method for extension
	       */

	    }, {
	      key: 'init',
	      value: function init(require) {
	        var instance = this;
	        require(['xAxis', 'graphics', 'chart', 'dataset', 'globalReactiveModel', 'spaceManagerInstance', 'extData', 'smartLabel', 'chartInstance', function (xAxis, graphics, chart, dataset, globalReactiveModel, spaceManagerInstance, extData, smartLabel, chartInstance) {
	          instance.xAxis = xAxis;
	          instance.graphics = graphics;
	          instance.chart = chart;
	          instance.dataset = dataset;
	          instance.globalReactiveModel = globalReactiveModel;
	          instance.spaceManagerInstance = spaceManagerInstance;
	          instance.config = instance.createExtData(extData);
	          instance.smartLabel = smartLabel;
	          instance.chartInstance = chartInstance;
	        }]);
	        instance.startDt = instance.globalReactiveModel.model['x-axis-visible-range-start'];
	        instance.endDt = instance.globalReactiveModel.model['x-axis-visible-range-end'];
	        instance.toolbars = [];
	        instance.measurement = {};
	        instance.toolbars.push(instance.createToolbar());
	        return instance;
	      }
	    }, {
	      key: 'createToolbar',
	      value: function createToolbar() {
	        var toolbar,
	            self = this,
	            fromDateLabel,
	            toDateLabel,
	            group,
	            fromFormattedDate,
	            toFormattedDate;

	        self.fromDate = {};
	        self.toDate = {};

	        fromFormattedDate = this.getDate(this.startDt);
	        toFormattedDate = this.getDate(this.endDt);
	        toolbar = new this.HorizontalToolbar({
	          paper: this.graphics.paper,
	          chart: this.chart,
	          smartLabel: this.smartLabel,
	          chartContainer: this.graphics.container
	        });

	        toolbar.setConfig({
	          'fill': '#FFFFFF',
	          'borderThickness': 0
	        });

	        group = new this.toolbox.ComponentGroup({
	          paper: this.graphics.paper,
	          chart: this.chart,
	          smartLabel: this.smartLabel,
	          chartContainer: this.graphics.container
	        });

	        group.setConfig({
	          'fill': '#FFFFFF',
	          'borderThickness': 0
	        });

	        fromDateLabel = new this.toolbox.Label(this.config['fromText'], {
	          smartLabel: this.smartLabel,
	          paper: this.graphics.paper
	        }, {
	          text: {
	            style: {
	              'font-size': this.config.styles['font-size'],
	              'font-family': this.config.styles['font-family'],
	              'fill': this.config.styles['font-color']
	            }
	          }
	        });

	        toDateLabel = new this.toolbox.Label(this.config['toText'], {
	          smartLabel: this.smartLabel,
	          paper: this.graphics.paper
	        }, {
	          text: {
	            style: {
	              'font-size': this.config.styles['font-size'],
	              'font-family': this.config.styles['font-family'],
	              'fill': this.config.styles['font-color']
	            }
	          }
	        });

	        self.fromDate = new this.toolbox.InputTextBoxSymbol({
	          width: this.config.styles['width'],
	          height: this.config.styles['height']
	        }, {
	          paper: this.graphics.paper,
	          chart: this.chart,
	          smartLabel: this.smartLabel,
	          chartContainer: this.graphics.container
	        }, {
	          'strokeWidth': this.config.styles['input-border-thickness'],
	          'fill': this.config.styles['input-fill'],
	          'stroke': this.config.styles['input-border-color'],
	          'radius': this.config.styles['input-border-radius'],
	          'btnTextStyle': {
	            'font-family': this.config.styles['font-family'],
	            'fontSize': this.config.styles['font-size']
	          },
	          'label': fromFormattedDate,
	          'labelFill': this.config.styles['font-color']
	        });

	        self.fromDate.addCustomState('errored', {
	          config: {
	            hover: {
	              'fill': this.config.styles['input-error-fill'],
	              'stroke-width': this.config.styles['input-error-border-thickness'],
	              'stroke': this.config.styles['input-error-border-color']
	            },
	            normal: {
	              'fill': this.config.styles['input-error-fill'],
	              'stroke-width': this.config.styles['input-error-border-thickness'],
	              'stroke': this.config.styles['input-error-border-color']
	            },
	            pressed: {
	              'fill': this.config.styles['input-error-fill'],
	              'stroke-width': this.config.styles['input-error-border-thickness'],
	              'stroke': this.config.styles['input-error-border-color']
	            }
	          }
	        });

	        self.fromDate.setStateConfig({
	          pressed: {
	            config: {
	              pressed: {
	                'fill': this.config.styles['input-focus-fill'],
	                'stroke-width': this.config.styles['input-focus-border-thickness'],
	                'stroke': this.config.styles['input-focus-border-color']
	              },
	              normal: {
	                'fill': this.config.styles['input-focus-fill'],
	                'stroke-width': this.config.styles['input-focus-border-thickness'],
	                'stroke': this.config.styles['input-focus-border-color']
	              },
	              hover: {
	                'fill': this.config.styles['input-focus-fill'],
	                'stroke-width': this.config.styles['input-focus-border-thickness'],
	                'stroke': this.config.styles['input-focus-border-color']
	              }
	            }
	          },
	          enabled: {
	            config: {
	              pressed: {
	                'fill': this.config.styles['input-fill'],
	                'stroke-width': this.config.styles['input-border-thickness'],
	                'stroke': this.config.styles['input-border-color']
	              },
	              normal: {
	                'fill': this.config.styles['input-fill'],
	                'stroke-width': this.config.styles['input-border-thickness'],
	                'stroke': this.config.styles['input-border-color']
	              },
	              hover: {
	                'fill': this.config.styles['input-fill'],
	                'stroke-width': this.config.styles['input-border-thickness'],
	                'stroke': this.config.styles['input-border-color']
	              }
	            }
	          }
	        });

	        self.toDate = new this.toolbox.InputTextBoxSymbol({
	          width: this.config.styles['width'],
	          height: this.config.styles['height']
	        }, {
	          paper: this.graphics.paper,
	          chart: this.chart,
	          smartLabel: this.smartLabel,
	          chartContainer: this.graphics.container
	        }, {
	          'strokeWidth': this.config.styles['input-border-thickness'],
	          'fill': this.config.styles['input-fill'],
	          'stroke': this.config.styles['input-border-color'],
	          'radius': this.config.styles['input-border-radius'],
	          'btnTextStyle': {
	            'font-family': this.config.styles['font-family'],
	            'fontSize': this.config.styles['font-size']
	          },
	          'label': toFormattedDate,
	          'labelFill': this.config.styles['font-color']
	        });

	        self.toDate.addCustomState('errored', {
	          config: {
	            hover: {
	              'fill': this.config.styles['input-error-fill'],
	              'stroke-width': this.config.styles['input-error-border-thickness'],
	              'stroke': this.config.styles['input-error-border-color']
	            },
	            normal: {
	              'fill': this.config.styles['input-error-fill'],
	              'stroke-width': this.config.styles['input-error-border-thickness'],
	              'stroke': this.config.styles['input-error-border-color']
	            },
	            pressed: {
	              'fill': this.config.styles['input-error-fill'],
	              'stroke-width': this.config.styles['input-error-border-thickness'],
	              'stroke': this.config.styles['input-error-border-color']
	            }
	          }
	        });

	        self.toDate.setStateConfig({
	          pressed: {
	            config: {
	              pressed: {
	                'fill': this.config.styles['input-focus-fill'],
	                'stroke-width': this.config.styles['input-focus-border-thickness'],
	                'stroke': this.config.styles['input-focus-border-color']
	              },
	              normal: {
	                'fill': this.config.styles['input-focus-fill'],
	                'stroke-width': this.config.styles['input-focus-border-thickness'],
	                'stroke': this.config.styles['input-focus-border-color']
	              },
	              hover: {
	                'fill': this.config.styles['input-focus-fill'],
	                'stroke-width': this.config.styles['input-focus-border-thickness'],
	                'stroke': this.config.styles['input-focus-border-color']
	              }
	            },
	            enabled: {
	              config: {
	                pressed: {
	                  'fill': this.config.styles['input-fill'],
	                  'stroke-width': this.config.styles['input-border-thickness'],
	                  'stroke': this.config.styles['input-border-color']
	                },
	                normal: {
	                  'fill': this.config.styles['input-fill'],
	                  'stroke-width': this.config.styles['input-border-thickness'],
	                  'stroke': this.config.styles['input-border-color']
	                },
	                hover: {
	                  'fill': this.config.styles['input-fill'],
	                  'stroke-width': this.config.styles['input-border-thickness'],
	                  'stroke': this.config.styles['input-border-color']
	                }
	              }
	            }
	          }
	        });

	        self.fromDate.attachEventHandlers({
	          click: {
	            fn: function fn() {
	              self.fromDate.edit();
	              self.fromDate.updateVisual('pressed');
	            }
	          },
	          keypress: function keypress(e) {
	            var event = e || window.event,
	                charCode = event.which || event.keyCode;
	            if (charCode === 13) {
	              self.fromDate.blur();
	              self.startDate = self.fromDate.getText();
	              if (self.fromDate.state !== 'errored') {
	                self.fromDate.updateVisual('enabled');
	              }
	            }
	          },
	          textOnBlur: function textOnBlur() {
	            self.fromDate.blur();
	            self.startDate = self.fromDate.getText();
	            if (self.fromDate.state !== 'errored') {
	              self.fromDate.updateVisual('enabled');
	            }
	          }
	        });

	        self.toDate.attachEventHandlers({
	          click: {
	            fn: function fn() {
	              self.toDate.edit();
	              self.toDate.updateVisual('pressed');
	            }
	          },
	          keypress: function keypress(e) {
	            var event = e || window.event,
	                charCode = event.which || event.keyCode;
	            if (charCode === 13) {
	              self.toDate.blur();
	              self.endDate = self.toDate.getText();
	              if (self.toDate.state !== 'errored') {
	                self.toDate.updateVisual('enabled');
	              }
	            }
	          },
	          textOnBlur: function textOnBlur() {
	            self.toDate.blur();
	            self.endDate = self.toDate.getText();
	            if (self.toDate.state !== 'errored') {
	              self.toDate.updateVisual('enabled');
	            }
	          }
	        });

	        // Temporary. Required to render the text box correctly. Commenting this out distorts toolbox.
	        this.SymbolStore.register('textBoxIcon', function (x, y, rad, w, h, padX, padY) {
	          var x1 = x - w / 2 + padX / 2,
	              x2 = x + w / 2 - padX / 2,
	              y1 = y - h / 2 + padY / 2,
	              y2 = y + h / 2 - padY / 2;

	          return ['M', x1, y1, 'L', x2, y1, 'L', x2, y2, 'L', x1, y2, 'Z'];
	        });

	        group.addSymbol(fromDateLabel);
	        group.addSymbol(self.fromDate);
	        group.addSymbol(toDateLabel);
	        group.addSymbol(self.toDate);
	        toolbar.addComponent(group);
	        return toolbar;
	      }
	    }, {
	      key: 'getLogicalSpace',
	      value: function getLogicalSpace(availableWidth, availableHeight) {
	        var logicalSpace,
	            width = 0,
	            height = 0,
	            i,
	            ln;

	        availableWidth /= 2;

	        for (i = 0, ln = this.toolbars.length; i < ln; i++) {
	          logicalSpace = this.toolbars[i].getLogicalSpace(availableWidth, availableHeight);
	          width = Math.max(logicalSpace.width, width);
	          height += logicalSpace.height;
	          this.toolbars[i].width = logicalSpace.width;
	          this.toolbars[i].height = logicalSpace.height;
	        }
	        height += this.padding;
	        return {
	          width: width,
	          height: height
	        };
	      }
	    }, {
	      key: 'placeInCanvas',
	      value: function placeInCanvas() {
	        var _self = this;
	        _self.padding = 5;
	        _self.spaceManagerInstance.add([{
	          name: function name() {
	            return 'DateRangeChooserToolbox';
	          },
	          ref: function ref(obj) {
	            return obj['0'];
	          },
	          self: function self() {
	            return _self;
	          },
	          priority: function priority() {
	            return 2;
	          },
	          layout: function layout(obj) {
	            return obj[_self.config.layout];
	          },
	          orientation: [{
	            type: function type(obj) {
	              return obj[_self.config.orientation];
	            },
	            position: [{
	              type: function type(obj) {
	                return obj[_self.config.position];
	              },
	              alignment: [{
	                type: function type(obj) {
	                  return obj[_self.config.alignment];
	                },
	                dimensions: [function () {
	                  var parent = this.getParentComponentGroup();
	                  return _self.getLogicalSpace(parent.getWidth(), parent.getHeight());
	                }]
	              }]
	            }]
	          }]
	        }]);
	      }
	    }, {
	      key: 'setDrawingConfiguration',
	      value: function setDrawingConfiguration(x, y, width, height, group) {
	        var mes = this.measurement;
	        mes.x = x;
	        mes.y = y;
	        mes.width = width;
	        mes.height = height;

	        this.parentGroup = group;

	        return this;
	      }
	    }, {
	      key: 'draw',
	      value: function draw(x, y, width, height, group) {
	        var self = this,
	            measurement = self.measurement,
	            toolbars = self.toolbars,
	            ln = void 0,
	            i = void 0,
	            toolbar = void 0,
	            model = self.globalReactiveModel;

	        x = x === undefined ? measurement.x : x;
	        y = y === undefined ? measurement.y : y;
	        width = width === undefined ? measurement.width : width;
	        height = height === undefined ? measurement.height : height;
	        group = group === undefined ? self.parentGroup : group;
	        if (width && height) {
	          self.isDrawn = true;
	          for (i = 0, ln = toolbars.length; i < ln; i++) {
	            toolbar = toolbars[i];
	            toolbar.draw(x, y, group);
	          }
	          model.onPropsChange(['x-axis-visible-range-start', 'x-axis-visible-range-end'], function (start, end) {
	            // self.fromDate.blur(new Date(start[1]).toLocaleDateString());
	            // self.toDate.blur(new Date(end[1]).toLocaleDateString());
	            self.startDt = start[1];
	            self.fromDate.blur(self.getDate(start[1]));
	            self.fromDate.updateVisual('enabled');
	            self.endDt = end[1];
	            self.toDate.blur(self.getDate(end[1]));
	            self.fromDate.updateVisual('enabled');
	          });
	        }
	        self.startDataset = self.globalReactiveModel.model['x-axis-absolute-range-start'];
	        self.endDataset = self.globalReactiveModel.model['x-axis-absolute-range-end'];
	        self.maxXAxisTicks = self.globalReactiveModel.model['x-axis-maximum-allowed-ticks'];
	        self.maxXAxisTicks = self.globalReactiveModel.model['x-axis-maximum-allowed-ticks'];
	        self.minDatestampDiff = self.globalReactiveModel.model['minimum-consecutive-datestamp-diff'];
	        self.minActiveInterval = self.maxXAxisTicks * self.minDatestampDiff;
	      }
	    }, {
	      key: 'startDate',
	      get: function get() {
	        return this.startDt;
	      },
	      set: function set(startDt) {
	        var startTimestamp = this.getTimestamp(startDt),
	            absoluteStart = this.globalReactiveModel.model['x-axis-absolute-range-start'],
	            minDiff = this.minActiveInterval,
	            actualDiff = this.endDt - startTimestamp;
	        if (startTimestamp <= this.endDt && startTimestamp >= absoluteStart && actualDiff > minDiff) {
	          this.startDt = startTimestamp;
	          this.globalReactiveModel.model['x-axis-visible-range-start'] = this.startDt;
	        } else {
	          this.fromDate.updateVisual('errored');
	        }
	      }
	    }, {
	      key: 'endDate',
	      get: function get() {
	        return this.endDt;
	      },
	      set: function set(endDt) {
	        var endTimestamp = this.getTimestamp(endDt),
	            absoluteEnd = this.globalReactiveModel.model['x-axis-absolute-range-end'],
	            minDiff = this.minActiveInterval,
	            actualDiff = endTimestamp - this.startDt;
	        if (endTimestamp >= this.startDt && endTimestamp <= absoluteEnd && actualDiff > minDiff) {
	          this.endDt = endTimestamp;
	          this.globalReactiveModel.model['x-axis-visible-range-end'] = this.endDt;
	        } else {
	          this.toDate.updateVisual('errored');
	        }
	      }
	    }]);

	    return DateRange;
	  }();

	  return DateRange;
	};

/***/ }
/******/ ]);