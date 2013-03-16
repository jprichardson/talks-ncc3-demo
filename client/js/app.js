var CarApp = angular.module('CarApp', ['ngResource'])

CarApp.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {controller: ListCtrl, templateUrl: '/partials/list.html'}) 
    .when('/edit/:id', {controller: EditCtrl, templateUrl: '/partials/details.html'})
    .when('/new', {controller: CreateCtrl, templateUrl: '/partials/details.html'})
    .otherwise({redirectTo: '/'})
    $locationProvider.html5Mode(true)
})

CarApp.factory('CarsService', function($resource) {
  return $resource('/api/cars/:id', {id: '@id'}, {update: {method: 'PUT'}})
})

CarApp.filter('mileage', function() {
  return function(input) {
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
})

//http://stackoverflow.com/questions/11873570/angularjs-for-loop-with-numbers-ranges
CarApp.filter('range', function() {
  return function(input) {
      var lowBound, highBound;
      switch (input.length) {
      case 1:
          lowBound = 0;
          highBound = parseInt(input[0]) - 1;
          break;
      case 2:
          lowBound = parseInt(input[0]);
          highBound = parseInt(input[1]);
          break;
      default:
          return input;
      }
      var result = [];
      for (var i = lowBound; i <= highBound; i++)
          result.push(i);
      return result;
  };
})

CarApp.directive('formfield', function() {
  return {
    restrict: 'E', //could be E, A, C (class), M (comment)
    scope: {
      prop: '@',
      data: '=ngModel'
    },
    templateUrl: '/partials/formfield.html'
  }
})

CarApp.directive('formfield2', function() {
  return {
    restrict: 'E', //could be E, A, C (class), M (comment)
    scope: {
      prop: '@'
    },
    transclude: true,
    templateUrl: 'formfield2.html',
    replace: true
  }
})


