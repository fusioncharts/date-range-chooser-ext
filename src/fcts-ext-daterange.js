class DateRange {
  constructor () {
    this.dateRange = {
      startDate: 1260,
      endDate: 127683
    };
  }

  getRange () {
    return this.dateRange.startDate;
  }
}

var dateRange = new DateRange();
console.log(dateRange.getRange());
