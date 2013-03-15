var CarApp = angular.module('CarApp', ['ngResource'])

CarApp.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {controller: ListCtrl, templateUrl: '/partials/list.html'}) //<-- change to absolute
    .when('/edit/:id', {controller: EditCtrl, templateUrl: '/partials/details.html'})
    .otherwise({redirectTo: '/'})
    $locationProvider.html5Mode(true) //<--- see!
})

CarApp.factory('CarsService', function($resource) {
  return $resource('/api/cars/:id', {id: '@id'}, {update: {method: 'PUT'}})
})

function ListCtrl ($scope, CarsService) {
  $scope.cars = CarsService.query()

  $scope.index = -1; //currently selected element

  $scope.select = function(index) {
    $scope.index = index
  }
}

function EditCtrl ($scope, $location, $routeParams, CarsService) {
  var id = $routeParams.id
  CarsService.get({id: id}, function(resp) {
    $scope.car = resp.content  
  })
  //$scope.car = CarsService.get({id: id})
  $scope.action = "Update"


  $scope.save = function() {
    CarsService.update({id: id}, $scope.car, function() {
      $location.path('/')
    })
  }
}