const axios = require('axios')
const Accounts = {}

// GET REQUEST for accounts (including all IDs if config requires change)
Accounts.getAccounts = function() {
  let url = this.baseURL + 'accounts'
  return axios.get(url, this.header)
}

// GET REQUEST for specific account details based on Account ID
Accounts.getAccountDetails = function () {
  return axios.get(this.accountURL, this.header)
}

// GET REQUEST for account summary information (similar to account details)
Accounts.getAccountSummary = function () {
  let url = this.accountURL + '/summary'
  return axios.get(url, this.header)
}

/* GET REQUEST for specific account related instrument/instrument information
  options = {
    instruments: array || string (for single instrument)
  } 
*/
Accounts.getAccountInstrument = function (options) {
  let url = this.accountURL + '/instruments'
  if (!!options) url += this.formatQuery(options)
  return axios.get(url, this.header)
}

// PATCH REQUEST for changing account alias
// alias = 'string' and is for new alias for account use
Accounts.updateAccountAlias = function (alias) {
  let url = this.accountURL + '/configuration'
  return axios.patch(url,
    { 
      'alias': alias, 
    },  
  this.header)
}

// PATCH REQUEST for changing account margin rate
// marginRate = 'stringFloat' is new margin rate for account use (e.g. '0.05')
Accounts.updateAccountMarginRate = function (marginRate) {
  let url = this.accountURL + '/configuration'
  return axios.patch(url,
    { 
      'marginRate': marginRate, 
    },  
  this.header)
}

// GET REQUEST for listing account changes since a specific transaction
// sinceTransactionID = 'stringInteger' is an account based transaction ID that augments based on account actions
Accounts.getAccountChanges = function (sinceTransactionID) {
  let url = this.accountURL + `/changes?sinceTransactionID=${sinceTransactionID}`
  return axios.get(url, this.header)
}

module.exports = Accounts