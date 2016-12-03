'use strict';
/**
 * @private
 */
var moment = require('moment');

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
      this.startText = {
        attr: function () {}
      };
      this.endText = {
        attr: function () {}
      };
    }

    /**
     * An object representing the start and end dates.
     * @type {DateRange.range}
     */
    get startDate () {
      return this.startDt;
    }

    set startDate (startDt) {
      let startTimestamp = parseInt(moment(startDt, 'DD-MM-YYYY').format('x')),
        absoluteStart = this.globalReactiveModel.model['x-axis-absolute-range-start'];
      if (startTimestamp <= this.endDt && startTimestamp >= absoluteStart) {
        this.startDt = startTimestamp;
        this.globalReactiveModel.model['x-axis-visible-range-start'] = this.startDt;
      } else {
        // this.fromDate.updateVisual('errored');
        console.error('From Date error state!');
      }
    }

    dateFormatter (epoch, separator) {
      epoch = new Date(epoch);
      var formattedDate = [epoch.getUTCDate(), (epoch.getUTCMonth() + 1), epoch.getUTCFullYear()];
      formattedDate = formattedDate.join(separator);
      return formattedDate;
    }

    get endDate () {
      return this.endDt;
    }

    set endDate (endDt) {
      let endTimestamp = parseInt(moment(endDt, 'DD-MM-YYYY').format('x')),
        absoluteEnd = this.globalReactiveModel.model['x-axis-absolute-range-end'];
      if (endTimestamp >= this.startDt && endTimestamp <= absoluteEnd) {
        this.endDt = endTimestamp;
        this.globalReactiveModel.model['x-axis-visible-range-end'] = this.endDt;
      } else {
        // this.toDate.updateVisual('errored');
        console.error('To Date error state!');
      }
    }

    /**
     * Swaps the start date and the end date of the date range
     * @private
     */
    swapDates () {
      let temp = this.dateRange.startDate;
      this.dateRange.startDate = this.dateRange.endDate;
      this.dateRange.endDate = temp;
    }

    /**
     * Syncs the daterange shown by the FusionCharts time series chart and the Date Range Chooser
     * @private
     */
    syncRange () {}

    /**
     * Returns a formatted date string from FusionCharts when given a UNIX timestamp
     * @param  {number} timestamp - A UNIX timestamp to be converted to a date string
     * @return {string} - A date string which is equivalent to the given timestamp
     */
    getFormattedDate (timestamp) {
      return this.chart.getFormattedDate(timestamp);
    }

    /**
     * Returns a UNIX timestamp from FusionCharts when given a formatted date string
     * @param  {string} dateString - A date string to be converted to a UNIX timestamp
     * @return {number} A UNIX timestamp which is equivalent to the given date string
     */
    getTimestamp (dateString) {
      return this.chart.getTimestamp(dateString);
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
        'yAxis',
        'graphics',
        'chart',
        'dataset',
        'PlotManager',
        'canvasConfig',
        'MarkerManager',
        'reactiveModel',
        'globalReactiveModel',
        'spaceManagerInstance',
        'extData',
        'smartLabel',
        function (
              xAxis,
              yAxis,
              graphics,
              chart,
              dataset,
              plotManager,
              canvasConfig,
              markerManager,
              reactiveModel,
              globalReactiveModel,
              spaceManagerInstance,
              extData,
              smartLabel) {
          instance.extData = extData;
          instance.xAxis = xAxis;
          instance.yAxis = yAxis;
          instance.graphics = graphics;
          instance.chart = chart;
          instance.dataset = dataset;
          instance.plotManager = plotManager;
          instance.markerManager = markerManager;
          instance.canvasConfig = canvasConfig;
          instance.reactiveModel = reactiveModel;
          instance.globalReactiveModel = globalReactiveModel;
          instance.spaceManagerInstance = spaceManagerInstance;
          instance.smartLabel = smartLabel;
        }
      ]);
      this.spaceManagerInstance = instance.spaceManagerInstance;
      this.globalReactiveModel = instance.globalReactiveModel;
      this.startDt = instance.globalReactiveModel.model['x-axis-visible-range-start'];
      this.endDt = instance.globalReactiveModel.model['x-axis-visible-range-end'];
      this.startDataset = instance.globalReactiveModel.model['x-axis-absolute-range-start'];
      this.endDataset = instance.globalReactiveModel.model['x-axis-absolute-range-end'];
      this.toolbars = [];
      this.measurement = {};
      this.toolbars.push(this.createToolbar());
      return this;
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

      fromFormattedDate = moment(this.startDt, 'x').format('DD-MM-YYYY');

      toFormattedDate = moment(this.endDt, 'x').format('DD-MM-YYYY');
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
      var measurement = this.measurement,
        toolbars = this.toolbars,
        ln,
        i,
        toolbar,
        model = this.globalReactiveModel,
        self = this;

      x = x === undefined ? measurement.x : x;
      y = y === undefined ? measurement.y : y;
      width = width === undefined ? measurement.width : width;
      height = height === undefined ? measurement.height : height;
      group = group === undefined ? this.parentGroup : group;
      if (width && height) {
        this.isDrawn = true;
        for (i = 0, ln = toolbars.length; i < ln; i++) {
          toolbar = toolbars[i];
          toolbar.draw(x, y, group);
        }
        model.onPropsChange(['x-axis-visible-range-start', 'x-axis-visible-range-end'],
          (start, end) => {
            // self.fromDate.blur(new Date(start[1]).toLocaleDateString());
            // self.toDate.blur(new Date(end[1]).toLocaleDateString());
            self.fromDate.blur(moment(start[1], 'x').format('DD-MM-YYYY'));
            self.toDate.blur(moment(end[1], 'x').format('DD-MM-YYYY'));
          }
        );
      }
    };
  }
  return DateRange;
};
