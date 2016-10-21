class DateRange {
  constructor () {
    this.dateRange = {
      startDate: 126071,
      endDate: 127683
    };
  }

  getRange () {
    return this.dateRange;
  }

  getStartDate () {
    return this.dateRange.startDate;
  }

  getEndDate () {
    return this.dateRange.endDate;
  }
}

module.exports = DateRange;
