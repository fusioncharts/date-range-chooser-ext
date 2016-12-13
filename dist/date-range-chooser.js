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

	'use strict';
	const DateRange = __webpack_require__(1);

	;(function (env, factory) {
	  if (typeof module === 'object' && module.exports) {
	    module.exports = env.document
	       ? factory(env) : function (win) {
	         if (!win.document) {
	           throw new Error('Window with document not present');
	         }
	         return factory(win, true);
	       };
	  } else {
	    env.DateRangeChooser = factory(env, true);
	  }
	})(typeof window !== 'undefined' ? window : this, function (_window, windowExists) {
	  var FC = _window.FusionCharts;
	  FC.register('extension', ['private', 'date-range-chooser', function () {
	    var DateTimeFormatter = this.hcLib.DateTimeFormatter;
	    FC.registerComponent('extensions', 'date-range-chooser', DateRange({FusionCharts: FC,
	      DateTimeFormatter: DateTimeFormatter}));
	  }]);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (dep) {
	  /**
	   * Class representing the DateRange.
	   */
	  class DateRange {
	    constructor () {
	      /**
	       * @private
	       */
	      this.startDt = 0;
	      this.endDt = 0;
	      this.startDataset = 0;
	      this.endDataset = 0;
	      if (typeof dep.FusionCharts === 'function') {
	        this.toolbox = dep.FusionCharts.getComponent('api', 'toolbox');
	      } else {
	        throw new Error('Unable to find FusionCharts.');
	      }
	      if (typeof dep.FusionCharts === 'function') {
	        this.DateTimeFormatter = dep.DateTimeFormatter;
	      } else {
	        throw new Error('Unable to find DateTimeFormatter.');
	      }
	      this.HorizontalToolbar = this.toolbox.HorizontalToolbar;
	      this.ComponentGroup = this.toolbox.ComponentGroup;
	      this.isDrawn = false;
	      this.startTooltipErrorMsg = '';
	      this.endTooltipErrorMsg = '';
	      this.createObjectAssign();
	    }

	    /**
	     * An object representing the start and end dates.
	     * @type {DateRange.range}
	     */
	    get startDate () {
	      return this.startDt;
	    }

	    set startDate (startDt) {
	      let startTimestamp = this.getTimestamp(startDt),
	        newDate = this.getDate(this.startDt),
	        absoluteStart = this.globalReactiveModel.model['x-axis-absolute-range-start'],
	        absoluteEnd = this.globalReactiveModel.model['x-axis-absolute-range-end'],
	        minDiff = this.minActiveInterval,
	        actualDiff = this.endDt - startTimestamp;
	      if (newDate !== startDt) {
	        if (this.isBetween(startTimestamp, absoluteStart, absoluteEnd) &&
	          this.isBeforeOrEqualTo(startTimestamp, this.endDt) &&
	          this.diffIsGreaterThan(actualDiff, minDiff)) {
	          this.startDt = startTimestamp;
	          this.globalReactiveModel.model['x-axis-visible-range-start'] = this.startDt;
	        } else {
	          this.toError.group.hide();
	          this.fromDate.updateVisual('errored');
	        }
	      } else {
	        if (this.fromDate.state === 'errored') {
	          this.fromDate.updateVisual('enabled');
	        }
	      }
	    }

	    isBeforeOrEqualTo (startTimestamp, endTimestamp) {
	      if (startTimestamp <= endTimestamp) {
	        return true;
	      } else {
	        this.startTooltipErrorMsg =
	        '<span style="color: ' +
	        this.config.styles['input-error-tooltip-font-color'] +
	        '">Date must be less than end date!</span>';
	        this.setErrorMsg(this.fromError, 'Date must be less than end date!');
	        // this.fromError.group.show();
	        return false;
	      }
	    }

	    get endDate () {
	      return this.endDt;
	    }

	    set endDate (endDt) {
	      let endTimestamp = this.getTimestamp(endDt),
	        newDate = this.getDate(this.endDt),
	        absoluteStart = this.globalReactiveModel.model['x-axis-absolute-range-start'],
	        absoluteEnd = this.globalReactiveModel.model['x-axis-absolute-range-end'],
	        minDiff = this.minActiveInterval,
	        actualDiff = endTimestamp - this.startDt;
	      if (newDate !== endDt) {
	        if (this.isBetween(endTimestamp, absoluteStart, absoluteEnd) &&
	          this.isAfterOrEqualTo(endTimestamp, this.startDt) &&
	          this.diffIsGreaterThan(actualDiff, minDiff)) {
	          this.endDt = endTimestamp;
	          this.globalReactiveModel.model['x-axis-visible-range-end'] = this.endDt;
	        } else {
	          this.fromError.group.hide();
	          this.toDate.updateVisual('errored');
	        }
	      } else {
	        if (this.toDate.state === 'errored') {
	          this.toDate.updateVisual('enabled');
	        }
	      }
	    }

	    isAfterOrEqualTo (endTimestamp, startTimestamp) {
	      if (endTimestamp >= startTimestamp) {
	        return true;
	      } else {
	        this.endTooltipErrorMsg =
	        '<span style="color: ' +
	        this.config.styles['input-error-tooltip-font-color'] +
	        '">Date must be greater than start date!</span>';
	        this.setErrorMsg(this.toError, 'Date must be greater than start date!');
	        // this.toError.group.show();
	        return false;
	      }
	    }

	    isBetween (timestamp, absoluteStart, absoluteEnd) {
	      if (timestamp >= absoluteStart && timestamp <= absoluteEnd) {
	        return true;
	      } else {
	        this.startTooltipErrorMsg = this.endTooltipErrorMsg =
	        '<span style="color: ' +
	        this.config.styles['input-error-tooltip-font-color'] +
	        '">Date out of bounds!</span>';
	        this.setErrorMsg(this.fromError, 'Date out of bounds!');
	        this.setErrorMsg(this.toError, 'Date out of bounds!');
	        return false;
	      }
	    }

	    diffIsGreaterThan (actualDiff, minDiff) {
	      if (actualDiff > minDiff) {
	        return true;
	      } else {
	        this.startTooltipErrorMsg = this.endTooltipErrorMsg =
	        '<span style="color: ' +
	        this.config.styles['input-error-tooltip-font-color'] +
	        '">Zoom limit exceeded!</span>';
	        this.setErrorMsg(this.fromError, 'Zoom limit exceeded!');
	        this.setErrorMsg(this.toError, 'Zoom limit exceeded!');
	        return false;
	      }
	    }

	    getTimestamp (dateStr) {
	      let dateFormat = this.config.dateFormat,
	        dateFormatter = new dep.DateTimeFormatter(dateFormat);
	      return +dateFormatter.getNativeDate(dateStr);
	    }

	    getDate (timestamp) {
	      var dateFormat = this.config.dateFormat;
	      return this.DateTimeFormatter.formatAs(timestamp, dateFormat);
	    }

	    /**
	     * Sets the configurable options of the extension (e.g. cosmetics)
	     * @param {Object} configObj The configuration object containing various extension options
	     */
	    setConfig (configObj) {}

	    /**
	     * Gets the configurable options of the extension (e.g. cosmetics)
	     * @return {object} configObj The configuration object containing various extension options
	     */
	    getConfig () {
	      return {
	        calendarVisible: 'false'
	      };
	    }

	    createConfig (extData) {
	      let config = {},
	        defaultStyles = {
	          'width': 120,
	          'height': 22,

	          'font-family': '"Lucida Grande", sans-serif',
	          'font-size': 13,
	          'font-color': '#4B4B4B',

	          'input-fill': '#FFFFFF',
	          'input-border-thickness': 1,
	          'input-border-color': '#CED5D4',
	          'input-border-radius': 1,
	          'input-shadow-fill': '#000000',
	          'input-shadow-opacity': 0.35,

	          'input-focus-fill': '#FFFFFF',
	          'input-focus-border-thickness': 1,
	          'input-focus-border-color': '#1E1F1F',

	          'input-error-fill': '#FFEFEF',
	          'input-error-border-thickness': 1,
	          'input-error-border-color': '#D25353',
	          'input-error-tooltip-font-color': '#FF0000'
	        };
	      config.disabled = extData.disabled || false;
	      config.layout = extData.layout || 'inline';
	      config.orientation = extData.orientation || 'horizontal';
	      config.position = extData.position || 'top';
	      config.alignment = extData.alignment || 'right';
	      config.dateFormat = extData.dateFormat || '%d-%m-%Y';
	      config.fromText = extData.fromText || 'From:';
	      config.fromTooltipText = extData.fromTooltipText || 'From Date';
	      config.toText = extData.toText || 'To:';
	      config.toTooltipText = extData.toTooltipText || 'To Date';
	      config.styles = Object.assign(defaultStyles, extData.styles);
	      return config;
	    }

	    createErrorGroup (symbol, id) {
	      let self = this,
	        paper = self.graphics.paper,
	        circle,
	        crossPath,
	        cross,
	        rect,
	        text,
	        group,
	        textBBox,
	        circleBBox,
	        rectBBox,
	        symbolBBox,
	        orientation = self.config.orientation,
	        position = self.config.position;

	      if (orientation === 'horizontal') {
	        if (position === 'top') {
	          symbolBBox = symbol.getBoundElement().getBBox();
	          group = paper.group('error-group');

	          rect = paper.rect(symbolBBox.x,
	            symbolBBox.y - symbolBBox.height - 4, 20, 20, group);
	          rectBBox = rect.getBBox();

	          circle = paper.circle(symbolBBox.x + 5 + 4,
	            symbolBBox.y - symbolBBox.height - 4 + 5 + 5, 6, group);
	          circleBBox = circle.getBBox();

	          crossPath = this.getCrossPath(circleBBox, 4);
	          cross = paper.path(crossPath, group);

	          text = paper.text(circleBBox.x + circleBBox.width + 4, rectBBox.y + 2,
	            '', group);
	          textBBox = text.getBBox();
	        } else if (position === 'bottom') {
	          symbolBBox = symbol.getBoundElement().getBBox();
	          group = paper.group('error-group');

	          rect = paper.rect(symbolBBox.x,
	            symbolBBox.y + symbolBBox.height + 4, 20, 20, group);
	          rectBBox = rect.getBBox();

	          circle = paper.circle(symbolBBox.x + 5 + 4,
	            symbolBBox.y + symbolBBox.height + 4 + 5 + 5, 6, group);
	          circleBBox = circle.getBBox();

	          crossPath = this.getCrossPath(circleBBox, 4);
	          cross = paper.path(crossPath, group);

	          text = paper.text(circleBBox.x + circleBBox.width + 4, rectBBox.y + 2,
	            '', group);
	          textBBox = text.getBBox();
	        }
	      } else if (orientation === 'vertical') {
	        symbolBBox = symbol.getBoundElement().getBBox();
	        group = paper.group('error-group');

	        if (id === 'fromError') {
	          rect = paper.rect(symbolBBox.x,
	            symbolBBox.y - symbolBBox.height - 4, 20, 20, group);
	          rectBBox = rect.getBBox();

	          circle = paper.circle(symbolBBox.x + 5 + 4,
	            symbolBBox.y - symbolBBox.height - 4 + 5 + 5, 6, group);
	          circleBBox = circle.getBBox();
	        } else if (id === 'toError') {
	          rect = paper.rect(symbolBBox.x,
	            symbolBBox.y + symbolBBox.height + 4, 20, 20, group);
	          rectBBox = rect.getBBox();

	          circle = paper.circle(symbolBBox.x + 5 + 4,
	            symbolBBox.y + symbolBBox.height + 4 + 5 + 5, 6, group);
	          circleBBox = circle.getBBox();
	        }

	        crossPath = this.getCrossPath(circleBBox, 4);
	        cross = paper.path(crossPath, group);

	        text = paper.text(circleBBox.x + circleBBox.width + 4, rectBBox.y + 2,
	          '', group);
	        textBBox = text.getBBox();
	      }

	      circle.attr({
	        'stroke': '#d71f26',
	        'stroke-width': '1',
	        'fill': 'none'
	      });
	      cross.attr({
	        'stroke': '#000000',
	        'stroke-width': '1.5'
	      });
	      text.attr({
	        'text-anchor': 'start',
	        'y': textBBox.y + textBBox.height,
	        'fill': '#D80000',
	        'font-family': '"Lucida Grande", sans-serif',
	        'font-size': '12'
	      });
	      rect.attr({
	        'fill': '#FFFFFF',
	        'fill-opacity': '0.8',
	        'stroke-width': '0',
	        'width': textBBox.width + circleBBox.width
	      });
	      group.attr({
	        visibility: 'hidden'
	      });

	      return {
	        'group': group,
	        'cross': cross,
	        'circle': circle,
	        'rect': rect,
	        'text': text
	      };
	    }

	    getCrossPath (circleBox, padding) {
	      // M478,77L483,82M478,82L483,77
	      let circleX1 = Math.round(circleBox.x),
	        circleY1 = Math.round(circleBox.y),
	        circleX2 = Math.round(circleBox.x2),
	        circleY2 = Math.round(circleBox.y2),
	        crossX1 = circleX1 + 4,
	        crossY1 = circleY1 + 2,
	        crossX2 = circleX2 - 4,
	        crossY2 = circleY2 - 3,
	        pathStr = 'M' + crossX1 + ',' + crossY1 + 'L' + crossX2 + ',' + crossY2;
	      pathStr += 'M' + crossX1 + ',' + crossY2 + 'L' + crossX2 + ',' + crossY1;
	      return pathStr;
	    }

	    setErrorMsg (errorGroup, errorMsg) {
	      let canvasImpl = this.chartInstance.apiInstance.getCanvasInstances()[0],
	        canvasX = canvasImpl.measurement.x,
	        canvasWidth = canvasImpl.measurement.width,
	        canvasEnd = canvasX + canvasWidth,
	        errorRectX,
	        errorRectWidth,
	        errorRectEnd;

	      if (errorGroup.text.attr('text') === errorMsg) {
	        return;
	      }
	      errorGroup.text.attr('text', errorMsg);
	      errorGroup.rect.attr('width',
	        errorGroup.text.getBBox().width + (4 * 2) + errorGroup.circle.getBBox().width + 2);

	      errorRectX = errorGroup.rect.getBBox().x;
	      errorRectWidth = errorGroup.rect.getBBox().width;
	      errorRectEnd = errorRectX + errorRectWidth;
	      if (errorRectEnd > canvasEnd) {
	        let diff = errorRectEnd - canvasEnd;
	        errorGroup.rect.attr('x', errorRectX - diff);
	        errorGroup.circle.attr('cx', errorGroup.circle.getBBox().x - diff + 5);
	        errorGroup.cross.translate(-diff - 1, 0);
	        errorGroup.text.attr('x', errorGroup.text.getBBox().x - diff);
	      }
	    }

	    createObjectAssign () {
	      if (typeof Object.assign !== 'function') {
	        Object.assign = function (target, varArgs) {
	          'use strict';
	          if (target == null) {
	            throw new TypeError('Cannot convert undefined or null to object');
	          }

	          var to = Object(target);

	          for (let index = 1; index < arguments.length; index++) {
	            let nextSource = arguments[index];

	            if (nextSource != null) {
	              for (let nextKey in nextSource) {
	                // Avoid bugs when hasOwnProperty is shadowed
	                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
	                  to[nextKey] = nextSource[nextKey];
	                }
	              }
	            }
	          }
	          return to;
	        };
	      }
	    }

	    /**
	     * Fusioncharts life cycle method for extension
	     */
	    init (require) {
	      var instance = this;
	      require([
	        'xAxis',
	        'graphics',
	        'chart',
	        'dataset',
	        'globalReactiveModel',
	        'spaceManagerInstance',
	        'extData',
	        'smartLabel',
	        'chartInstance',
	        function (
	          xAxis,
	          graphics,
	          chart,
	          dataset,
	          globalReactiveModel,
	          spaceManagerInstance,
	          extData,
	          smartLabel,
	          chartInstance) {
	          instance.xAxis = xAxis;
	          instance.graphics = graphics;
	          instance.chart = chart;
	          instance.dataset = dataset;
	          instance.globalReactiveModel = globalReactiveModel;
	          instance.spaceManagerInstance = spaceManagerInstance;
	          instance.config = instance.createConfig(extData);
	          instance.smartLabel = smartLabel;
	          instance.chartInstance = chartInstance;
	        }
	      ]);
	      instance.startDt = instance.globalReactiveModel.model['x-axis-visible-range-start'];
	      instance.endDt = instance.globalReactiveModel.model['x-axis-visible-range-end'];
	      instance.toolbars = [];
	      instance.measurement = {};
	      instance.toolbars.push(instance.createToolbar());
	      return instance;
	    };

	    createToolbar () {
	      var toolbar,
	        self = this,
	        fromDateLabel,
	        toDateLabel,
	        fromGroup,
	        toGroup,
	        fromFormattedDate,
	        toFormattedDate;

	      let fromDateEventConfig = {},
	        toDateEventConfig = {};

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

	      fromGroup = new this.toolbox.ComponentGroup({
	        paper: this.graphics.paper,
	        chart: this.chart,
	        smartLabel: this.smartLabel,
	        chartContainer: this.graphics.container
	      });

	      toGroup = new this.toolbox.ComponentGroup({
	        paper: this.graphics.paper,
	        chart: this.chart,
	        smartLabel: this.smartLabel,
	        chartContainer: this.graphics.container
	      });

	      fromGroup.setConfig({
	        'fill': '#FFFFFF',
	        'borderThickness': 0
	      });

	      toGroup.setConfig({
	        'fill': '#FFFFFF',
	        'borderThickness': 0
	      });

	      fromDateLabel = new this.toolbox.Label(
	        this.config['fromText'], {
	          smartLabel: this.smartLabel,
	          paper: this.graphics.paper
	        }, {
	          text: {
	            style: {
	              'font-size': this.config.styles['font-size'],
	              'font-family': this.config.styles['font-family'],
	              'fill': this.config.styles['font-color']
	            }
	          },
	          container: {
	            'width': 40
	          }
	        }
	      );

	      toDateLabel = new this.toolbox.Label(
	        this.config['toText'], {
	          smartLabel: this.smartLabel,
	          paper: this.graphics.paper
	        }, {
	          text: {
	            style: {
	              'font-size': this.config.styles['font-size'],
	              'font-family': this.config.styles['font-family'],
	              'fill': this.config.styles['font-color'],
	              'text-anchor': 'start'
	            }
	          },
	          container: {
	            'width': 40
	          }
	        }
	      );

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
	          'fontFamily': this.config.styles['font-family'],
	          'fontSize': this.config.styles['font-size']
	        },
	        'shadow': {
	          'fill': this.config.styles['input-shadow-fill'],
	          'opacity': this.config.styles['input-shadow-opacity']
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
	          'fontFamily': this.config.styles['font-family'],
	          'fontSize': this.config.styles['font-size']
	        },
	        'shadow': {
	          'fill': this.config.styles['input-shadow-fill'],
	          'opacity': this.config.styles['input-shadow-opacity']
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

	      fromDateEventConfig = {
	        click: {
	          fn: function () {
	            if (self.fromDate.state === 'errored' &&
	              self.fromError.text.attr('text') !== '') {
	              self.toError.group.hide();
	              self.fromError.group.show();
	            }
	            self.fromDate.edit();
	            self.fromDate.updateVisual('pressed');
	          }
	        },
	        // tooltext: self.config.fromTooltipText,
	        keypress: (e) => {
	          let event = e || window.event,
	            charCode = event.which || event.keyCode;
	          if (charCode === 13) {
	            self.startDate = self.fromDate.getText();
	            if (self.fromDate.state !== 'errored') {
	              self.fromDate.blur();
	              self.fromError.group.hide();
	              // self.fromDate.svgElems.node.tooltip(self.config.fromTooltipText);
	              self.fromDate.updateVisual('enabled');
	            } else {
	              self.fromError.group.show();
	              // self.fromDate.svgElems.node.tooltip(self.startTooltipErrorMsg);
	            }
	          }
	        },
	        textOnBlur: function () {
	          self.fromDate.blur();
	          self.startDate = self.fromDate.getText();
	          if (self.fromDate.state !== 'errored') {
	            self.fromDate.blur();
	            self.fromError.group.hide();
	            // self.fromDate.svgElems.node.tooltip(self.config.fromTooltipText);
	            self.fromDate.updateVisual('enabled');
	          } else {
	            self.fromError.group.show();
	            // self.fromDate.svgElems.node.tooltip(self.startTooltipErrorMsg);
	          }
	        }
	      };

	      self.fromDate.attachEventHandlers(fromDateEventConfig);

	      toDateEventConfig = {
	        click: {
	          fn: () => {
	            if (self.toDate.state === 'errored' &&
	              self.toError.text.attr('text') !== '') {
	              self.fromError.group.hide();
	              self.toError.group.show();
	            }
	            self.toDate.edit();
	            self.toDate.updateVisual('pressed');
	          }
	        },
	        // tooltext: self.config.toTooltipText,
	        keypress: (e) => {
	          let event = e || window.event,
	            charCode = event.which || event.keyCode;
	          if (charCode === 13) {
	            self.endDate = self.toDate.getText();
	            if (self.toDate.state !== 'errored') {
	              self.toDate.blur();
	              self.toError.group.hide();
	              // self.toDate.svgElems.node.tooltip(self.config.toTooltipText);
	              self.toDate.updateVisual('enabled');
	            } else {
	              self.toError.group.show();
	              // self.toDate.svgElems.node.tooltip(self.endTooltipErrorMsg);
	            }
	          }
	        },
	        textOnBlur: function () {
	          self.toDate.blur();
	          self.endDate = self.toDate.getText();
	          if (self.toDate.state !== 'errored') {
	            self.toDate.blur();
	            self.toError.group.hide();
	            // self.toDate.svgElems.node.tooltip(self.config.toTooltipText);
	            self.toDate.updateVisual('enabled');
	          } else {
	            self.toError.group.show();
	            // self.toDate.svgElems.node.tooltip(self.endTooltipErrorMsg);
	          }
	        }
	      };

	      self.toDate.attachEventHandlers(toDateEventConfig);

	      fromGroup.addSymbol(fromDateLabel);
	      fromGroup.addSymbol(self.fromDate);
	      toGroup.addSymbol(toDateLabel);
	      toGroup.addSymbol(self.toDate);
	      toolbar.addComponent(fromGroup);
	      toolbar.addComponent(toGroup);
	      return toolbar;
	    };

	    getLogicalSpace (availableWidth, availableHeight) {
	      var logicalSpace,
	        width = 0,
	        height = 0;

	      logicalSpace = this.toolbars[0].getLogicalSpace(availableWidth, availableHeight);
	      width += logicalSpace.width;
	      height += logicalSpace.height;
	      this.toolbars[0].width = logicalSpace.width;
	      this.toolbars[0].height = logicalSpace.height;
	      return {
	        width: width,
	        height: height
	      };
	    };

	    placeInCanvas () {
	      var self = this;
	      self.spaceManagerInstance.add([{
	        name: function () {
	          return 'DateRangeChooserToolbox';
	        },
	        ref: function (obj) {
	          return obj['0'];
	        },
	        self: function () {
	          return self;
	        },
	        priority: function () {
	          return 2;
	        },
	        layout: function (obj) {
	          return obj[self.config.layout];
	        },
	        orientation: [{
	          type: function (obj) {
	            return obj[self.config.orientation];
	          },
	          position: [{
	            type: function (obj) {
	              return obj[self.config.position];
	            },
	            alignment: [{
	              type: function (obj) {
	                return obj[self.config.alignment];
	              },
	              dimensions: [function () {
	                var parent = this.getParentComponentGroup();
	                return self.getLogicalSpace(parent.getWidth(), parent.getHeight());
	              }]
	            }]
	          }]
	        }]
	      }]);
	    };

	    setDrawingConfiguration (x, y, width, height, group) {
	      var mes = this.measurement;
	      mes.x = x;
	      mes.y = y;
	      mes.width = width;
	      mes.height = height;

	      this.parentGroup = group;

	      return this;
	    };

	    draw (x, y, width, height, group) {
	      let self = this,
	        measurement = self.measurement,
	        toolbars = self.toolbars,
	        ln,
	        i,
	        toolbar,
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
	        model.onPropsChange(['x-axis-visible-range-start', 'x-axis-visible-range-end'],
	          (start, end) => {
	            // setTimeout(() => {
	            self.startDt = start[1];
	            self.fromDate.blur(self.getDate(start[1]));
	            self.fromError.text.attr('text', '');
	            self.fromError.group.hide();
	            // self.fromDate.svgElems.node.tooltip(self.config.fromTooltipText);
	            self.fromDate.updateVisual('enabled');
	            self.endDt = end[1];
	            self.toDate.blur(self.getDate(end[1]));
	            self.toError.text.attr('text', '');
	            self.toError.group.hide();
	            // self.toDate.svgElems.node.tooltip(self.config.toTooltipText);
	            self.toDate.updateVisual('enabled');
	            // }, 400);
	          }
	        );
	      }

	      self.fromError = self.createErrorGroup(self.fromDate, 'fromError');
	      self.toError = self.createErrorGroup(self.toDate, 'toError');
	      self.startDataset = self.globalReactiveModel.model['x-axis-absolute-range-start'];
	      self.endDataset = self.globalReactiveModel.model['x-axis-absolute-range-end'];
	      self.maxXAxisTicks = self.globalReactiveModel.model['x-axis-maximum-allowed-ticks'];
	      self.maxXAxisTicks = self.globalReactiveModel.model['x-axis-maximum-allowed-ticks'];
	      self.minDatestampDiff = self.globalReactiveModel.model['minimum-consecutive-datestamp-diff'];
	      self.minActiveInterval = self.maxXAxisTicks * self.minDatestampDiff;
	    };
	  }
	  return DateRange;
	};


/***/ }
/******/ ]);