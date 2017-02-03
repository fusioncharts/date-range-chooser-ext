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
	const DateRange = __webpack_require__(1),
	  Calendar = __webpack_require__(2);
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
	  var FC = _window.FusionCharts,
	    FusionCalendar = _window.FusionCalendar;
	  FC.register('extension', ['private', 'date-range-chooser', function () {
	    var DateTimeFormatter = this.hcLib.DateTimeFormatter;
	    FC.registerComponent('extensions', 'date-range-chooser', DateRange({FusionCharts: FC,
	      DateTimeFormatter: DateTimeFormatter,
	      FusionCalendar: FusionCalendar
	    }));
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
	      this.FusionCalendar = dep.FusionCalendar;
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
	        actualDiff;

	      if (startTimestamp) {
	        actualDiff = this.endDt - startTimestamp;
	      }

	      if (newDate !== startDt) {
	        if (this.isValid(startTimestamp, 'from') &&
	          this.isBetween(startTimestamp, absoluteStart, absoluteEnd, 'from') &&
	          this.isBeforeOrEqualTo(startTimestamp, this.endDt, 'from') &&
	          this.diffIsGreaterThan(actualDiff, minDiff, 'from')) {
	          this.startDt = startTimestamp;
	          this.globalReactiveModel.model['x-axis-visible-range-start'] = this.startDt;
	          this.fromDate.state = 'enabled';
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

	    isBeforeOrEqualTo (startTimestamp, endTimestamp, errorType) {
	      if (startTimestamp <= endTimestamp) {
	        return true;
	      } else {
	        this.startTooltipErrorMsg =
	        '<span style="color: ' +
	        this.config.styles['input-error-tooltip-font-color'] +
	        '">Date must be less than end date!</span>';
	        if (errorType === 'from') {
	          this.setErrorMsg(this.fromError, 'Date must be less than end date!');
	        }
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
	        actualDiff;

	      if (endTimestamp) {
	        actualDiff = endTimestamp - this.startDt;
	      }

	      if (newDate !== endDt) {
	        if (this.isValid(endTimestamp, 'to') &&
	          this.isBetween(endTimestamp, absoluteStart, absoluteEnd, 'to') &&
	          this.isAfterOrEqualTo(endTimestamp, this.startDt, 'to') &&
	          this.diffIsGreaterThan(actualDiff, minDiff, 'to')) {
	          this.endDt = endTimestamp;
	          this.globalReactiveModel.model['x-axis-visible-range-end'] = this.endDt;
	          this.toDate.state = 'enabled';
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

	    isAfterOrEqualTo (endTimestamp, startTimestamp, errorType) {
	      if (endTimestamp >= startTimestamp) {
	        return true;
	      } else {
	        this.endTooltipErrorMsg =
	        '<span style="color: ' +
	        this.config.styles['input-error-tooltip-font-color'] +
	        '">Date must be greater than start date!</span>';
	        if (errorType === 'to') {
	          this.setErrorMsg(this.toError, 'Date must be greater than start date!');
	        }
	        return false;
	      }
	    }

	    isValid (timestamp, errorType) {
	      if (timestamp == null) {
	        this.startTooltipErrorMsg = this.endTooltipErrorMsg =
	        '<span style="color: ' +
	        this.config.styles['input-error-tooltip-font-color'] +
	        '">Invalid / unrecognized date format!</span>';
	        if (errorType === 'from') {
	          this.setErrorMsg(this.fromError, 'Invalid / unrecognized date format!');
	        } else if (errorType === 'to') {
	          this.setErrorMsg(this.toError, 'Invalid / unrecognized date format!');
	        }
	        return false;
	      } else {
	        return true;
	      }
	    }

	    isBetween (timestamp, absoluteStart, absoluteEnd, errorType) {
	      if (timestamp >= absoluteStart && timestamp <= absoluteEnd) {
	        return true;
	      } else {
	        this.startTooltipErrorMsg = this.endTooltipErrorMsg =
	        '<span style="color: ' +
	        this.config.styles['input-error-tooltip-font-color'] +
	        '">Date out of bounds!</span>';
	        if (errorType === 'from') {
	          this.setErrorMsg(this.fromError, 'Date out of bounds!');
	        } else if (errorType === 'to') {
	          this.setErrorMsg(this.toError, 'Date out of bounds!');
	        }
	        return false;
	      }
	    }

	    diffIsGreaterThan (actualDiff, minDiff, errorType) {
	      if (actualDiff > minDiff) {
	        return true;
	      } else {
	        this.startTooltipErrorMsg = this.endTooltipErrorMsg =
	        '<span style="color: ' +
	        this.config.styles['input-error-tooltip-font-color'] +
	        '">Zoom limit exceeded!</span>';
	        if (errorType === 'from') {
	          this.setErrorMsg(this.fromError, 'Zoom limit exceeded!');
	        } else if (errorType === 'to') {
	          this.setErrorMsg(this.toError, 'Zoom limit exceeded!');
	        }
	        return false;
	      }
	    }

	    getTimestamp (dateStr) {
	      let dateFormat = this.config.dateFormat,
	        dateFormatter = new dep.DateTimeFormatter(dateFormat);
	      return dateFormatter.getNativeDate(dateStr) ? +dateFormatter.getNativeDate(dateStr) : null;
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

	          inputButton: {
	            'width': 115,
	            'height': 22,
	            radius: 1,
	            padding: {
	              left: 10,
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
	                fill: '#696969'
	              }
	            },
	            input: {
	              style: {
	                'font-family': '"Lucida Grande", sans-serif',
	                'font-size': '13px',
	                color: '#696969',
	                background: '#FFFFFF'
	              }
	            },
	            icon: {
	              style: {
	                'fill': '#696969'
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
	                    fill: '#ffefef',
	                    stroke: '#D25353'
	                  }
	                },
	                input: {
	                  style: {
	                    background: '#ffefef'
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
	                fill: '#696969',
	                'font-weight': 'bold'
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
	      config.placeholder = extData.placeholder || 'DD-MM-YYYY';
	      config.fromText = extData.fromText || 'From:';
	      config.fromTooltipText = extData.fromTooltipText || 'From Date';
	      config.toText = extData.toText || 'To:';
	      config.toTooltipText = extData.toTooltipText || 'To Date';
	      config.padding = extData.padding || 5;
	      config.styles = Object.assign(defaultStyles, extData.styles);
	      config.calendar = extData.calendar === undefined ? true : extData.calendar;
	      config.editable = extData.editable === undefined ? true : (config.calendar === false ? true : extData.editable);
	      return config;
	    }

	    createErrorGroup (symbol) {
	      // return;
	      let self = this,
	        paper = self.graphics.paper,
	        parentGroup = this.parentGroup,
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
	        width = 20,
	        height = 20,
	        orientation = self.config.orientation,
	        position = self.config.position;

	      group = parentGroup.append('g').attr('class', 'error-group');

	      if (orientation === 'horizontal') {
	        if (position === 'top') {
	          symbolBBox = symbol.getBBox();
	          rect = group.append('rect');
	          paper.setAttrs(rect, {
	            x: symbolBBox.x,
	            y: symbolBBox.y - symbolBBox.height,
	            width: 20,
	            height: 20
	          });

	          rectBBox = rect.node().getBBox();

	          circle = group.append('circle');

	          paper.setAttrs(circle, {
	            cx: rectBBox.x + 5 + 1,
	            cy: rectBBox.y + 6 + 4,
	            r: 6
	          });

	          circleBBox = circle.node().getBBox();

	          crossPath = this.getCrossPath(circleBBox, 4);
	          cross = group.append('path');
	          paper.setAttrs(cross, {
	            d: crossPath
	          });

	          text = group.append('text');
	          paper.setAttrs(text, {
	            x: circleBBox.x + circleBBox.width + 4,
	            y: rectBBox.y + 2
	          });
	        } else if (position === 'bottom') {
	          symbolBBox = symbol.getBBox();
	          rect = group.append('rect');

	          paper.setAttrs(rect, {
	            x: symbolBBox.x,
	            y: symbolBBox.y + symbolBBox.height,
	            width: 20,
	            height: 20
	          });

	          rectBBox = rect.getBBox();

	          circle = group.append('circle');
	          paper.setAttrs(circle, {
	            cx: rectBBox.x + 5 + 1,
	            cy: rectBBox.y + 6 + 4,
	            r: 6
	          });

	          circleBBox = circle.getBBox();

	          crossPath = this.getCrossPath(circleBBox, 4);
	          cross = group.append('path');
	          paper.setAttrs(cross, {
	            d: crossPath
	          });

	          text = group.append('text');
	          paper.setAttrs(text, {
	            x: circleBBox.x + circleBBox.width + 4,
	            y: rectBBox.y + 2
	          });
	        }
	      } else if (orientation === 'vertical') {
	        symbolBBox = symbol.getBBox();
	        rect = group.append('rect');
	        paper.setAttrs(rect, {
	          x: symbolBBox.x,
	          y: symbolBBox.y + symbolBBox.height,
	          width: width,
	          height: height
	        });

	        rectBBox = rect.node().getBBox();

	        circle = group.append('circle', {
	          cx: rectBBox.x + 5 + 1,
	          cy: rectBBox.y + 6 + 4,
	          r: 6
	        });

	        circleBBox = circle.node().getBBox();

	        crossPath = this.getCrossPath(circleBBox, 4);
	        cross = group.append('path').attr('d', crossPath);

	        text = group.append('text');
	        paper.setAttrs(text, {
	          x: circleBBox.x + circleBBox.width + 4,
	          y: rectBBox.y + 2
	        });
	      }

	      text.text('W');
	      textBBox = text.node().getBBox();
	      paper.setStyles(circle, {
	        'stroke': '#d71f26',
	        'stroke-width': '1',
	        'fill': 'none'
	      });
	      paper.setStyles(cross, {
	        'stroke': '#000000',
	        'stroke-width': '1.5'
	      });

	      paper.setAttrs(text, {
	        'y': textBBox.y + textBBox.height,
	        dy: '0.75em'
	      });

	      paper.setStyles(text, {
	        'fill': '#D80000',
	        'font-family': '"Lucida Grande", sans-serif',
	        'text-anchor': 'start',
	        'font-size': '12'
	      });

	      paper.setStyles(rect, {
	        'fill': '#FFFFFF',
	        'fill-opacity': '0.8',
	        'stroke-width': '0'
	      });

	      rect.attr('width', textBBox.width + circleBBox.width);

	      group.style('display', 'none');

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
	        circleX2 = Math.round(circleBox.x + circleBox.width),
	        circleY2 = Math.round(circleBox.y + circleBox.height),
	        crossX1 = circleX1 + 4,
	        crossY1 = circleY1 + 2,
	        crossX2 = circleX2 - 4,
	        crossY2 = circleY2 - 3,
	        pathStr = 'M ' + crossX1 + ' ' + crossY1 + ' L ' + crossX2 + ' ' + crossY2;
	      pathStr += ' M ' + crossX1 + ' ' + crossY2 + ' L ' + crossX2 + ' ' + crossY1;
	      return pathStr;
	    }

	    setErrorMsg (errorGroup, errorMsg) {
	      // return;
	      let errorRectX,
	        errorRectWidth,
	        errorRectEnd,
	        group = errorGroup.group,
	        bBox;

	      if (errorGroup.text.attr('text') === errorMsg) {
	        return;
	      }
	      errorGroup.text.text(errorMsg);

	      bBox = group.node().getBBox();
	      errorRectX = bBox.x;
	      errorRectWidth = bBox.width;
	      errorRectEnd = errorRectX + errorRectWidth;
	      group.attr('transform', '');
	      if (errorRectEnd > this.containerRight) {
	        let diff = errorRectEnd - this.containerRight;
	        // errorGroup.rect.attr('x', errorRectX - diff);
	        // errorGroup.circle.attr('cx', errorGroup.circle.node().getBBox().x - diff + 5);
	        group.attr('transform', 'translate(' + (-diff - 1) + ',' + 0 + ')');
	        // errorGroup.cross.attr('transform', "translate(" + 0 + ',' + 0 + ')');
	        // errorGroup.cross.attr('transform',);
	        // errorGroup.text.attr('x', errorGroup.text.node().getBBox().x - diff);
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
	        fromGroup,
	        toGroup,
	        fromFormattedDate,
	        toFormattedDate,
	        styles = this.config.styles,
	        inputBtnStyles = styles.inputButton,
	        paper = this.graphics.paper,
	        d3 = paper.getInstances().d3,
	        absoluteStart,
	        absoluteEnd,
	        startDt,
	        endDt,
	        addCssRules = function (classNames, styles) {
	          var key, className;

	          for (key in classNames) {
	            className = classNames[key];
	            styles[key] && paper.cssAddRule('.' + className, styles[key].style);
	          }
	        },
	        createInputButtons = function (store) {
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
	              addCssRules(self[key].getIndividualClassNames(self[key].config.states[state]),
	                inputBtnStyles.states[state]);
	            }

	            self[key].attachEventHandlers(inputButton.eventListeners);
	            inputButton.group.addSymbol(self[key]);
	          }
	        },
	        createLabels = function (store) {
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
	        showCalendar = function (bBox, date) {
	          var dateObj = new Date(date);
	          // self.toDate.edit();
	          self.calendar.configure({
	            posX: bBox.x + bBox.width,
	            posY: bBox.y + bBox.height + 3,
	            selectedDate: {
	              day: dateObj.getDate(),
	              month: dateObj.getMonth() + 1,
	              year: dateObj.getFullYear()
	            }
	          });
	          // self.calendar.show();
	          self.calendar.show();
	        },
	        fromDateEventConfig = {
	          click: function () {
	            if (self.fromDate.state === 'errored' &&
	              self.fromError.text.attr('text') !== '') {
	              self.toError.group.style('display', 'none');
	              self.fromError.group.style('display', 'block');
	            }
	            self.fromDate.setState('selected');
	            if (self.activeBtn !== self.fromDate) {
	              self.activeBtn && self.activeBtn.removeState('selected');
	            }

	            self.calendar.hide();
	            self.activeBtn = self.fromDate;
	            self.activeDate = 'startDate';
	            if (self.config.editable === false) {
	              showCalendar(self.fromDate.getBBox(), self.startDt);
	            }
	          },
	          // tooltext: self.config.fromTooltipText,
	          keypress: (e) => {
	            let event = e || window.event,
	              charCode = event.which || event.keyCode;
	            if (charCode === 13) {
	              self.startDate = self.fromDate.text();
	              if (self.fromDate.state !== 'errored') {
	                self.fromDate.blur();
	                self.fromError.group.style('display', 'none');
	                self.fromDate.removeState('selected');
	                self.fromDate.removeState('errored');
	              } else {
	                self.fromError.group.style('display', 'block');
	                self.fromDate.state = 'errored';
	              }
	            }
	          },
	          blur: function () {
	            var event = d3.event || window.event;

	            self.startDate = self.fromDate.text();
	            if (self.fromDate.state !== 'errored') {
	              self.fromDate.blur();
	              self.fromError.group.style('display', 'none');
	              !isDescendant(self.toDate.buttonGroup.node(), event.target) && self.fromDate.removeState('selected');
	            } else {
	              self.fromError.group.style('display', 'block');
	            }
	          },
	          onIconClick: function () {
	            var bBox;
	            bBox = self.fromDate.getBBox();
	            self.fromDate.setState('selected');

	            if (self.activeBtn !== self.fromDate) {
	              self.activeBtn && self.activeBtn.removeState('selected');
	            }

	            showCalendar(bBox, self.startDt);
	            self.activeBtn = self.fromDate;
	            self.activeDate = 'startDate';
	          }
	        },
	        toDateEventConfig = {
	          click: function () {
	            if (self.toDate.state === 'errored' &&
	              self.toError.text.attr('text') !== '') {
	              self.fromError.group.style('display', 'none');
	              self.toError.group.style('display', 'block');
	            }

	            self.toDate.setState('selected');
	            if (self.activeBtn !== self.toDate) {
	              self.activeBtn && self.activeBtn.removeState('selected');
	            }
	            // self.activeBtn && self.activeBtn.removeState('selected');
	            self.calendar.hide();
	            self.activeBtn = self.toDate;
	            self.activeDate = 'endDate';
	            if (self.config.editable === false) {
	              showCalendar(self.toDate.getBBox(), self.endDt);
	            }
	          },
	          onIconClick: function () {
	            self.toDate.setState('selected');
	            if (self.activeBtn !== self.toDate) {
	              self.activeBtn && self.activeBtn.removeState('selected');
	            }
	            // self.activeBtn && self.activeBtn.removeState('selected');
	            // dateObj = new Date(self.endDt);
	            showCalendar(self.toDate.getBBox(), self.endDt);
	            self.activeBtn = self.toDate;
	            self.activeDate = 'endDate';
	          },
	          // tooltext: self.config.toTooltipText,
	          keypress: (e) => {
	            let event = e || window.event,
	              charCode = event.which || event.keyCode;
	            if (charCode === 13) {
	              self.endDate = self.toDate.text();
	              if (self.toDate.state !== 'errored') {
	                self.toDate.blur();
	                self.toError.group.style('display', 'none');
	                self.toDate.removeState('selected');
	              } else {
	                self.toError.group.style('display', 'block');
	              }
	            }
	          },
	          blur: function () {
	            var event = d3.event || window.event;
	            // self.toDate.blur();
	            self.endDate = self.toDate.text();
	            if (self.toDate.state !== 'errored') {
	              // self.toDate.blur();
	              self.toError.group.style('display', 'none');
	              !isDescendant(self.toDate.buttonGroup.node(), event.target) && self.toDate.removeState('selected');
	              // self.calendar.hide();
	            } else {
	              self.toError.group.style('display', 'block');
	            }
	          }
	        },
	        labelList,
	        inputButtonlist,
	        FusionCalendar = this.FusionCalendar;

	      self.fromDate = {};
	      self.toDate = {};

	      function isDescendant (parent, child) {
	        var node = child.parentNode;
	        while (node != null) {
	          if (node === parent) {
	            return true;
	          }
	          node = node.parentNode;
	        }
	        return false;
	      }

	      absoluteStart = this.globalReactiveModel.model['x-axis-absolute-range-start'];
	      absoluteEnd = this.globalReactiveModel.model['x-axis-absolute-range-end'];
	      startDt = new Date(absoluteStart);
	      endDt = new Date(absoluteEnd);

	      self.calendar = new FusionCalendar({
	        container: this.graphics.container.id,
	        posX: 10,
	        posY: 10,
	        hAlignment: 'right',
	        rangeStart: {
	          day: startDt.getDate(),
	          month: startDt.getMonth() + 1,
	          year: startDt.getFullYear()
	        },
	        rangeEnd: {
	          day: endDt.getDate(),
	          month: endDt.getMonth() + 1,
	          year: endDt.getFullYear()
	        },
	        showInactiveMonths: true,
	        events: {
	          onDateChange: function () {
	            var dateObj = self.calendar.getDate(),
	              timestamp = new Date(dateObj.year, dateObj.month - 1, dateObj.day).getTime(),
	              date = self.getDate(timestamp);

	            if (self.activeBtn) {
	              self.activeBtn.text(date);
	              self[self.activeDate] = self.activeBtn.text();
	              self.activeBtn.removeState('selected');
	              self.activeBtn = undefined;
	            }

	            self.calendar.hide();
	          }
	        }
	      });

	      d3.select('html').on('click.' + new Date().getTime(), function () {
	        var target = d3.event.target,
	          buttonGroup = self.activeBtn && self.activeBtn.buttonGroup.node();

	        if (!isDescendant(self.calendar.graphic.container, target) && !isDescendant(buttonGroup, target) &&
	            self.activeBtn && self.activeBtn.elements.inputBox.node() !== target) {
	          self.calendar.hide();
	          self.activeBtn && self.activeBtn.removeState('selected');
	          self.activeBtn = undefined;
	        }
	      });

	      self.calendar.hide();
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
	            margin: {
	              right: 5,
	              left: 0
	            }
	          },
	          styles: styles.label,
	          group: fromGroup
	        },
	        toDateLabel: {
	          text: this.config['toText'],
	          config: {
	            className: styles.label.className,
	            margin: {
	              right: 5,
	              left: 0
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
	            },
	            margin: {
	              left: 0,
	              right: 0
	            },
	            hasInputField: self.config.editable,
	            icon: self.config.calendar,
	            placeholder: self.config.placeholder
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
	            margin: {
	              left: 0,
	              right: 0
	            },
	            states: {
	              selected: inputBtnStyles.states.selected.className,
	              errored: inputBtnStyles.states.errored.className
	            },
	            hasInputField: self.config.editable,
	            icon: self.config.calendar,
	            placeholder: self.config.placeholder
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
	    };

	    getLogicalSpace (availableWidth, availableHeight) {
	      var logicalSpace = this.toolbars[0].getLogicalSpace(availableWidth, availableHeight);
	      this.toolbars[0].width = logicalSpace.width;
	      this.toolbars[0].height = logicalSpace.height;
	      return {
	        width: logicalSpace.width,
	        height: logicalSpace.height + this.config.padding
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
	            self.fromDate.text(self.getDate(start[1]));
	            self.fromDate.state = 'enabled';
	            // self.fromDate.blur(self.getDate(start[1]));
	            self.fromError.text.text('');
	            self.fromError.group.style('display', 'none');
	            // self.fromDate.svgElems.node.tooltip(self.config.fromTooltipText);
	            self.fromDate.removeState('selected');
	            self.fromDate.removeState('errored');
	            self.endDt = end[1];
	            self.toDate.text(self.getDate(end[1]));
	            // self.toDate.blur(self.getDate(end[1]));
	            // self.toError.text.text('');
	            self.toError.group.style('display', 'none');
	            // self.toDate.svgElems.node.tooltip(self.config.toTooltipText);
	            self.toDate.removeState('selected');
	            self.toDate.removeState('errored');
	            self.toDate.state = 'enabled';
	            // }, 400);
	          }
	        );
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
	      console.log(self.containerRight);
	      self.containerBottom = self.graphics.container.clientTop + self.graphics.container.clientHeight;
	    };
	  }
	  return DateRange;
	};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

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
	/******/ 			i: moduleId,
	/******/ 			l: false,
	/******/ 			exports: {}
	/******/ 		};

	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/ 		// Flag the module as loaded
	/******/ 		module.l = true;

	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}


	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;

	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;

	/******/ 	// identity function for calling harmony imports with the correct context
	/******/ 	__webpack_require__.i = function(value) { return value; };

	/******/ 	// define getter function for harmony exports
	/******/ 	__webpack_require__.d = function(exports, name, getter) {
	/******/ 		if(!__webpack_require__.o(exports, name)) {
	/******/ 			Object.defineProperty(exports, name, {
	/******/ 				configurable: false,
	/******/ 				enumerable: true,
	/******/ 				get: getter
	/******/ 			});
	/******/ 		}
	/******/ 	};

	/******/ 	// getDefaultExport function for compatibility with non-harmony modules
	/******/ 	__webpack_require__.n = function(module) {
	/******/ 		var getter = module && module.__esModule ?
	/******/ 			function getDefault() { return module['default']; } :
	/******/ 			function getModuleExports() { return module; };
	/******/ 		__webpack_require__.d(getter, 'a', getter);
	/******/ 		return getter;
	/******/ 	};

	/******/ 	// Object.prototype.hasOwnProperty.call
	/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "/dist/";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(__webpack_require__.s = 4);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(1);
	if(typeof content === 'string') content = [[module.i, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(3)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./fc-calendar.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./fc-calendar.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(2)();
	// imports


	// module
	exports.push([module.i, ".fc-cal-container { /* Why need to define this explicitely */\n\tbox-sizing:border-box;\n\tfont-family: Verdana,sans-serif;\n\t-webkit-touch-callout: none; /* iOS Safari */\n  -webkit-user-select: none; /* Chrome/Safari/Opera */\n\t-khtml-user-select: none; /* Konqueror */\n\t-moz-user-select: none; /* Firefox */\n\t-ms-user-select: none; /* Internet Explorer/Edge */\n\tuser-select: none; /* Non-prefixed version, currently\n\t                      not supported by any browser */\n  font-size:11px;\n  text-align: center;\n  vertical-align: top;\n  overflow: hidden;\n  background-color: #fff;\n  border: 1px solid #d6d6d6;\n  -moz-box-shadow:    0px 1px 3px 0px #d8d8d8;\n  -webkit-box-shadow: 0px 1px 3px 0px #d8d8d8;\n  box-shadow:         0px 1px 3px 0px #d8d8d8;\n  padding-bottom: 0;\n}\n.fc-cal-header {\n    box-sizing:border-box;\n    color: #353535;\n    padding: 8px 0;\n    font-weight: bold;\n    font-size: 12px;\n    overflow: hidden;\n}\n.fc-cal-sub-header {\n  font-size:11px;\n  text-transform: uppercase;\n  //font-weight: bold;\n  color: #666;\n  padding: 8px 0 15px;\n  overflow: hidden;\n}\n.fc-cal-body {\n  color: #676767;\n  border-bottom: 2px  solid #c32a2a;\n\n}\n/* Header Classes */\n.fc-cal-month-header {\n  display: block;\n  width: 55%;\n  float: left;\n}\n.fc-cal-year-header {\n  display: block;\n  width: 35%;\n  float: right;\n}\n.fc-cal-month {\n  display: inline-block;\n  padding-right: 5px;\n  padding-left: 5px;\n}\n.fc-cal-year {\n  display: inline-block;\n  padding-right: 5px;\n  padding-left: 5px;\n}\n.fc-cal-nav {\n  display: inline-block;\n  cursor:pointer;\n  padding: 0 10px;\n}\n.fc-cal-nav-next {\n  float: right;\n}\n.fc-cal-nav-prev {\n  float: left;\n}\n.fc-cal-nav-inactive {\n  cursor:default;\n}\n\n/* Sub-header Classes */\n.fc-cal-day {\n  box-sizing: border-box;\n  display: block;\n  float: left;\n  width: 14.28571%;\n  //border: 1px solid #000;\n}\n\n\n/* Body classes */\n\n.fc-cal-body ul {\n  display: table;\n  border-collapse: collapse;\n}\n\n.fc-cal-date-li {\n  box-sizing: border-box;\n  float: left;\n  list-style-type: none;\n  width: 14.28571%;\n  height: auto;\n  padding: 2px 0 8px;\n  margin: 0;\n}\n\n.fc-cal-date {\n  box-sizing: border-box;\n  text-align: center;\n  line-height: 2.3;\n  display: block;\n  margin: 0 auto;\n  border: 2px solid transparent;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n}\n.fc-cal-date-enabled{\n  cursor: pointer;\n}\n.fc-cal-date-enabled:hover {\n  color: #000;\n  background-color: #dcdcdc;\n  border: 2px solid #dcdcdc;\n}\n.fc-cal-date-selected,\n.fc-cal-date-selected:hover {\n  background-color: #c32a2a;\n  border: 2px solid #c32a2a;\n  color: #fff;\n}\n\n.fc-cal-date-disabled {\n  background-color: #f3f3f3;\n  border: 2px solid #f3f3f3;\n  color: #cacaca;\n}\n\n.fc-cal-date-highlight {\n  border: 2px solid #2d72de;\n}\n", ""]);

	// exports


	/***/ },
	/* 2 */
	/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


	/***/ },
	/* 3 */
	/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


	/***/ },
	/* 4 */
	/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });

	__webpack_require__(0);

	let idNo = 0;
	const UNDEFINED = undefined,
	  // basic calendar configaration
	  daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	  weekLabel = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	  monthLabel = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	  classNames = {
	    container: 'fc-cal-container',
	    header: 'fc-cal-header',
	    month: 'fc-cal-month-header',
	    year: 'fc-cal-year-header',
	    monthName: 'fc-cal-month',
	    yearName: 'fc-cal-year',
	    nav: 'fc-cal-nav',
	    navPrev: 'fc-cal-nav-prev',
	    navNext: 'fc-cal-nav-next',
	    navInactive: 'fc-cal-nav-inactive',
	    navMonth: 'fc-cal-nav-month',
	    navYear: 'fc-cal-nav-year',
	    subHeader: 'fc-cal-sub-header',
	    days: 'fc-cal-day',
	    indexedDays: 'fc-cal-day-', // Index will be added at the end
	    body: 'fc-cal-body',
	    date: 'fc-cal-date',
	    dateLI: 'fc-cal-date-li',
	    selectedDate: 'fc-cal-date-selected',
	    disabledDate: 'fc-cal-date-disabled',
	    enabledDate: 'fc-cal-date-enabled',
	    highlightedDate: 'fc-cal-date-highlight',
	    dayCol: 'fc-cal-day-col'
	  },
	  ulPadZeroStyle = {
	    padding: '0',
	    margin: 0
	  },
	  minHeight = 300,
	  minWidth = 300,
	  PX = 'px',
	  SP = ' ',
	  BLANK = '',
	  SPACE = '&nbsp;',
	  DASH = '-',
	  SLASH = '/',
	  vAlignMultiplier = {
	    top: 0,
	    middle: -0.5,
	    bottom: -1
	  },
	  hAlignMultiplier = {
	    left: 0,
	    center: -0.5,
	    right: -1
	  },
	  // get id for container
	  getuid = () => `fc_calendar-${idNo++}`,
	  // check if the year is leap year or not
	  checkLeapYear = year => ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0),
	  // apply custom style to the container
	  setStyle = (element, style) => {
	    if (style && element && element.style) {
	      for (let key in style) {
	        if (style.hasOwnProperty(key)) {
	          element.style[key] = style[key];
	        }
	      }
	    }
	  },
	  remoVeClassName = (className, element) => {
	    let classNames = element && element.className;
	    if (classNames && className) {
	      element.className = classNames.replace(new RegExp('(?:^|\\s*)' + className.trim() + '(?:\\s*|$)'), ' ');
	    }
	  },
	  removeClassInChilds = (parent, className) => {
	    let children, i, j, l, classArr;
	    if (parent && parent.getElementsByClassName) {
	      classArr = className.trim().split(SP);
	      for (j = 0, l = classArr.length; j < l; j += 1) {
	        className = classArr[j];
	        children = parent.getElementsByClassName(className);
	        for (i = children.length - 1; i >= 0; i--) {
	          remoVeClassName(className, children[i]);
	        }
	      }
	    }
	  },
	  // this function will update the calendar
	  // without re-drawing the elements
	  displayMonth = calendar => {
	    const {info, graphic} = calendar,
	      {active, rangeStart, rangeEnd, weekStartingDay, highlight, highlightClasses, showInactiveMonths} = info,
	      {monthStr, yearStr, dateElements, container, prevMonth, nextMonth, prevYear, nextYear} = graphic,
	      {month, year} = active,
	      highlightMonth = highlight && highlight[year] && highlight[year][month],
	      startingOfMonth = new Date(`${month}/1/${year}`),
	      monthStaringDay = startingOfMonth.getDay(),
	      monthStaringWeekDay = info.startingPos = (monthStaringDay - weekStartingDay) + (weekStartingDay <= monthStaringDay ? 0 : 7),
	      totalDays = daysInMonth[month - 1] + (checkLeapYear(year) && month === 2 ? 1 : 0),
	      limit = totalDays + monthStaringWeekDay,
	      l = dateElements.length,
	      startActive = validateActiveStart({day: 1, month, year}, rangeStart),
	      endActive = validateActiveEnd({day: totalDays, month, year}, rangeEnd),
	      startInactiveLimit = startActive ? 0 : (rangeStart.month === (month) && rangeStart.year === year ? rangeStart.day - 1 : totalDays),
	      endInactiveLimit = endActive ? totalDays + 1 : (rangeEnd.month === (month) && rangeEnd.year === year ? rangeEnd.day + 1 : 1);
	    let i, j, highlightInfo, highLightClass;

	    // remove previously applied Classes
	    removeClassInChilds(container, classNames.enabledDate);
	    removeClassInChilds(container, classNames.selectedDate);
	    removeClassInChilds(container, classNames.disabledDate);
	    removeClassInChilds(container, classNames.navInactive);

	    // make navigators inactive
	    if (!showInactiveMonths) {
	      if (!startActive) {
	        prevMonth.className += SP + classNames.navInactive;
	        prevYear.className += SP + classNames.navInactive;
	      }
	      if (!endActive) {
	        nextMonth.className += SP + classNames.navInactive;
	        nextYear.className += SP + classNames.navInactive;
	      }
	    }

	    // remobve all highlight classes
	    while (highlightClasses.length) {
	      highLightClass = highlightClasses.pop();
	      removeClassInChilds(container, highLightClass);
	    }

	    // month and year changed
	    monthStr.innerHTML = info.monthLabel[month - 1];
	    yearStr.innerHTML = year;
	    // print dates
	    for (i = 0; i < l; i++) {
	      if (i < monthStaringWeekDay || i >= limit) {
	        dateElements[i].innerHTML = SPACE;
	      } else {
	        j = i - monthStaringWeekDay + 1;
	        dateElements[i].innerHTML = j;
	        highlightInfo = highlightMonth && highlightMonth[j];
	        if (highlightInfo) {
	          highLightClass = SP + classNames.highlightedDate;
	          highlightInfo !== true && (highLightClass += SP + highlightInfo);
	          highlightClasses.push(highLightClass);
	        }
	        dateElements[i].className += SP + (j <= startInactiveLimit || j >= endInactiveLimit ? classNames.disabledDate : classNames.enabledDate) + (highlightInfo ? (highLightClass) : BLANK);
	      }
	    }
	    // // if the selected date is on this month, heighlight it
	    setSelectedDate(calendar);
	  },

	  // this function update the day labels
	  disPlayDays = calendar => {
	    const info = calendar.info,
	      weekStartingDay = info.weekStartingDay,
	      dayElements = calendar.graphic.dayElements;
	    let j;
	    for (j = 0; j < 7; j++) {
	      dayElements[j].innerHTML = info.weekLabel[(j + weekStartingDay) % 7];
	    }
	  },
	  setSelectedDate = calendar => {
	    const {selectedDate, active, startingPos} = calendar.info,
	      {dateElements, container} = calendar.graphic;
	    // if the selected date is on this month, heighlight it
	    if (selectedDate.month === active.month && selectedDate.year === active.year) {
	      // remove the class form the old element
	      removeClassInChilds(container, classNames.selectedDate);
	      dateElements[(selectedDate.day + startingPos - 1)].className += SP + classNames.selectedDate;
	    }
	  },

	  // function to create dom elements
	  createElement = (type, options) => {
	    const {appendTo, className, id, innerHTML, events} = options,
	      element = document.createElement(type);
	    // set the class
	    className && (element.className = className);
	    // set the attributes
	    id && (element.id = id);
	    // add the innerHTML
	    innerHTML && (element.innerHTML = innerHTML);
	    if (events) {
	      for (let event in events) {
	        element.addEventListener(event, events[event]);
	      }
	    }
	    // append to it's parent
	    appendTo && appendTo.appendChild(element);
	    return element;
	  },

	  // initailise calendar for the first time
	  init = calendar => {
	    const graphic = calendar.graphic,
	      weekLabel = calendar.info.weekLabel,
	      {dateElements, dayElements} = graphic,

	      // create the cntainer
	      container = graphic.container = createElement('div', {
	        appendTo: graphic.parentElement,
	        className: classNames.container,
	        id: calendar.id
	      }),

	      // create the header div
	      calendarHeader = graphic.calendarHeader = createElement('div', {
	        appendTo: container,
	        className: classNames.header
	      }),

	      // Create the header UL
	      headerUl = graphic.headerUl = createElement('ul', {
	        appendTo: calendarHeader
	      }),

	      // create the LI for month -header
	      headerMonthLi = graphic.headerMonthLi = createElement('li', {
	        appendTo: headerUl,
	        className: classNames.month
	      }),

	      // Create the UL for month
	      headerMonthUl = graphic.headerMonthUl = createElement('ul', {
	        appendTo: headerMonthLi
	      }),

	      headerYearLi = graphic.headerYearLi = createElement('li', {
	        appendTo: headerUl,
	        className: classNames.year
	      }),

	      headerYearUl = graphic.headerYearUl = createElement('ul', {
	        appendTo: headerYearLi
	      }),

	      calendarSubHeader = graphic.calendarSubHeader = createElement('div', {
	        appendTo: container,
	        className: classNames.subHeader
	      }),

	      weekDays = graphic.weekDays = createElement('ul', {
	        appendTo: calendarSubHeader
	      }),

	      calendarBody = graphic.calendarBody = createElement('div', {
	        appendTo: container,
	        className: classNames.body
	      }),

	      days = graphic.days = graphic.dayCell = createElement('ul', {
	        appendTo: calendarBody
	      });

	    let element,
	      i;

	    // set the container style
	    setStyle(container, calendar.style);
	    // set the UL styles
	    setStyle(headerUl, ulPadZeroStyle);
	    setStyle(weekDays, ulPadZeroStyle);
	    setStyle(days, ulPadZeroStyle);
	    setStyle(headerMonthUl, ulPadZeroStyle);
	    setStyle(headerYearUl, ulPadZeroStyle);

	    graphic.prevMonth = createElement('li', {
	      appendTo: headerMonthUl,
	      className: classNames.nav + SP + classNames.navPrev + SP + classNames.navMonth,
	      innerHTML: '&#10094;',
	      events: {
	        click () {
	          let nextMonth = (calendar.info.active && calendar.info.active.month) - 1,
	            year = calendar.info.active && calendar.info.active.year;
	          if (nextMonth < 1) {
	            nextMonth = 12;
	            year--;
	          }
	          calendar.configure({
	            active: {
	              month: nextMonth,
	              year: year
	            }
	          });
	        }
	      }
	    });
	    graphic.monthStr = createElement('li', {
	      appendTo: headerMonthUl,
	      className: classNames.monthName
	    });
	    graphic.nextMonth = createElement('li', {
	      appendTo: headerMonthUl,
	      className: classNames.nav + SP + classNames.navNext + SP + classNames.navMonth,
	      innerHTML: '&#10095;',
	      events: {
	        click () {
	          let nextMonth = (calendar.info.active && calendar.info.active.month) + 1,
	            year = calendar.info.active && calendar.info.active.year;
	          if (nextMonth > 12) {
	            nextMonth = 1;
	            year++;
	          }
	          calendar.configure({
	            active: {
	              month: nextMonth,
	              year: year
	            }
	          });
	        }
	      }
	    });

	    graphic.prevYear = createElement('li', {
	      appendTo: headerYearUl,
	      className: classNames.nav + SP + classNames.navPrev + SP + classNames.navYear,
	      innerHTML: '&#10094;',
	      events: {
	        click () {
	          calendar.configure({
	            active: {
	              year: (calendar.info.active && calendar.info.active.year) - 1,
	              month: (calendar.info.active && calendar.info.active.month)
	            }
	          });
	        }
	      }
	    });
	    graphic.yearStr = createElement('li', {
	      appendTo: headerYearUl,
	      className: classNames.yearName
	    });
	    graphic.nextYear = createElement('li', {
	      appendTo: headerYearUl,
	      className: classNames.nav + SP + classNames.navNext + SP + classNames.navYear,
	      innerHTML: '&#10095;',
	      events: {
	        click () {
	          calendar.configure({
	            active: {
	              year: (calendar.info.active && calendar.info.active.year) + 1,
	              month: (calendar.info.active && calendar.info.active.month)
	            }
	          });
	        }
	      }
	    });

	    for (i = 0; i < 7; i++) {
	      // create week elements
	      element = createElement('li', {
	        appendTo: weekDays,
	        innerHTML: weekLabel[i],
	        className: classNames.days + SP + classNames.indexedDays + i
	      });
	      dayElements.push(element);
	    }
	    for (let i = 0; i < 42; i++) {
	      // create date elements
	      element = createElement('li', {
	        appendTo: days,
	        className: classNames.dateLI
	      });
	      element = createElement('span', {
	        appendTo: element,
	        className: classNames.date + SP + classNames.dayCol + DASH + (i % 7),
	        innerHTML: SPACE,
	        events: {
	          click: () => {
	            const {info, events} = calendar,
	              selectedDate = info.selectedDate,
	              active = info.active,
	              tempDate = {
	                day: i - info.startingPos + 1,
	                month: active.month,
	                year: active.year
	              };
	            if (validateActiveStart(tempDate, info.rangeStart) && validateActiveEnd(tempDate, info.rangeEnd)) {
	              selectedDate.day = tempDate.day;
	              selectedDate.month = tempDate.month;
	              selectedDate.year = tempDate.year;
	              setSelectedDate(calendar);
	              events.onDateChange && events.onDateChange(selectedDate);
	            }
	          }
	        }
	      });
	      dateElements.push(element);
	    }
	  },

	  // validate active date
	  validateActiveStart = (date, start) => {
	    const {day, month, year} = date;
	    return !(start && (start.year > year || (start.year === year && (start.month > month || (start.month === month && start.day > day)))));
	  },
	  // validate active date
	  validateActiveEnd = (date, end) => {
	    const {day, month, year} = date;
	    return !(end && (end.year < year || (end.year === year && (end.month < month || (end.month === month && end.day < day)))));
	  };

	// calendar constructor
	class Calendar {
	  constructor (config) {
	    const calendar = this,
	      today = new Date(),
	      currentDate = {
	        day: today.getDate(),
	        month: (today.getMonth() + 1),
	        year: today.getFullYear()
	      };
	    calendar.graphic = {
	      parentElement: document.body,
	      dateElements: [],
	      dayElements: []
	    };
	    calendar.style = {
	      position: 'absolute',
	      top: '0px',
	      left: '0px',
	      width: minWidth + PX,
	      // height: minHeight + PX,
	      overflow: 'hidden'
	    };
	    calendar.id = getuid();
	    calendar.events = {};
	    calendar.info = {
	      selectedDate: currentDate,
	      active: {
	        month: currentDate.month,
	        year: currentDate.year
	      },
	      weekLabel: [...weekLabel],
	      monthLabel: [...monthLabel],
	      weekStartingDay: 0,
	      posX: 0,
	      posY: 0,
	      height: minHeight,
	      width: minWidth,
	      vAlignment: 'top',
	      hAlignment: 'left',
	      highlightClasses: []
	    };
	    // create the elements for first time only
	    init(calendar);
	    // configure Calendar with initial config
	    calendar.configure(config, true);
	  }
	  // configure calendar
	  configure (config, doRepaint) {
	    const calendar = this,
	      {graphic, events, info, style} = calendar,
	      // displayDisabledMonth = info.displayDisabledMonth,
	      userEvents = config && config.events;

	    let parentElement,
	      temp,
	      positioningChanged = false;

	    if (!config) {
	      return;
	    }

	    // set container
	    if (config.container && (parentElement = document.getElementById(config.container))) {
	      graphic.parentElement = parentElement;
	      parentElement.appendChild(graphic.container);
	    }
	    // set User applied styles
	    if (config.style && config.style.position) {
	      style.position = config.style.position;
	      setStyle(graphic.container, style);
	    }

	    // applying visual positioning configuraions to the container
	    if (!isNaN(temp = Number(config.posX))) {
	      info.posX = temp;
	      positioningChanged = true;
	    }
	    if (!isNaN(temp = Number(config.posY))) {
	      info.posY = temp;
	      positioningChanged = true;
	    }
	    // if (!isNaN(temp = Number(config.height)) && temp > minHeight) {
	    //   info.height = temp;
	    //   style.height = temp + PX;
	    //   positioningChanged = true;
	    // }
	    if (!isNaN(temp = Number(config.width)) && temp > minWidth) {
	      info.width = temp;
	      style.width = temp + PX;
	      positioningChanged = true;
	    }
	    if (config.vAlignment && (temp = config.vAlignment.toLowerCase()) && (vAlignMultiplier[temp] !== UNDEFINED)) {
	      info.vAlignment = temp;
	      positioningChanged = true;
	    }
	    if (config.hAlignment && (temp = config.hAlignment.toLowerCase()) && (hAlignMultiplier[temp] !== UNDEFINED)) {
	      info.hAlignment = temp;
	      positioningChanged = true;
	    }

	    // set events on date, month and year change
	    if (userEvents) {
	      typeof userEvents.onDateChange === 'function' && (events.onDateChange = userEvents.onDateChange);
	      typeof userEvents.onYearChange === 'function' && (events.onYearChange = userEvents.onYearChange);
	      typeof userEvents.onMonthChange === 'function' && (events.onMonthChange = userEvents.onMonthChange);
	    }

	    if (config.highlight) {
	      info.highlight = config.highlight;
	      doRepaint = true;
	    } else if (config.highlight === null) {
	      delete info.highlight;
	      doRepaint = true;
	    }

	    // set calendar date
	    if ((temp = config.selectedDate) && !isNaN(Date.parse(temp.month + SLASH + temp.day + SLASH + temp.year))) {
	      info.selectedDate = config.selectedDate;
	      // update the active month as well
	      info.active.month = info.selectedDate.month;
	      info.active.year = info.selectedDate.year;
	      doRepaint = true;
	    }
	    if (config.showInactiveMonths !== UNDEFINED) {
	      info.showInactiveMonths = !!config.showInactiveMonths;
	    }

	    // set active month
	    if (config.active) {
	      temp = {
	        month: config.active.month || info.active.month,
	        year: config.active.year || info.active.year
	      };
	      if ((info.active.month !== temp.month || info.active.year !== temp.year) && (info.showInactiveMonths || (validateActiveStart(temp, info.rangeStart) && validateActiveEnd(temp, info.rangeEnd)))) {
	        info.active.month = temp.month;
	        info.active.year = temp.year;
	        doRepaint = true;
	      }
	    }
	    // set month names
	    if (config.monthLabel && config.monthLabel.length === 12) {
	      info.monthLabel = config.monthLabel;
	      doRepaint = true;
	    }
	    // set day names
	    if (config.weekLabel && config.weekLabel.length === 7) {
	      info.weekLabel = config.weekLabel;
	      disPlayDays(calendar);
	    }
	    // set Starting day of week
	    if (config.weekStart !== UNDEFINED && info.weekStartingDay !== config.weekStart) {
	      info.weekStartingDay = config.weekStart;
	      disPlayDays(calendar);
	    }
	    // Set active range start
	    if (config.rangeStart && validateActiveStart(info.selectedDate, config.rangeStart)) {
	      info.rangeStart = config.rangeStart;
	      doRepaint = true;
	    } else if (config.rangeStart === null) {
	      delete info.rangeStart;
	      doRepaint = true;
	    }
	    // Set active range end
	    if (config.rangeEnd && validateActiveEnd(info.selectedDate, config.rangeEnd)) {
	      info.rangeEnd = config.rangeEnd;
	      doRepaint = true;
	      // Check whether the old active date is valid or not
	    } else if (config.rangeEnd === null) {
	      delete info.rangeEnd;
	      doRepaint = true;
	    }
	    // set calendar to the desired date
	    doRepaint && displayMonth(calendar);
	    if (positioningChanged) {
	      style.left = (info.posX + (info.width * (hAlignMultiplier[info.hAlignment] || 0))) + PX;
	      info.height = (graphic.container && graphic.container.offsetHeight) || minHeight;
	      style.top = (info.posY + (info.height * (vAlignMultiplier[info.vAlignment] || 0))) + PX;
	      setStyle(graphic.container, style);
	    }
	  }
	  // call show function show calendar
	  show () {
	    const calendar = this,
	      container = calendar.graphic.container;
	    container.style.visibility = 'visible';
	    container.style.opacity = '1';
	  }
	  // call hide function to hide calendar
	  hide () {
	    const calendar = this,
	      container = calendar.graphic.container;
	    container.style.visibility = 'hidden';
	    container.style.opacity = '0';
	  }
	  // returns the current or selected date
	  getDate () {
	    return this.info.selectedDate;
	  }
	  // add custom funcion on click
	  addEventListner (eventName, handler) {
	    typeof handler === 'function' && (this.events && (this.events[eventName] = handler));
	  }
	  // remove custom funcion on click
	  removeEventListner (eventName) {
	    if (this.events && this.events[eventName]) {
	      delete this.events[eventName];
	    }
	  }
	}
	// attache to the window if availabel
	if (window) {
	  window.FusionCalendar = Calendar;
	}
	/* harmony default export */ exports["default"] = Calendar;


	/***/ }
	/******/ ]);


/***/ }
/******/ ]);