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


	    _createClass(DateRange, [{
	      key: 'isBeforeOrEqualTo',
	      value: function isBeforeOrEqualTo(startTimestamp, endTimestamp, errorType) {
	        if (startTimestamp <= endTimestamp) {
	          return true;
	        } else {
	          this.startTooltipErrorMsg = '<span style="color: ' + this.config.styles['input-error-tooltip-font-color'] + '">Date must be less than end date!</span>';
	          if (errorType === 'from') {
	            this.setErrorMsg(this.fromError, 'Date must be less than end date!');
	          }
	          return false;
	        }
	      }
	    }, {
	      key: 'isAfterOrEqualTo',
	      value: function isAfterOrEqualTo(endTimestamp, startTimestamp, errorType) {
	        if (endTimestamp >= startTimestamp) {
	          return true;
	        } else {
	          this.endTooltipErrorMsg = '<span style="color: ' + this.config.styles['input-error-tooltip-font-color'] + '">Date must be greater than start date!</span>';
	          if (errorType === 'to') {
	            this.setErrorMsg(this.toError, 'Date must be greater than start date!');
	          }
	          return false;
	        }
	      }
	    }, {
	      key: 'isBetween',
	      value: function isBetween(timestamp, absoluteStart, absoluteEnd, errorType) {
	        if (timestamp >= absoluteStart && timestamp <= absoluteEnd) {
	          return true;
	        } else {
	          this.startTooltipErrorMsg = this.endTooltipErrorMsg = '<span style="color: ' + this.config.styles['input-error-tooltip-font-color'] + '">Date out of bounds!</span>';
	          if (errorType === 'from') {
	            this.setErrorMsg(this.fromError, 'Date out of bounds!');
	          } else if (errorType === 'to') {
	            this.setErrorMsg(this.toError, 'Date out of bounds!');
	          }
	          return false;
	        }
	      }
	    }, {
	      key: 'diffIsGreaterThan',
	      value: function diffIsGreaterThan(actualDiff, minDiff, errorType) {
	        if (actualDiff > minDiff) {
	          return true;
	        } else {
	          this.startTooltipErrorMsg = this.endTooltipErrorMsg = '<span style="color: ' + this.config.styles['input-error-tooltip-font-color'] + '">Zoom limit exceeded!</span>';
	          if (errorType === 'from') {
	            this.setErrorMsg(this.fromError, 'Zoom limit exceeded!');
	          } else if (errorType === 'to') {
	            this.setErrorMsg(this.toError, 'Zoom limit exceeded!');
	          }
	          return false;
	        }
	      }
	    }, {
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
	      key: 'createConfig',
	      value: function createConfig(extData) {
	        var config = {},
	            defaultStyles = {

	          inputButton: {
	            'width': 120,
	            'height': 22,
	            radius: 1,
	            padding: {
	              left: 15,
	              right: 10
	            },
	            className: 'date-range-chooser',
	            container: {
	              style: {
	                fill: '#FFFFFF',
	                'stroke-width': 1,
	                stroke: '#CED5D4'
	                // 'input-shadow-fill': '#000000',
	                // 'input-shadow-opacity': 0.35,
	              }
	            },
	            text: {
	              style: {
	                'font-family': '"Lucida Grande", sans-serif',
	                'font-size': '13px',
	                fill: '#4B4B4B'
	              }
	            },
	            states: {
	              selected: {
	                className: 'date-range-chooser-state-selected',
	                container: {
	                  style: {
	                    fill: '#FFFFFF',
	                    stroke: '#1E1F1F'
	                  }
	                }
	              },
	              errored: {
	                className: 'date-range-chooser-state-errored',
	                container: {
	                  style: {
	                    fill: '#FFFFFF',
	                    stroke: '#D25353'
	                  }
	                }
	                // 'input-error-tooltip-font-color': '#FF0000'
	              }
	            }
	          },
	          label: {
	            className: 'date-range-chooser-label',
	            text: {
	              style: {
	                'font-family': '"Lucida Grande", sans-serif',
	                'font-size': '13px',
	                fill: '#4B4B4B'
	              }
	            }
	          }
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
	    }, {
	      key: 'createErrorGroup',
	      value: function createErrorGroup(symbol) {
	        // return;
	        //   let self = this,
	        //     paper = self.graphics.paper,
	        //     circle,
	        //     crossPath,
	        //     cross,
	        //     rect,
	        //     text,
	        //     group,
	        //     textBBox,
	        //     circleBBox,
	        //     rectBBox,
	        //     symbolBBox,
	        //     orientation = self.config.orientation,
	        //     position = self.config.position;

	        //   if (orientation === 'horizontal') {
	        //     if (position === 'top') {
	        //       symbolBBox = symbol.getBoundElement().getBBox();
	        //       group = paper.group('error-group');

	        //       rect = paper.rect(symbolBBox.x,
	        //         symbolBBox.y - symbolBBox.height, 20, 20, group);
	        //       rectBBox = rect.getBBox();

	        //       circle = paper.circle(rectBBox.x + 5 + 1,
	        //         rectBBox.y + 6 + 4, 6, group);
	        //       circleBBox = circle.getBBox();

	        //       crossPath = this.getCrossPath(circleBBox, 4);
	        //       cross = paper.path(crossPath, group);

	        //       text = paper.text(circleBBox.x + circleBBox.width + 4, rectBBox.y + 2,
	        //         '', group);
	        //       textBBox = text.getBBox();
	        //     } else if (position === 'bottom') {
	        //       symbolBBox = symbol.getBoundElement().getBBox();
	        //       group = paper.group('error-group');

	        //       rect = paper.rect(symbolBBox.x,
	        //         symbolBBox.y + symbolBBox.height, 20, 20, group);
	        //       rectBBox = rect.getBBox();

	        //       circle = paper.circle(rectBBox.x + 5 + 1,
	        //         rectBBox.y + 6 + 4, 6, group);
	        //       circleBBox = circle.getBBox();

	        //       crossPath = this.getCrossPath(circleBBox, 4);
	        //       cross = paper.path(crossPath, group);

	        //       text = paper.text(circleBBox.x + circleBBox.width + 4, rectBBox.y + 2,
	        //         '', group);
	        //       textBBox = text.getBBox();
	        //     }
	        //   } else if (orientation === 'vertical') {
	        //     symbolBBox = symbol.getBoundElement().getBBox();
	        //     group = paper.group('error-group');

	        //     rect = paper.rect(symbolBBox.x,
	        //       symbolBBox.y + symbolBBox.height, 20, 20, group);
	        //     rectBBox = rect.getBBox();

	        //     circle = paper.circle(rectBBox.x + 5 + 1,
	        //       rectBBox.y + 6 + 4, 6, group);
	        //     circleBBox = circle.getBBox();

	        //     crossPath = this.getCrossPath(circleBBox, 4);
	        //     cross = paper.path(crossPath, group);

	        //     text = paper.text(circleBBox.x + circleBBox.width + 4, rectBBox.y + 2,
	        //       '', group);
	        //     textBBox = text.getBBox();
	        //   }

	        //   circle.attr({
	        //     'stroke': '#d71f26',
	        //     'stroke-width': '1',
	        //     'fill': 'none'
	        //   });
	        //   cross.attr({
	        //     'stroke': '#000000',
	        //     'stroke-width': '1.5'
	        //   });
	        //   text.attr({
	        //     'text-anchor': 'start',
	        //     'y': textBBox.y + textBBox.height,
	        //     'fill': '#D80000',
	        //     'font-family': '"Lucida Grande", sans-serif',
	        //     'font-size': '12'
	        //   });
	        //   rect.attr({
	        //     'fill': '#FFFFFF',
	        //     'fill-opacity': '0.8',
	        //     'stroke-width': '0',
	        //     'width': textBBox.width + circleBBox.width
	        //   });
	        //   group.attr({
	        //     visibility: 'hidden'
	        //   });

	        //   return {
	        //     'group': group,
	        //     'cross': cross,
	        //     'circle': circle,
	        //     'rect': rect,
	        //     'text': text
	        //   };
	        // }

	        // getCrossPath (circleBox, padding) {
	        //   // M478,77L483,82M478,82L483,77
	        //   let circleX1 = Math.round(circleBox.x),
	        //     circleY1 = Math.round(circleBox.y),
	        //     circleX2 = Math.round(circleBox.x2),
	        //     circleY2 = Math.round(circleBox.y2),
	        //     crossX1 = circleX1 + 4,
	        //     crossY1 = circleY1 + 2,
	        //     crossX2 = circleX2 - 4,
	        //     crossY2 = circleY2 - 3,
	        //     pathStr = 'M' + crossX1 + ',' + crossY1 + 'L' + crossX2 + ',' + crossY2;
	        //   pathStr += 'M' + crossX1 + ',' + crossY2 + 'L' + crossX2 + ',' + crossY1;
	        //   return pathStr;
	      }
	    }, {
	      key: 'setErrorMsg',
	      value: function setErrorMsg(errorGroup, errorMsg) {
	        // return;
	        // let errorRectX,
	        //   errorRectWidth,
	        //   errorRectEnd;

	        // if (errorGroup.text.attr('text') === errorMsg) {
	        //   return;
	        // }
	        // errorGroup.text.attr('text', errorMsg);
	        // errorGroup.rect.attr('width',
	        //   errorGroup.text.getBBox().width + (4 * 2) + errorGroup.circle.getBBox().width + 2);

	        // errorRectX = errorGroup.rect.getBBox().x;
	        // errorRectWidth = errorGroup.rect.getBBox().width;
	        // errorRectEnd = errorRectX + errorRectWidth;
	        // console.log(errorRectEnd, this.containerRight);
	        // if (errorRectEnd > this.containerRight) {
	        //   let diff = errorRectEnd - this.containerRight;
	        //   errorGroup.rect.attr('x', errorRectX - diff);
	        //   errorGroup.circle.attr('cx', errorGroup.circle.getBBox().x - diff + 5);
	        //   errorGroup.cross.translate(-diff - 1, 0);
	        //   errorGroup.text.attr('x', errorGroup.text.getBBox().x - diff);
	        // }
	      }
	    }, {
	      key: 'createObjectAssign',
	      value: function createObjectAssign() {
	        if (typeof Object.assign !== 'function') {
	          Object.assign = function (target, varArgs) {
	            'use strict';

	            if (target == null) {
	              throw new TypeError('Cannot convert undefined or null to object');
	            }

	            var to = Object(target);

	            for (var index = 1; index < arguments.length; index++) {
	              var nextSource = arguments[index];

	              if (nextSource != null) {
	                for (var nextKey in nextSource) {
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
	          instance.config = instance.createConfig(extData);
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
	            fromGroup,
	            toGroup,
	            fromFormattedDate,
	            toFormattedDate,
	            styles = this.config.styles,
	            inputBtnStyles = styles.inputButton,
	            paper = this.graphics.paper,
	            d3 = paper.getInstances().d3,
	            addCssRules = function addCssRules(classNames, styles) {
	          var key, className;
	          for (key in classNames) {
	            className = classNames[key];
	            switch (key) {
	              case 'container':
	                styles.container && paper.cssAddRule('.' + className, styles.container.style);
	                break;
	              case 'input':
	                styles.text && paper.cssAddRule('.' + className, {
	                  color: styles.text.style.fill,
	                  'font-family': styles.text.style['font-family'],
	                  'font-size': styles.text.style['font-size']
	                });
	                break;
	              case 'text':
	                styles.text && paper.cssAddRule('.' + className, styles.text.style);
	            }
	          }
	        },
	            createInputButtons = function createInputButtons(store) {
	          var key, inputButton, text, config, states, state;

	          for (key in store) {
	            inputButton = store[key];
	            text = inputButton.text;
	            config = inputButton.config;
	            self[key] = d3.inputButton(text).setConfig(config);
	            self[key].namespace('fusioncharts');
	            self[key].appendSelector('daterange');
	            addCssRules(self[key].getIndividualClassNames(self[key].getClassName()), inputBtnStyles);
	            states = config.states;
	            for (state in states) {
	              addCssRules(self[key].getIndividualClassNames(self[key].config.states[state]), inputBtnStyles.states[state]);
	            }

	            self[key].attachEventHandlers(inputButton.eventListeners);
	            inputButton.group.addSymbol(self[key]);
	          }
	        },
	            createLabels = function createLabels(store) {
	          var key, label, text, config;

	          for (key in store) {
	            label = store[key];
	            text = label.text;
	            config = label.config;
	            self[key] = new self.toolbox.Label(text, dependencies, config);
	            // self[key].namespace('fusioncharts');
	            // self[key].appendSelector('daterange');
	            addCssRules(self[key].getIndividualClassNames(self[key].getClassName()), label.styles);
	            label.group.addSymbol(self[key]);
	          }
	        },
	            dependencies = {
	          paper: this.graphics.paper,
	          chart: this.chart,
	          smartLabel: this.smartLabel,
	          chartContainer: this.graphics.container
	        },
	            fromDateEventConfig = {
	          click: function click() {
	            // if (self.fromDate.state === 'errored' &&
	            //   self.fromError.text.attr('text') !== '') {
	            //   self.toError.group.hide();
	            //   self.fromError.group.show();
	            // }
	            self.fromDate.setState('selected');
	          },
	          // tooltext: self.config.fromTooltipText,
	          keypress: function keypress(e) {
	            var event = e || window.event,
	                charCode = event.which || event.keyCode;
	            if (charCode === 13) {
	              self.startDate = self.fromDate.text();
	              if (self.fromDate.state !== 'errored') {
	                self.fromDate.blur();
	                // self.fromError.group.hide();
	                // self.fromDate.svgElems.node.tooltip(self.config.fromTooltipText);
	                // self.fromDate.removeState('selected');
	                // self.fromDate.removeState('errored');
	              } else {
	                  // self.fromError.group.show();
	                  // self.fromDate.state = 'errored';
	                  // self.fromDate.svgElems.node.tooltip(self.startTooltipErrorMsg);
	                }
	            }
	          },
	          blur: function blur() {
	            self.startDate = self.fromDate.text();
	            if (self.fromDate.state !== 'errored') {
	              self.fromDate.blur();
	              // self.fromError.group.hide();
	              // self.fromDate.svgElems.node.tooltip(self.config.fromTooltipText);
	              self.fromDate.removeState('selected');
	            } else {
	              // self.fromError.group.show();
	              // self.fromDate.svgElems.node.tooltip(self.startTooltipErrorMsg);
	            }
	          }
	        },
	            toDateEventConfig = {
	          click: function click() {
	            // if (self.toDate.state === 'errored' &&
	            //   self.toError.text.attr('text') !== '') {
	            //   self.fromError.group.hide();
	            //   self.toError.group.show();
	            // }
	            // self.toDate.edit();
	            self.toDate.setState('selected');
	          },
	          // tooltext: self.config.toTooltipText,
	          keypress: function keypress(e) {
	            var event = e || window.event,
	                charCode = event.which || event.keyCode;
	            if (charCode === 13) {
	              self.endDate = self.toDate.text();
	              if (self.toDate.state !== 'errored') {
	                self.toDate.blur();
	                // self.toError.group.hide();
	                // self.toDate.svgElems.node.tooltip(self.config.toTooltipText);
	                self.toDate.removeState('selected');
	              } else {
	                // self.toError.group.show();
	                // self.toDate.svgElems.node.tooltip(self.endTooltipErrorMsg);
	              }
	            }
	          },
	          blur: function blur() {
	            // self.toDate.blur();
	            self.endDate = self.toDate.text();
	            if (self.toDate.state !== 'errored') {
	              // self.toDate.blur();
	              // self.toError.group.hide();
	              // self.toDate.svgElems.node.tooltip(self.config.toTooltipText);
	              self.toDate.removeState('selected');
	            } else {
	              // self.toError.group.show();
	              // self.toDate.svgElems.node.tooltip(self.endTooltipErrorMsg);
	            }
	          }
	        },
	            labelList,
	            inputButtonlist;

	        self.fromDate = {};
	        self.toDate = {};

	        fromFormattedDate = this.getDate(this.startDt);
	        toFormattedDate = this.getDate(this.endDt);
	        toolbar = new this.HorizontalToolbar(dependencies);

	        fromGroup = new this.toolbox.ComponentGroup(dependencies);

	        toGroup = new this.toolbox.ComponentGroup(dependencies);

	        labelList = {
	          fromDateLabel: {
	            text: this.config['fromText'],
	            config: {
	              className: styles.label.className,
	              container: {
	                'width': 40
	              }
	            },
	            styles: styles.label,
	            group: fromGroup
	          },
	          toDateLabel: {
	            text: this.config['toText'],
	            config: {
	              className: styles.label.className,
	              container: {
	                'width': 40
	              }
	            },
	            styles: styles.label,
	            group: toGroup
	          }
	        };

	        inputButtonlist = {
	          fromDate: {
	            text: fromFormattedDate,
	            config: {
	              width: inputBtnStyles.width,
	              height: inputBtnStyles.height,
	              padding: inputBtnStyles.padding,
	              radius: inputBtnStyles.radius,
	              className: inputBtnStyles.className,
	              states: {
	                selected: inputBtnStyles.states.selected.className,
	                errored: inputBtnStyles.states.errored.className
	              }
	            },
	            eventListeners: fromDateEventConfig,
	            group: fromGroup
	          },
	          toDate: {
	            text: toFormattedDate,
	            config: {
	              width: inputBtnStyles.width,
	              height: inputBtnStyles.height,
	              padding: inputBtnStyles.padding,
	              radius: inputBtnStyles.radius,
	              className: inputBtnStyles.className,
	              states: {
	                selected: inputBtnStyles.states.selected.className,
	                errored: inputBtnStyles.states.errored.className
	              }
	            },
	            eventListeners: toDateEventConfig,
	            group: toGroup
	          }
	        };

	        createLabels(labelList);
	        createInputButtons(inputButtonlist);

	        toolbar.addComponent(fromGroup);
	        toolbar.addComponent(toGroup);
	        return toolbar;
	      }
	    }, {
	      key: 'getLogicalSpace',
	      value: function getLogicalSpace(availableWidth, availableHeight) {
	        var logicalSpace = this.toolbars[0].getLogicalSpace(availableWidth, availableHeight);
	        this.toolbars[0].width = logicalSpace.width;
	        this.toolbars[0].height = logicalSpace.height;
	        return {
	          width: logicalSpace.width,
	          height: logicalSpace.height
	        };
	      }
	    }, {
	      key: 'placeInCanvas',
	      value: function placeInCanvas() {
	        var _self = this;
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
	            // setTimeout(() => {
	            self.startDt = start[1];
	            self.fromDate.text(self.getDate(start[1]));
	            // self.fromDate.blur(self.getDate(start[1]));
	            // self.fromError.text.attr('text', '');
	            // self.fromError.group.hide();
	            // self.fromDate.svgElems.node.tooltip(self.config.fromTooltipText);
	            self.fromDate.removeState('selected');
	            self.fromDate.removeState('errored');
	            self.endDt = end[1];
	            self.toDate.text(self.getDate(end[1]));
	            // self.toDate.blur(self.getDate(end[1]));
	            // self.toError.text.attr('text', '');
	            // self.toError.group.hide();
	            // self.toDate.svgElems.node.tooltip(self.config.toTooltipText);
	            self.toDate.removeState('selected');
	            self.toDate.removeState('errored');
	            // }, 400);
	          });
	        }

	        if (self.config.orientation === 'vertical') {
	          self.fromError = self.createErrorGroup(self.toDate);
	          self.toError = self.createErrorGroup(self.toDate);
	        } else if (self.config.orientation === 'horizontal') {
	          self.fromError = self.createErrorGroup(self.fromDate);
	          self.toError = self.createErrorGroup(self.toDate);
	        }
	        self.startDataset = self.globalReactiveModel.model['x-axis-absolute-range-start'];
	        self.endDataset = self.globalReactiveModel.model['x-axis-absolute-range-end'];
	        self.maxXAxisTicks = self.globalReactiveModel.model['x-axis-maximum-allowed-ticks'];
	        self.maxXAxisTicks = self.globalReactiveModel.model['x-axis-maximum-allowed-ticks'];
	        self.minDatestampDiff = self.globalReactiveModel.model['minimum-consecutive-datestamp-diff'];
	        self.minActiveInterval = self.maxXAxisTicks * self.minDatestampDiff;
	        self.containerRight = self.graphics.container.clientLeft + self.graphics.container.clientWidth;
	        self.containerBottom = self.graphics.container.clientTop + self.graphics.container.clientHeight;
	      }
	    }, {
	      key: 'startDate',
	      get: function get() {
	        return this.startDt;
	      },
	      set: function set(startDt) {
	        var startTimestamp = this.getTimestamp(startDt),
	            newDate = this.getDate(this.startDt),
	            absoluteStart = this.globalReactiveModel.model['x-axis-absolute-range-start'],
	            absoluteEnd = this.globalReactiveModel.model['x-axis-absolute-range-end'],
	            minDiff = this.minActiveInterval,
	            actualDiff = this.endDt - startTimestamp;
	        if (newDate !== startDt) {
	          if (this.isBetween(startTimestamp, absoluteStart, absoluteEnd, 'from') && this.isBeforeOrEqualTo(startTimestamp, this.endDt, 'from') && this.diffIsGreaterThan(actualDiff, minDiff, 'from')) {
	            this.startDt = startTimestamp;
	            this.globalReactiveModel.model['x-axis-visible-range-start'] = this.startDt;
	          } else {
	            // this.toError.group.hide();
	            this.fromDate.setState('errored');
	            this.fromDate.state = 'errored';
	          }
	        } else {
	          if (this.fromDate.state === 'errored') {
	            this.fromDate.removeState('errored');
	            this.fromDate.state = 'enabled';
	          }
	        }
	      }
	    }, {
	      key: 'endDate',
	      get: function get() {
	        return this.endDt;
	      },
	      set: function set(endDt) {
	        var endTimestamp = this.getTimestamp(endDt),
	            newDate = this.getDate(this.endDt),
	            absoluteStart = this.globalReactiveModel.model['x-axis-absolute-range-start'],
	            absoluteEnd = this.globalReactiveModel.model['x-axis-absolute-range-end'],
	            minDiff = this.minActiveInterval,
	            actualDiff = endTimestamp - this.startDt;

	        if (newDate !== endDt) {
	          if (this.isBetween(endTimestamp, absoluteStart, absoluteEnd, 'to') && this.isAfterOrEqualTo(endTimestamp, this.startDt, 'to') && this.diffIsGreaterThan(actualDiff, minDiff, 'to')) {
	            this.endDt = endTimestamp;
	            this.globalReactiveModel.model['x-axis-visible-range-end'] = this.endDt;
	          } else {
	            // this.fromError.group.hide();
	            this.toDate.setState('errored');
	            this.toDate.state = 'errored';
	          }
	        } else {
	          if (this.toDate.state === 'errored') {
	            this.toDate.removeState('errored');
	            this.toDate.state = 'enabled';
	          }
	        }
	      }
	    }]);

	    return DateRange;
	  }();

	  return DateRange;
	};

/***/ }
/******/ ]);