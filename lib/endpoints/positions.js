const axios = require('axios')
const Positions = {}

// GET REQUEST for posistions
Positions.getPositions = function () {
  let url = this.accountURL + '/positions'
  return axios.get(url, this.header)
}

// GET REQUEST for open positions
Positions.getOpenPositions = function () {
  let url = this.accountURL + '/openPositions'
  return axios.get(url, this.header)
}

// GET REQUEST for a specific instrument positions
// instrument = 'string' (e.g. 'USD_CAD')
Positions.getInstrumentPosition = function (instrument) {
  let url = this.accountURL + `/positions/${instrument}`
  return axios.get(url, this.header)
}

/* PUT REQUEST to close position
  options = {
    instrument: string,
    longUnits: integer,
    longClientExtensions: object,
    shortUnits: integer,
    shortClientExtensions: object
  }
*/
Positions.closeInstrumentPosition = function (options) {
  let url = this.accountURL + `/positions/${options.instrument}/close`
  if (!!options.longUnits) {
    options.longUnits = options.longUnits.toString()
  } else {
    options.shortUnits = options.shortUnits.toString()
  }
  return axios.put(url, 
    {
      longUnits: options.longUnits,
      longClientExtensions: options.longClientExtensions,
      shortUnits: options.shortUnits,
      shortClientExtensions: options.shortClientExtensions
    }, 
  this.header)
}

module.exports = Positions