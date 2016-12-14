var tsChart;
function getRandomDates (len) {
  var day = 1,
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    year = 2015,
    month = 0,
    arr = [],
    dateStr = '',
    i;

  for (i = 0; i < len; i++) {
    if (month === 11 && day === 31) {
      year++;
      month = 0;
    }
    if (day > 30 || (month === 1 && day === 28)) {
      day = 1;
      month++;
    }
    if (month > 11) {
      month = 0;
    }
    dateStr = day + '-' + months[month] + '-' + year;
    arr.push(dateStr);
    day++;
  }

  return arr;
}

function getRandomSeries (len) {
  var arr = [],
    i;

  for (i = 0; i < len; i++) {
    arr.push(Math.floor(Math.random() * 1000));
  }

  return arr;
}

FusionCharts.ready(function () {
  tsChart = new FusionCharts({
    type: 'timeseries',
    plottype: 'line',
    renderAt: 'chart-container',
    width: '100%',
    height: '413',
    dataFormat: 'json',
    dataSource: {
      extensions: {
        'date-range-chooser': {
          'disabled': false,
          'layout': 'inline',
          'orientation': 'horizontal',
          'position': 'top',
          'alignment': 'right',
          'dateFormat': '%d-%m-%Y',
          'fromText': 'From:',
          'fromTooltipText': 'From Date',
          'toText': 'To:',
          'toTooltipText': 'To Date',
          'styles': {
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
          }
        }
      },
      chart: {
        axes: [{
          x: { },
          y: { }
        }],
        datasets: [{
          category: {
            dateformat: '%e-%b-%Y',
            data: getRandomDates(600)
          },
          dataset: [{
            uid: 'ds-1',
            series: [{
              plot: {
                type: 'column'
              },
              name: 'Series 1',
              data: getRandomSeries(600)
            }, {
              plot: {
                type: 'line'
              },
              name: 'Series 1',
              data: getRandomSeries(600)
            }]
          }]
        }],
        canvas: [{
          axes: function (store) {
            return store.getAxesByIndex(0);
          },
          dataset: function (store) {
            return store.getDatasetsByIndex(0);
          }
        }],
        caption: [{
          title: {
            text: 'Sales over Time'
          },
          subtitle: {
            text: 'Gamasthene\'s Stores'
          }
        }]
      }
    }
  });
  tsChart.render();
});
