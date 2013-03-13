Node.js - testutil
=================

This module provides methods to aid in testing your Node.js apps. You probably wouldn't run this in production.



Installation
------------

    npm install testutil

Make sure that you run the test script to verify that it works on your system.




### Test Installation

Navigate to the directory for the module and run: `npm test`



Usage
-----

```javascript
testutil = require('testutil')
```


### Module Methods

##### createTempDir()

Synchronously creates a temporary directory and returns the path.

```javascript
var dirPath = testutil.createTempDir();
```

e.g. `/tmp/tmpdir-359353928528529/`


##### createTestDir(app)

Synchronously creates a test directory and returns the path. Deletes the directory if it exsists and recreates it.

```javascript
var dirPath = testutil.createTestDir('myapp');
```

e.g. `/tmp/test-myapp`


##### createBuffer(size)

Synchronously creates and returns a buffer of size N filled with random data.

```javascript
var buffer = testutil.createBuffer(1024); //buffer of 1024 bytes
```


##### createFileWithData(size)

Synchronously creates a file of size N filled with random data. The file path is returned.

```javascript
var filepath = testutil.createFileWithData(filepath, 1024); 
```


##### fetchTestFiles(dirPath, callback)

Asynchronously fetches all of the files in a specified directory that end in `.test.coffee` or `.test.js`.

```javscript
testutil.fetchTestFiles('test/', function(files) {
// do something with test files
});
```

You might use this in conjunction with [Mocha](mocha).

#### generateTestPath(name) 

Generates a string that you can use for a test path.

```javascript
var testPath = testutil.generateTestPath('test-mypackage');
console.log(testPath); // /tmp/test-mypackage/2012-08-04_13-05-11
```


### Global Methods

This modules also creates three global methods that I use in my tests. Again, as stated up top, you shouldn't use this in production code.

##### T() / F() / TTRUE() / TFALSE() / TTrue() / TFalse()

I like short and concise tests. I also write everything CoffeeScript. Here are the function definitions:

```coffeescript
T = (v) -> assert(v)
F = (v) -> assert(!v)
```

for you JavaScript folks:

```javascript
T = function(v) { return assert(v); };
F = function(v) { return assert(!v); };
```

My CoffeeScript tests might look like this:

```coffeescript
describe 'SomeClass', ->
  describe '- ssaySomethingNice()', ->
    it 'should say something nice', ->
      T saySomethingNice() == 'hello'
      F saySomethingNice() == 'i hate you'
```

easier to visually parse than what a lot of other tests look like:

```coffeescript
describe 'SomeClass', ->
  describe '- saySomethingNice()', ->
    it 'should say something nice', ->
      saySomethingNice().should.equal('hello')
      assert.false(saySomethingNice(), 'i hate you')
```





License
-------

(The MIT License) See [LICENSE](https://github.com/jprichardson/node-testutil/blob/master/LICENSE) for details.

Copyright (c) 2011-2012 JP Richardson

[mocha]: http://visionmedia.github.com/mocha/


