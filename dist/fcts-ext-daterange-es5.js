!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";var r=n(1),o=n(2),i=new o;i.register("extension",["date-range-chooser",function(t){var e=this,n=e.extAPI;n({init:function(t){t("X-Axis","Y-Axis","lol",function(t,n){e.x=t,e.y=n})}})}]);var a=new r;console.log(JSON.stringify(a.getRange()))},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),o=function(){function t(){n(this,t),this.dateRange={startDate:126071,endDate:127683}}return r(t,[{key:"getRange",value:function(){return this.dateRange}},{key:"getStartDate",value:function(){return this.dateRange.startDate}},{key:"getEndDate",value:function(){return this.dateRange.endDate}}]),t}();t.exports=o},function(t,e){"use strict";var n=function(){};n.prototype.register=function(t,e){var n=e[0],r=e[1];console.log("Currently active extension: "+n),r.bind(this,565)()},n.prototype.extAPI=function(t){t.init(function(){for(var t=[],e=arguments[arguments.length-1],n=0;n<arguments.length-1;n++)t.push(arguments[n]);e.apply(this,t)})},t.exports=n}]);