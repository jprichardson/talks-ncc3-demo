var assert = require('assert')

global.T = function(v) {
  assert(v);
}

global.F = function(v) {
  assert(!v);
}

global.EQ = function(expr1, expr2, msg) {
  assert.equal(expr1, expr2, msg)
}

global.NEQ = function(expr1, expr2, msg) {
  assert.notEqual(expr1, expr2, msg)
}

global.exit = function() {
  process.exit(arguments);
}

