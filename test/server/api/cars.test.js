var testutil = require('testutil')
  , sa = require('superagent')
  , expect = require('chai').expect

var PORT = 3000
  , URL = 'http://localhost:' + PORT

describe('cars api', function() {
  describe('GET /api/cars', function() {
    it('should return an array of cars', function(done) {
      sa.get(URL + '/api/cars').
      end(function(resp) {
        //testutil
        EQ (resp.body.length, 25)
        T (resp.body.length === 25)
        
        //chai.js
        expect(resp.body).to.have.length(25)
        
        done()
      })
    })
  })
})