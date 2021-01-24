const axios = require('axios')
const Transactions = {}


/* GET REQUEST for transactions
  options = {
    from: dateTime,
    to: dateTime,
    pageSize: integer, [100-1000]
    type: array
  }
*/
Transactions.getTransactions = function(options) {
  let url = this.accountURL + '/transactions/' + this.formatQuery(options)
  return axios.get(url, this.header)
}

// GET REQUEST transaction data by id 
// TradeID = integer
Transactions.getTransactionByID = function(transactionID) {
  let url = this.accountURL + `/transactions/${transactionID}`
  return axios.get(url, this.header)
}

/* GET REQUEST for range of transactions between two trade IDs
  options = {
    to: integer,
    from: integer, 
    type: array
  }
*/
Transactions.getTransactionsByIDRange = function(options) {
  let url = this.accountURL + `/transactions/idrange` + this.formatQuery(options)
  return axios.get(url, this.header)
}

// GET REQUEST for range of transactions since a trade ID
// tradeID = integer
Transactions.getTransactionsSinceID= function(transactionID) {
  let url = this.accountURL + `/transactions/sinceid?id=${transactionID}`
  return axios.get(url, this.header)
}

module.exports = Transactions