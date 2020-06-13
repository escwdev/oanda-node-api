const axios = require('axios')
const Orders = {}

/* 
POST REQUEST to place an order
orderObject = 
  {
    type: 'string' DEFAULT: 'MARKET' LIMIT STOP MARKET_IF_TOUCHED TAKE_PROFIT STOP_LOSS TRAILING_STOP_LOSS
    instrument: 'string' (e.g. 'USD_CAD')
    units: integer (e.g. 100 || -100)
    timeInForce: 'string' DEFAULT:'FOK' GTC GTD DFD IOC
    priceBound: 'stringFloat'
    positionFill: 'string' DEFAULT: 'DEFAULT' OPEN_ONLY REDUCE_FIRST REDUCE_ONLY
    triggerCondition: 'string' DEFAULT 'DEFAULT' INVERSE BID ASK MID
    takeProfitonFill || stopLossOnFill: {
      price: 'stringFloat'
      timeInForce: 'string' DEFAULT: 'GTC' GTD GFD
      gdtTime: 'DateTime' used if on GTD for timeInForce
    }
    trailingStopLossOnFill: {
      distance: 'stringFloat' like price but amount of PIPs vs static price point
      timeInForce: 'string' DEFAULT: 'GTC' GTD GFD
      gdtTime: 'DateTime' used if on GTD for timeInForce
    }
    distance: 'stringFloat' amount of PIPs for trailingStopLossOrders
  } 
*/
Orders.placeOrder = function(orderObject) {
  let url = this.accountURL + '/orders'
  return axios.post(url, 
    {
      order: orderObject
    },
    this.header)
} 

/* GET REQUEST for orders
  options = {
    ids: array
    state: string
    instrument: string
    count: integer
    beforeID: integer
  }
*/
Orders.getOrders = function(options) {
  let url = this.accountURL + '/orders'
  if (!!options) url += this.formatQuery(options)
  return axios.get(url, this.header)
}

// GET REQUEST for pending orders
Orders.getPendingOrders = function() {
  let url = this.accountURL + '/pendingOrders'
  return axios.get(url, this.header)
}

// GET REQUEST by order ID
// orderID = 'stringInteger' based on transaction ID
Orders.getOrderByID = function(orderID) {
  let url = this.accountURL + `/orders/${orderID}`
  return axios.get(url, this.header)
}

/* 
PUT REQUEST to replace an order
orderObject = 
  {
    type: 'string' DEFAULT: 'MARKET' LIMIT STOP MARKET_IF_TOUCHED TAKE_PROFIT STOP_LOSS TRAILING_STOP_LOSS
    instrument: 'string' (e.g. 'USD_CAD')
    units: 'stringInteger' (e.g. '100' || '-100')
    timeInForce: 'string' DEFAULT:'FOK' GTC GTD DFD IOC
    priceBound: 'stringFloat'
    positionFill: 'string' DEFAULT: 'DEFAULT' OPEN_ONLY REDUCE_FIRST REDUCE_ONLY
    triggerCondition: 'string' DEFAULT 'DEFAULT' INVERSE BID ASK MID
    takeProfitonFill || stopLossOnFill: {
      price: 'stringFloat'
      timeInForce: 'string' DEFAULT: 'GTC' GTD GFD
      gdtTime: 'DateTime' used if on GTD for timeInForce
    }
    trailingStopLossOnFill: {
      distance: 'stringFloat' like price but amount of PIPs vs static price point
      timeInForce: 'string' DEFAULT: 'GTC' GTD GFD
      gdtTime: 'DateTime' used if on GTD for timeInForce
    }
    distance: 'stringFloat' amount of PIPs for trailingStopLossOrders
  } 
*/
Orders.replaceOrder = function(orderID, orderObject) {
  let url = this.accountURL + `/orders/${orderID}`
  return axios.put(url, 
    {
      order: orderObject
    },
    this.header)
}

// PUT REQUEST to cancel order
// orderID = 'stringInteger' 
Orders.cancelOrder = function(orderID) {
  let url = this.accountURL + `/orders/${orderID}/cancel`
  return axios.put(url, {}, this.header)
}

module.exports = Orders