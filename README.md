# oanda-node-api

This is a simple promise based api-wrapper for Oanda's REST v20 API. The sole required dependency outside of Node.js 8.x modules is axios which performs the HTTP requests. Mocha/chai has also been included for basic testing. 

This is a hobby project and no guarantees can be made towards its reliability. If you would like to support the project, please feel free to contact me or star it.

## Getting Started

Install with NodeJS and Node Package Manager (npm) in your root project folder.

`npm install oanda-node-api`

Once the npm install is complete, require the package in your chosen JavaScript file. You will also need to declare a configuration object and initialize the API wrapper. 

The configuration object requires the environment, your API authentication key provided by Oanda and your account ID. This project is only compatible with Oanda's newer v20 API. 

The environments available are fxPractice and fxTrade.

It supports both RFC3399 and UNIX formats for datetime and auto formats for calls accordingly.

Example code is as follows:

```javascript
const Oanda = require('oanda-node-api')

const config = {
  env: 'fxPractice',
  auth: 'Bearer xxxxxxxxxxxxxxxxxxxxxxXXXXXXXXXXXX',
  accountID: 'xxx-xxx-xxxxxxx-xxx',
  dateFormat: 'RFC3339'
}

const api = Object.create(Oanda)
api.init(config)
```

If you have multiple account IDs, which Oanda supports, you will need to initialize more than one API core object.

## Using the API Wrapper

Once the API wrapper object is created, you can call any of the associated functions. The function calls will return a Promise which can be utilized with .then and .catch for errors.

Simple example: 

```javascript
api.getAccountDetails().then((resp) => {
  console.log(resp.data)
}).catch((err) => {
  console.log(err)
})

// will provide a console log of:
{ account: 
  { id: 'xxx-xxx-xxxxxx-xxx',
    createdTime: '2017-10-01T20:46:35.053478376Z',
    currency: 'CAD',
    createdByUserID: xxxxxxx,
    alias: 'xxxxx',
    ...
    ...
  }
}
```

To initalize a trade:

```javascript
api.placeOrder(options).then((resp) => {
  console.log(resp.data)
}).catch((err) => {
  console.log(err)
})
```

Where options is an object containing the chosen trade options. A list of all options is included below as well as documented in the appropriate sections of code. They can also be seen on the Oanda REST v20 API documentation site http://developer.oanda.com/rest-live-v20/order-df/#OrderRequest.

More examples can be found in the example.js file.

## Rest Endpoints and Associated Functions

Where options are an object, or otherwise stated, and only the chosen options should be included. If you are unfamiliar with which option parameters are required, please review the Oanda API documentation or see below.

#### Accounts

`api.getAccounts()`  
`api.getAccountDetails()`  
`api.getAccountSummary()`  
`api.getAccountInstrument(options)`   
  > options = array || string (if single instrument) If no instrument is provided, ALL pairs are returned
  >   
     
`api.updateAccountAlias(alias)`   
  >  alias = 'string'    

`api.updateAccountMarginRate(marginRate)`   
  >  marginRate = 'stringFloat' < 0.99   
  >   

`api.getAccountChanges(sinceTransactionID)`    
  >  sinceTransactionID = integer  
  >  

#### Instruments

`api.getCandles(instrument, options)`
```javascript
  instrument = string
  options = {
    price: stringFloat,
    granularity: string,
    count: integer,
    smooth: boolean,
    to: dateTime,
    from: dateTime,
    includeFirst: boolean,
    dailyAlignment: integer,
    alignmentTimezone: string,
    weeklyAlignment: string
  }
```  
`api.getOrderBook(options)`
```javascript
  options = {
    instrument: string,
    time: dateTime
  }
```  
`api.getPostionBook(options)`
```javascript
  options = {
    instrument: string,
    time: dateTime
  }
```  

#### Orders

`api.placeOrder(orderObject)`  
```javascript
orderObject = {  
  type: 'string' DEFAULT: 'MARKET' LIMIT STOP MARKET_IF_TOUCHED TAKE_PROFIT STOP_LOSS TRAILING_STOP_LOSS  
  instrument: 'string' (e.g. 'USD_CAD')   
  units: integer (e.g. 100 || -100)  
  timeInForce: 'string' DEFAULT:'FOK' GTC GTD DFD IOC  
  priceBound: 'stringFloat'  
  positionFill: 'string' DEFAULT: 'DEFAULT' OPEN_ONLY REDUCE_FIRST REDUCE_ONLY  
  triggerCondition: 'string' DEFAULT 'DEFAULT' INVERSE BID ASK MID 
  takeProfitOnFill || stopLossOnFill: {  
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
``` 
`api.getOrders(options)` 
```javascript 
options = {
  ids: array
  state: string
  instrument: string
  count: integer
  beforeID: integer
}
```   

`api.getPendingOrders()`  
`api.getOrderByID(orderID)`   
  > orderID = 'stringInteger'    
  >   

`api.replaceOrder(orderID, orderObject)`  

```javascript
orderObject = {  
  type: 'string' DEFAULT: 'MARKET' LIMIT STOP MARKET_IF_TOUCHED TAKE_PROFIT STOP_LOSS TRAILING_STOP_LOSS  
  instrument: 'string' (e.g. 'USD_CAD')   
  units: 'stringInteger' (e.g. '100' || '-100')  
  timeInForce: 'string' DEFAULT:'FOK' GTC GTD DFD IOC  
  priceBound: 'stringFloat'  
  positionFill: 'string' DEFAULT: 'DEFAULT' OPEN_ONLY REDUCE_FIRST REDUCE_ONLY  
  triggerCondition: 'string' DEFAULT 'DEFAULT' INVERSE BID ASK MID 
  takeProfitOnFill || stopLossOnFill: {  
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
```
`api.cancelOrder(orderID)` 
  >  orderID = integer
  >

#### Positions

`api.getPositions()`  
`api.getOpenPositions()`  
`api.getInstrumentPositions(instrument)`    
  > instrument = 'string' (e.g. 'USD_CAD')   
  >   

`api.closeInstrumentPosition(options)`  
```javascript
options = {
  instrument: string,
  longUnits: integer,
  longClientExtensions: object,
  shortUnits: integer,
  shortClientExtensions: object
}
```   

#### Pricing

`api.getPricing(options)` 
```javascript
options: {
  instruments: array (e.g ['USD_CAD', 'EUR_USD'])
  time: dateTime
}
```

#### Trades

`api.getTrades(options)`
```javascript
options: {
  ids: array
  state: string
  instrument: string
  count: integer
  beforeID: integer
}  
```   

`api.getOpenTrades()`  
`api.getTradeByID(tradeID)` 
  > tradeID = integer   
  >   

`api.closeTrade(tradeID, units = 'ALL')`   
  > tradeID = integer 
  > units = integer || 'ALL' (e.g. 100) DEFAULT = 'ALL'  

`api.modifyTrade(tradeID, changeObject)`  
```javascript
tradeID = integer
changeObject =  {
  takeProfit || stopLoss || trailingStopLoss:  
    { 
      price: 'stringFloat', 
      timeInForce: 'GTC'(DEFAULT) OPTIONS: GTC GTD GFD FOK IOC  
      gtd: dateTime 
    }   
} 
```  
 
#### Transactions

`api.getTransactions(options = [])`  
```javascript
options = {
  from: dateTime,
  to: dateTime,
  pageSize: integer, [100-1000]
  type: array
}
```   

`api.getTransactionsByID(transactionID)`    
  > transactionID = integer
  >   

`api.getTransactionByIDRange(options)`
```javascript 
options = {
  to: integer,
  from: integer, 
  type: array
}
```  

`api.getTransactionSinceID(transactionID)`    
  > transactionID = integer
  >   