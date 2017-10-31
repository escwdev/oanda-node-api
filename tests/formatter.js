const chai = require('chai')
const should = chai.should()
const Oanda = require('./../Oanda')
const api = Object.create(Oanda)

const config = {
  env: 'fxPractice',
  auth: 'Bearer e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  accountID: '101-002-7777777-001',
  dateFormat: 'RFC3339'
}

const configUnix = {
  env: 'fxPractice',
  auth: 'Bearer e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  accountID: '101-002-7777777-001',
  dateFormat: 'UNIX'
}

api.init(config)

describe('api.init(config)', function() {
  it('should create api wrapper object config variables inserted', function() {
    let env = 'https://api-fxpractice.oanda.com/v3/'
    let auth = 'Bearer e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    let accountID = '101-002-7777777-001'
    env.should.eql(api.baseURL)
    auth.should.eql(api.header.headers.Authorization)
    accountID.should.eql(api.accountID)
  })
})

describe('api.formatQuery(query)', function() {
  it('should stringify an object to be suitable for API url query in RFC3339 dateTime format', function() {
    let queryUrl = api.formatQuery({
      instrument: 'USD_CAD',
      count: 100,
      time: new Date(2017, 10, 14)
    })
    queryUrl.should.eql('?instrument=USD_CAD&count=100&time=2017-11-14T04%3A00%3A00.000Z')
  })
})

describe('api.formatQuery(query)', function() {
  it('should stringify options for candle data suitable for API call', function() {
    let queryUrl = api.formatQuery({
      granularity: 'M5',
      smooth: true,
      from: new Date(2017, 10, 11, 0),
      to: new Date(2017, 10, 12, 0)
    })
    let testUrl = 'https://api-fxpractice.oanda.com/v3/instruments/USD_CAD/candles' + queryUrl
    let url = 'https://api-fxpractice.oanda.com/v3/instruments/USD_CAD/candles?granularity=M5&smooth=true&from=2017-11-11T04%3A00%3A00.000Z&to=2017-11-12T04%3A00%3A00.000Z'
    testUrl.should.eql(url)
  })
})

describe('api.formatTime(time)', function() {
  it('should stringify time to be suitable to API call', function() {
    let time = api.formatTime(new Date(2017, 10, 11, 0))
    time.should.eql('?time=2017-11-11T04%3A00%3A00.000Z')
  })
})

apiUnix = Object.create(Oanda)
apiUnix.init(configUnix)

describe('apiUnix.formatQuery(query)', function() {
  it('should stringify an object to be suitable for API url query in UNIX dateTime format', function() {
    let queryUrl = apiUnix.formatQuery({
      instrument: 'USD_CAD',
      count: 100,
      time: 1508174396789      
    })
    queryUrl.should.eql('?instrument=USD_CAD&count=100&time=1508174396789')
  })
})

