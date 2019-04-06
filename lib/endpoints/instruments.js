const axios = require('axios')
const Instruments = {}

/* GET REQUEST for instrument candles
  instrument = 'string' (e.g. 'USD_CAD')
  options = {
    price: stringFloat,
    granularity: string,
    count: int,
    smooth: boolean,
    includeFirst: boolean,
    from: RFC3339 || UNIX,
    to: RFC3339 || UNIX,
    dailyAlignment: int,
    alignmentTimezone: string,
    weeklyAlignment: string
  }  
*/
Instruments.getCandles = function (instrument, options) {
  let url = this.baseURL + `instruments/${instrument}/candles` + this.formatQuery(options)
  return axios.get(url, this.header)
}

/* GET REQUEST for instrument's orderbook
  options = {
    instrument: 'string' (e.g. 'USD_CAD')
    time: 'dateTime' DEFAULT: most recent time (e.g. 2016-06-22T18: 41:36.201836422Z) or as UNIX depending on config
  }
*/
Instruments.getOrderBook = function (options) {
  var url = this.baseURL + `instruments/${options.instrument}/orderBook`
  url += this.formatTime(options.time)
  return axios.get(url, this.header)
}

/*GET REQUEST for instrument's positionbook 
  options = {
    instrument: 'string' (e.g. 'USD_CAD')
    time: 'dateTime' DEFAULT: most recent time (e.g. 2016-06-22T18:41:36.201836422Z) or as UNIX depending on config 
  }
*/
Instruments.getPositionBook = function (options) {
  let url = this.baseURL + `instruments/${options.instrument}/positionBook`
  url += this.formatQuery(options.time)
  return axios.get(url, this.header)
}

module.exports = Instruments
