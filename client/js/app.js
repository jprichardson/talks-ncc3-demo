var CarApp = angular.module('CarApp', ['ngResource'])

CarApp.config(function($routeProvider) {
  $routeProvider
    .when('/', {controller: ListCtrl, templateUrl: 'partials/list.html'})
    .otherwise({redirectTo: '/'})
})

CarApp.factory('CarsService', function($resource) {
  return $resource('/api/cars/:id', {id: '@id'}, {update: {method: 'PUT'}})
})

function ListCtrl ($scope, CarsService) {
  $scope.cars = CarsService.query()
}