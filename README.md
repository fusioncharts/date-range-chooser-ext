# Date Range Chooser
## A FusionCharts Time Series Extension
This extension helps in selecting start and end dates of a FusionTime XT chart precisely. Using the mouse to select a part of the timeline navigator to inspect data is grossly approximate. It is often the case that one is aware of a particular period of date-time and would like to inspect the same period to visualise the corresponding data. This extension is ideal for such cases.
<script src='https://www.fusioncharts.com/startup-bridge/assets/fusioncharts.js' charset='utf-8'></script>
<script src='https://www.fusioncharts.com/startup-bridge/assets/fusioncharts.timeseries.js' charset='utf-8'></script>
<script src='../dist/date-range-chooser.js' charset='utf-8'></script>
<div id='chart-container'></div>
<script src='../main.js'></script>
### Browser Inclusion
```html
<script src='fusioncharts.js' charset='utf-8'></script>
<script src='fusioncharts.timeseries.js' charset='utf-8'></script>
<script src='date-range-chooser.js' charset='utf-8'></script>
```
### Node Inclusion
To run the extension one Node, one must also provide a custom DOM implementaion (such as [JSDOM](https://github.com/tmpvar/jsdom)).
```javascript
var FusionCharts = require('fusioncharts');
require('fusioncharts/fusioncharts.timeseries')(FusionCharts);
var DateRangeChooser = require('./fcts-ext-daterange.js');
```
