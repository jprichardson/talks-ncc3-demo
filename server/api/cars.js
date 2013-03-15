var fs = require('fs-extra')
  , path = require('path')
  , _ = require('underscore')

module.exports.list = list
module.exports.create = create
module.exports.read = read
module.exports.update = update
module.exports.del = del
module.exports.total = total

var DATA_FILE = './resources/data.json'
if (process.env.NODE_ENV === 'test') 
  DATA_FILE = './test/resources/data.json'

var DATA = fs.readJsonSync(DATA_FILE) //happens at server startup

/**********************
 * Public Interface
 **********************/

function list (req, res) {
  var offset = ~~req.query.offset || 0
    , limit = ~~req.query.limit || 25

  res.json(DATA.slice(offset*limit, offset*limit + limit))
}

function create (req, res) {
  var newCar = req.body
  newCar.id = getLastId() + 1
  DATA.push(newCar)
  saveDB(function(err) {
    if (err) 
      res.json(formatRespData(0, err))
    else
      res.json(formatRespData({id: newCar.id}))
  })
}

function read (req, res) {
  var id = ~~req.params.id
  var car = _(DATA).find(function(car) { return car.id === id })

  if (!car)
    res.json(formatRespData(0, "Can't find car with id: " + id))
  else
    res.json(formatRespData(car))
}

function update (req, res) {
  var id = ~~req.params.id
  var car = _(DATA).find(function(car) { return car.id === id })

  var newCarData = req.body
  car = _(car).extend(newCarData)

  saveDB(function(err) {
    if (err) 
      res.json(formatRespData(0, err))
    else
      res.json(formatRespData({}))
  })
}

function del (req, res) {
  var id = ~~req.params.id
  var car = _(DATA).find(function(car) { return car.id === id })

  var idx = DATA.indexOf(car)
  if (idx < 0) return res.json(formatRespData(0, "Could not find car with id: " + id))

  DATA.splice(idx, 1)

  saveDB(function(err) {
    if (err) 
      res.json(formatRespData(0, err))
    else
      res.json(formatRespData({}))
  })
}

function total (req, res) {
  total = DATA.length ? DATA.length : 0
  res.json({total: total})
}



/*******************
 * Private Methods
 *******************/

function getLastId () {
  return DATA.length;
}

function formatRespData (code, content) {
  if (typeof code === 'object') {
    content = code,
    code = 1 //0 failure, 1 = success
  }

  return {
    code: code,
    content: content
  }
}

function saveDB (callback) {
  fs.writeJson(DATA_FILE, DATA, callback)
}

