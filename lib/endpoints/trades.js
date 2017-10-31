const axios = require('axios')
const Trades = {}

/* GET REQUEST get trades
  options: {
    ids: array
    state: string
    instrument: string
    count: integer
    beforeID: integer
  }
*/
Trades.getTrades = function(options) {
  let url = this.accountURL + '/trades' + this.formatQuery(options)
  return axios.get(url, this.header)
}

// GET REQUEST get all open trades
Trades.getOpenTrades = function() {
  let url = this.accountURL + '/openTrades'
  return axios.get(url, this.header)
}

// GET REQUEST get a trade by trade ID
// tradeID = integer
Trades.getTradeByID = function(tradeID) {
  let url = this.accountURL + `/trades/${tradeID}`
  return axios.get(url, this.header)
}

// PUT REQUEST close a trade by ID and number of units
// tradeID = integer 
// units = integer || 'ALL' [set to 'ALL' by default]
Trades.closeTrade = function(tradeID, units = 'ALL') {
  let url = this.accountURL + `/trades/${tradeID}/close`
  return axios.put(url, 
    {
      units: units.toString()
    },
  this.header)
}


/* PUT REQUEST modify a trade's takeProfit, stopLoss or trailingStopLoss
tradeID = integer
changeObject = {
  takeProfit/stopLoss/trailingStopLoss: 
  { 
    timeInForce: 'GTC'(DEFAULT) OPTIONS: GTC GTD GFD FOK IOC
    price: 'stringFloat', 
    gtd: dateTime 
  }
}    
*/
Trades.modifyTrade = function(tradeID, changeObject) {
  let url = this.accountURL + `/trades/${tradeID}/orders`
  return axios.put(url, changeObject, this.header)
}

module.exports = Trades