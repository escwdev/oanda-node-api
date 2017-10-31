const axios = require('axios')
const Pricing = {}

/* GET REQUEST for pricing of a instrument between a given time 
  options: {
    instruments: array (e.g ['USD_CAD', 'EUR_USD'])
    time: dateTime
  }
*/
Pricing.getPricing = function (options) {
  var url = this.accountURL + '/pricing' + this.formatQuery(options)
  return axios.get(url, this.header) 
}

module.exports = Pricing