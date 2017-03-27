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
      config.ref = extData.ref || undefined;
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
      config.styles.inputButton.width = (extData.styles && extData.styles.width) ||
        defaultStyles.inputButton.width;
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
              addCssRules(self[key].getIndividualClassNames(self[key].getStateClassName(state)),
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
              if (self.activeDate === 'startDate') {
                if (self.fromDate.state !== 'errored') { self.fromError.group.style('display', 'none'); }
                else { self.fromError.group.style('display', 'block'); }
              }
              else if (self.activeDate === 'endDate') {
                if (self.toDate.state !== 'errored') { self.toError.group.style('display', 'none'); }
                else { self.toError.group.style('display', 'block'); }
              }

              self.activeBtn = undefined;
            }

            self.calendar.hide();
          }
        }
      });

      d3.select('html').on('click.' + new Date().getTime(), function outsideClick () {
        var target = d3.event.target,
          buttonGroup = self.activeBtn && self.activeBtn.buttonGroup.node();

        if (!isDescendant(self.calendar.graphic.container, target) && !isDescendant(buttonGroup, target) &&
            self.activeBtn && self.activeBtn.elements.inputBox.node() !== target) {
          self.calendar.hide();
          self.activeBtn && self.activeBtn.removeState('selected');
          self.activeBtn = undefined;
        }
      });

      d3.select('html').on('touchend.' + new Date().getTime(), function outsideTouch () {
        var target = d3.event.target,
          buttonGroup = self.activeBtn && self.activeBtn.buttonGroup.node(),
          activeDate,
          errorGroup;

        if (!isDescendant(self.calendar.graphic.container, target) && !isDescendant(buttonGroup, target) &&
            self.activeBtn && self.activeBtn.elements.inputBox.node() !== target) {
          self.calendar.hide();
          if (self.activeBtn) {
            self.activeBtn && self.activeBtn.removeState('selected');
            // Fix for ipad safari blur event not firing
            self.activeBtn && self.activeBtn.elements.inputBox.node().blur();
          }
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
              selected: {
                className: inputBtnStyles.states.selected.className
              },
              errored: {
                className: inputBtnStyles.states.errored.className
              }
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
              selected: {
                className: inputBtnStyles.states.selected.className
              },
              errored: {
                className: inputBtnStyles.states.errored.className
              }
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

    configure () {

    }

    placeInCanvas () {
      var self = this;
      self.spaceManagerInstance.add([{
        name: function () {
          return 'DateRangeChooserToolbox';
        },
        ref: function (obj) {
          var userRef = self.config.ref;
          return userRef === undefined ? obj.chart : userRef;
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
      }], Object.keys(self.chartInstance.apiInstance.getComponentStore().getAllCanvas()).length);
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
