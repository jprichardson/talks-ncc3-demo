if (!process.env.NODE_ENV) process.env.NODE_ENV='development'

var express = require('express')
  , http = require('http')
  , path = require('path')
  , reload = require('reload')
  , cars = require('./server/api/cars')
  , colors = require('colors')

var app = express()

var clientDir = path.join(__dirname, 'client')

app.configure(function() {
  app.set('port', process.env.PORT || 3000)
  app.use(express.favicon())
  app.use(express.logger('dev'))
  app.use(express.bodyParser()) 
  app.use(app.router) 
  app.use(express.static(clientDir)) 
})

app.configure('development', function(){
  app.use(express.errorHandler());
})

app.get('/', function(req, res) {
  res.sendfile(path.join(clientDir, 'index.html'))
})

app.get('/api/cars', cars.list) 

app.get('/api/cars/total', cars.total) //placement matters

app.get('/api/cars/:id', cars.read) //sometimes called 'show'
app.post('/api/cars', cars.create)
app.put('/api/cars/:id', cars.update)
app.del('/api/cars/:id', cars.del)



var server = http.createServer(app)

reload(server, app)

server.listen(app.get('port'), function(){
  console.log("Web server listening in %s on port %d", colors.red(process.env.NODE_ENV), app.get('port'));
});


