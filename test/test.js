var chai = require('chai'),
  assert = chai.assert,
  webdriverio = require('webdriverio');

describe('Webdriverio tests', function () {
  var client;

  before(function () {
    client = webdriverio.remote({
      desiredCapabilities: [{
        browserName: 'chrome'
      }, {
        browserName: 'firefox'
      }]
    });
    return client.init();
  });

  it('DateRangeChooser test', function () {
    return client
      .url('http://localhost/date-range-chooser-ext')
      .getTitle().then(function (title) {
        assert.strictEqual(title, 'FCTS Date Range Extension');
      });
  });

  after(function () {
    return client.end();
  });
});
