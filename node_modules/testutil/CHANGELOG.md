0.4.0 / 2013-01-17
------------------
* Removed `TTrue`, `TFalse`, `TTRUE`, `TFALSE`.
* Added `md5(data)` method.
* Added `EQ` and `NEQ` global methods.

0.3.0 / 2012-12-11
------------------
* Removed CoffeeScript.
* Upgraded `fs-extra` dep.

0.2.4 / 2012-09-18
------------------
* Don't actually delete dir in `createTestDir()`, but delete the files.

0.2.3 / 2012-08-18
------------------
* Added `createTestDir` method.

0.2.2 / 2012-08-11
------------------
* Added `generateTestPath` method.

0.2.1 / 2012-08-03
------------------
* Added global methods TTRUE, TTrue, TFALSE, TFalse as aliases for T/F.

0.2.0 / 2012-07-10
------------------
* Removed `fs-extra` dependency. Removed `TODO()` global method.

0.1.1 / 2012-05-11
------------------
* Added `exit()` method. (Just an alias for `process.exit()`)

0.1.0 / 2012-02-26
------------------
* Removed `string` dependency.
* Added `growl` depenedency.

0.0.3 / 2012-02-03
------------------
* Updated README
* Added module method `fetchTestFiles()`
* Added global methods: `T()`, `F()`, and `TODO()`
* Switched from Make to Cake
* Provide pure JS version now instead of requiring CoffeeScript
* Moved *.coffee files from `lib/` to `src/`.
* Deleted index.coffee

0.0.2 / 2012-01-12
------------------
* createFileWithData now returns the input filePath

0.0.1 / 2012-01-12
------------------
* Initial release.
