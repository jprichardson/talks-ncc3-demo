basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'client/vendor/angularjs-1.0.5/angular.js',
  'client/vendor/angularjs-1.0.5/angular-*.js',
  'test/vendor/angular-test-1.0.5/angular-mocks.js',
  'client/js/**/*.js',
  'test/client/unit/**/*.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
