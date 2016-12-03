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
      this.toolbox = dep.FusionCharts.getComponent('api', 'toolbox');
      this.HorizontalToolbar = this.toolbox.HorizontalToolbar;
      this.ComponentGroup = this.toolbox.ComponentGroup;
      this.SymbolStore = this.toolbox.SymbolStore;
      this.isDrawn = false;
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
        absoluteStart = this.globalReactiveModel.model['x-axis-absolute-range-start'],
        minDiff = this.minActiveInterval,
        actualDiff = this.endDt - startTimestamp;
      if (startTimestamp <= this.endDt && startTimestamp >= absoluteStart && actualDiff > minDiff) {
        this.startDt = startTimestamp;
        this.globalReactiveModel.model['x-axis-visible-range-start'] = this.startDt;
      } else {
        // this.fromDate.updateVisual('errored');
        console.error('From Date error state!');
      }
    }

    get endDate () {
      return this.endDt;
    }

    set endDate (endDt) {
      let endTimestamp = this.getTimestamp(endDt),
        absoluteEnd = this.globalReactiveModel.model['x-axis-absolute-range-end'],
        minDiff = this.minActiveInterval,
        actualDiff = endTimestamp - this.startDt;
      if (endTimestamp >= this.startDt && endTimestamp <= absoluteEnd && actualDiff > minDiff) {
        this.endDt = endTimestamp;
        this.globalReactiveModel.model['x-axis-visible-range-end'] = this.endDt;
      } else {
        // this.toDate.updateVisual('errored');
        console.error('To Date error state!');
      }
    }

    getTimestamp (dateStr) {
      let dateFormatter = new dep.DateTimeFormatter(this.extData.dateFormat);
      return +dateFormatter.getNativeDate(dateStr);
    }

    getDate (timestamp) {
      var date = new Date(timestamp);
      return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
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
          instance.extData = extData;
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

      fromDateLabel = new this.toolbox.Label(
        'From:', {
          smartLabel: this.smartLabel,
          paper: this.graphics.paper
        }, {
          text: {
            style: {
              'font-size': '13',
              'font-family': '"Lucida Grande", sans-serif',
              // 'font-weight': 'bold',
              'fill': '#4B4B4B'
            }
          }
        }
      );

      toDateLabel = new this.toolbox.Label(
        'To:', {
          smartLabel: this.smartLabel,
          paper: this.graphics.paper
        }, {
          text: {
            style: {
              'font-size': '13',
              'font-family': '"Lucida Grande", sans-serif',
              // 'font-weight': 'bold',
              'fill': '#4B4B4B'
            }
          }
        }
      );

      self.fromDate = new this.toolbox.InputTextBoxSymbol({
        width: 120,
        height: 22
      }, {
        paper: this.graphics.paper,
        chart: this.chart,
        smartLabel: this.smartLabel,
        chartContainer: this.graphics.container
      }, {
        'strokeWidth': 1,
        'stroke': '#ced5d4',
        'symbolStrokeWidth': 0,
        'radius': 2,
        'margin': {
          'right': 22
        },
        'btnTextStyle': {
          'font-family': '"Lucida Grande", sans-serif',
          'fontSize': 13
        },
        'label': fromFormattedDate,
        // 'customConfig': {
        //   'errored': {
        //     'hover': {
        //       'fill': '#FFEFEF',
        //       'stroke-width': 1,
        //       'stroke': '#D25353'
        //     },
        //     'normal': {
        //       'fill': '#FFEFEF',
        //       'stroke-width': 1,
        //       'stroke': '#D25353'
        //     },
        //     'pressed': {
        //       'fill': '#FFEFEF',
        //       'stroke-width': 1,
        //       'stroke': '#D25353'
        //     }
        //   }
        // },
        'labelFill': '#696969'
      });

      self.fromDate.setStateConfig({
        pressed: {
          config: {
            pressed: {
              'fill': '#FFFFFF',
              'stroke-width': 1,
              'stroke': '#1E1F1F'
            },
            normal: {
              'fill': '#FFFFFF',
              'stroke-width': 1,
              'stroke': '#1E1F1F'
            },
            hover: {
              'fill': '#FFFFFF',
              'stroke-width': 1,
              // 'stroke': '#1E1F1F'
              'stroke': '#0000FF'
            }
          }
        }
      });

      self.toDate = new this.toolbox.InputTextBoxSymbol({
        width: 120,
        height: 22
      }, {
        paper: this.graphics.paper,
        chart: this.chart,
        smartLabel: this.smartLabel,
        chartContainer: this.graphics.container
      }, {
        'strokeWidth': 1,
        'stroke': '#ced5d4',
        'symbolStrokeWidth': 0,
        'radius': 2,
        'btnTextStyle': {
          'font-family': '"Lucida Grande", sans-serif',
          'fontSize': 13
        },
        'label': toFormattedDate,
        // 'customConfig': {
        //   'errored': {
        //     'hover': {
        //       'fill': '#FFEFEF',
        //       'stroke-width': 1,
        //       'stroke': '#D25353'
        //     },
        //     'normal': {
        //       'fill': '#FFEFEF',
        //       'stroke-width': 1,
        //       'stroke': '#D25353'
        //     },
        //     'pressed': {
        //       'fill': '#FFEFEF',
        //       'stroke-width': 1,
        //       'stroke': '#D25353'
        //     }
        //   }
        // },
        'labelFill': '#696969'
      });

      self.toDate.setStateConfig({
        pressed: {
          config: {
            pressed: {
              'fill': '#FFFFFF',
              'stroke-width': 1,
              'stroke': '#1E1F1F'
            },
            normal: {
              'fill': '#FFFFFF',
              'stroke-width': 1,
              'stroke': '#1E1F1F'
            },
            hover: {
              'fill': '#FFFFFF',
              'stroke-width': 1,
              'stroke': '#1E1F1F'
            }
          }
        }
      });

      self.fromDate.attachEventHandlers({
        click: {
          fn: () => {
            self.fromDate.edit();
            self.fromDate.updateVisual('pressed');
          }
        },
        textOnBlur: function () {
          self.fromDate.blur();
          self.startDate = self.fromDate.getText();
          self.fromDate.updateVisual('enabled');
        }
      });

      self.toDate.attachEventHandlers({
        click: {
          fn: () => {
            self.toDate.edit();
            self.toDate.updateVisual('pressed');
          }
        },
        textOnBlur: function () {
          self.toDate.blur();
          self.endDate = self.toDate.getText();
          self.toDate.updateVisual('enabled');
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
    };

    getLogicalSpace (availableWidth, availableHeight) {
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
    };

    placeInCanvas () {
      var self = this;
      self.padding = 5;
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
          return obj[self.extData.layout] || obj['inline'];
        },
        orientation: [{
          type: function (obj) {
            return obj[self.extData.orientation] || obj['horizontal'];
          },
          position: [{
            type: function (obj) {
              return obj[self.extData.position] || obj['top'];
            },
            alignment: [{
              type: function (obj) {
                return obj[self.extData.alignment] || obj['right'];
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
            // self.fromDate.blur(new Date(start[1]).toLocaleDateString());
            // self.toDate.blur(new Date(end[1]).toLocaleDateString());
            self.startDt = start[1];
            self.fromDate.blur(self.getDate(start[1]));
            self.endDt = end[1];
            self.toDate.blur(self.getDate(end[1]));
          }
        );
      }
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
