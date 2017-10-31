// Get account details and log to console
api.getAccountDetails().then((resp) => {
  console.log(resp.data)
}).catch((err) => {
  console.log(err)
})

// Get transactions and log to console 
api.getTransactions({from: new Date(2017, 9, 1)}).then((resp) => {
  console.log(resp.data)
}).catch((err) => {
  console.log(err)
})

// Get candle data of M5 granulairy for 500 periods and log to console
api.getCandles('USD_CAD', {count: 500}).then((resp) => {
  console.log(resp.data)
}).catch((err) => {
  console.log(err)
})

// Place an order
api.placeOrder({
  type: 'MARKET',
  instrument: 'USD_CAD',
  units: 10000,
  takeProfitOnFill: {
    price: '1.31013',
    timeInForce: 'GTC'
  },
  stopLossOnFill: {
    price: '1.28013',
    timeInForce: 'GTC'
  }
}).then((resp) => {
  console.log(resp.data)
}).catch ((err) => {
  console.log(err)
})

// Modify a trade
api.modifyTrade(1355, {
  stopLoss: {
    price: '1.27013',
    timeInForce: 'GTC'
  }
}).then((resp) => {
  console.log(resp.data)
}).catch((err) => {
  console.log(err)
})

// Close trade
api.closeTrade(1355).then((resp) => {
  console.log(resp.data)
}).catch((err) => {
  console.log(err)
})

// Calculate a simple moving average over a given period and return it as an array
function simpleMovingAverage(period, length) {
  let ma = []
  for (let i = 0; i < length - period; i++) {
    ma.push(data.candles.close.slice(i, period + i).reduce((x,y) => Number(x) + Number(y))/period)
  }
  data.ma = ma
}

/* Async Function to store candle data and caclulate Moving Average while updating account alias 
and getting open positions */
let data = {}

function multiAxiosData() {
  data.candles = {
    full: [],
    open: [],
    high: [],
    low: [],
    close: []
  }
  data.details = []
  data.positions = []
  Promise.all([
    api.getCandles('USD_CAD', {count: 200}), 
    api.updateAccountAlias('escdev'), 
    api.getOpenPositions()
  ])
  .then((resp) => {
      data.candles.full = resp[0].data.candles.map(i => i)
      resp[0].data.candles.map((i) => i.mid).forEach(i => {
      data.candles.open.push(i.o)
      data.candles.high.push(i.h)
      data.candles.low.push(i.l)
      data.candles.close.push(i.c) 
    })
    simpleMovingAverage(5, data.candles.open.length)
    console.log(resp[1].data)
    data.positions = resp[2].data
    api.getAccountDetails().then(r => console.log(r.data)).catch(e => console.log(e))
  })
}


/* Get candle data for specific instrument over a given period with default period length
Create function scope variable from response
Test and log to console the larger of index 1 and 2 candle's opening price */
api.getCandles('USD_CAD', {count: 20}).then((response) => { 
  data = response.data.candles.map(i => i.mid)
  if (data[1].o > data[2].o) {
    data = data[1].o
  } else {
    data = data[2].o
  }
})