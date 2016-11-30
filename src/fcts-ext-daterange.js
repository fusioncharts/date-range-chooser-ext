'use strict';
/**
 * Class representing the DateRange.
 */

module.exports = function (dep) {
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
      let startTimestamp = +new Date(startDt);
      if (startTimestamp <= this.endDt) {
        this.startDt = startTimestamp;
        this.globalReactiveModel.model['x-axis-visible-range-start'] = this.startDt;
      }
    }

    get endDate () {
      return this.endDt;
    }

    set endDate (endDt) {
      let endTimestamp = +new Date(endDt);
      if (endTimestamp >= this.startDt) {
        this.endDt = endTimestamp;
        this.globalReactiveModel.model['x-axis-visible-range-end'] = this.endDt;
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
        'smartLabel',
        'chartInstance',
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
              smartLabel) {
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

      fromFormattedDate = new Date(this.startDt).toLocaleDateString();

      toFormattedDate = new Date(this.endDt).toLocaleDateString();

      toolbar = new this.HorizontalToolbar({
        paper: this.graphics.paper,
        chart: this.chart,
        smartLabel: this.smartLabel,
        chartContainer: this.graphics.container
      });

      toolbar.setConfig({
        fill: '#fff',
        borderThickness: 0
      });

      group = new this.toolbox.ComponentGroup({
        paper: this.graphics.paper,
        chart: this.chart,
        smartLabel: this.smartLabel,
        chartContainer: this.graphics.container
      });

      group.setConfig({
        fill: '#fff',
        borderThickness: 0
      });

      fromDateLabel = new this.toolbox.Label('From:', {
        smartLabel: this.smartLabel,
        paper: this.graphics.paper
      }, {
        text: {
          style: {
            'font-size': '15',
            'font-family': 'MyriadPro'
          }
        }
      });

      self.fromDate = new this.toolbox.InputTextBoxSymbol({
        width: 80,
        height: 22
      }, {
        paper: this.graphics.paper,
        chart: this.chart,
        smartLabel: this.smartLabel,
        chartContainer: this.graphics.container
      }, {
        strokeWidth: 1,
        stroke: 'rgba(102,102,102,0.5)',
        symbolStrokeWidth: 0,
        margin: {
          right: 22
        },
        btnTextStyle: {
          fontSize: 14
        },
        label: fromFormattedDate
      });

      toDateLabel = new this.toolbox.Label('To:', {
        smartLabel: this.smartLabel,
        paper: this.graphics.paper
      }, {
        text: {
          style: {
            'font-size': '15',
            'font-family': 'MyriadPro'
          }
        }
      });

      self.toDate = new this.toolbox.InputTextBoxSymbol({
        width: 80,
        height: 22
      }, {
        paper: this.graphics.paper,
        chart: this.chart,
        smartLabel: this.smartLabel,
        chartContainer: this.graphics.container
      }, {
        strokeWidth: 1,
        stroke: 'rgba(102,102,102,0.5)',
        symbolStrokeWidth: 0,
        btnTextStyle: {
          fontSize: 14
        },
        label: toFormattedDate
      });

      self.fromDate.attachEventHandlers({
        click: {
          fn: self.fromDate.edit
        },
        textOnBlur: function () {
          self.fromDate.blur();
          self.startDate = self.fromDate.getText();
        }
      });

      self.toDate.attachEventHandlers({
        click: {
          fn: self.toDate.edit
        },
        textOnBlur: function () {
          self.toDate.blur();
          self.endDate = self.toDate.getText();
        }
      });

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
      availableWidth /= 2;
      var logicalSpace,
        width = 0,
        height = 0,
        i,
        ln;

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
          return 'ToolBoxExt';
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
          return obj.inline;
        },
        orientation: [{
          type: function (obj) {
            return obj.horizontal;
          },
          position: [{
            type: function (obj) {
              return obj.top;
            },
            alignment: [{
              type: function (obj) {
                return obj.right;
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
        for (i = 0, ln = toolbars.length; i < ln; i++) {
          toolbar = toolbars[i];
          toolbar.draw(x, y, group);
        }
      }

      model.onPropsChange(['x-axis-visible-range-start', 'x-axis-visible-range-end'], function (start, end) {
        self.fromDate.blur(new Date(start[1]).toLocaleDateString());
        self.toDate.blur(new Date(end[1]).toLocaleDateString());
      });
    };
  }
  return DateRange;
};
