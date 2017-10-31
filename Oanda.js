const qs = require('querystring')

const Oanda = {
  // Initalizes the API-WRAPPER Object with config inputs
  init: function(config) {
    const Accounts = require('./lib/endpoints/accounts')
    const Instruments = require('./lib/endpoints/instruments')
    const Positions = require('./lib/endpoints/positions')
    const Pricing = require('./lib/endpoints/pricing')
    const Orders = require('./lib/endpoints/orders')
    const Transactions = require('./lib/endpoints/transactions')
    const Trades = require('./lib/endpoints/trades')
    Object.assign(this, Accounts, Instruments, Positions, Transactions, Trades, Orders, Pricing)
    this.baseURL = (function() {
      if (config.env === 'fxPractice') {
        return 'https://api-fxpractice.oanda.com/v3/'
      } else {
        return 'https://api-fxtrade.oanda.com/v3/'
      }
    })() 
    this.accountURL = this.baseURL + 'accounts/' + config.accountID
    this.accountID = config.accountID
    this.header = {
      headers: { 
        'Authorization': config.auth,
        'Accept-Datetime-Format': config.dateFormat
     }
    }
  },
  formatQuery: function(query) {
    if (Object.values(this.header.headers).includes('RFC3339')) {
      if (query.time) query.time = query.time.toJSON()
      if (query.from) query.from = query.from.toJSON()
      if (query.to) query.to = query.to.toJSON()
    }
    for (let prop in query) {
      if (!!Array.isArray(query[prop])) query[prop] = query[prop].join()
    } 
    return '?' + qs.stringify(query)
  },
  formatTime: function(time) {
    if (Object.values(this.header.headers).includes('RFC3339')) {
      return '?time=' + time.toJSON().replace(/[:]/g, "%3A")
    } else {
      return '?time=' + time
    }
  }
}

module.exports = Oanda
