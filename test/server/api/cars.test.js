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

  describe('POST /api/cars', function() {
    it('should create a new car', function(done) {
      var car = {
        date: "2013-01-14T23:54:27.044Z",
        desc: "JP's Awesome Red Ferrari",
        mileage: 3000,
        price: 100000,
        title: "Ferrari 458",
        year: 2011
      }

      sa.post(URL + '/api/cars').send(car).end(function(req) {
        T (req.body)
        T (req.body.code)
        T (req.body.content.id > 0)
        done()
      })
    })
  })

  describe('GET /api/cars/:id', function() {
    it('should GET a car by id', function(done) {
      var id = 5

      sa.get(URL + '/api/cars/' + id).end(function(req) {
        T (req.body)
        T (req.body.code)
        T (req.body.content.id === 5)
        T (req.body.content.title.length > 0)
        done()
      })
    })
  })
})