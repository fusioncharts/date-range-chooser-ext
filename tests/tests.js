module.exports = {
  'step one': function (browser) {
    browser
      .url('http://localhost/date-range-chooser-ext')
      .execute(function () {
        var div = document.createElement('div');
        div.innerHTML = 'Hello';
        div.style.color = '#FF0000';
        document.body.appendChild(div);
        return window.tsChart.args.dataSource.extensions['date-range-chooser'];
      }, function (result) {
        console.log(result.value);
      })
      .end();
  }
};
