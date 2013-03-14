var CarApp = angular.module('CarApp', ['ngResource'])

CarApp.config(function($routeProvider) {
  $routeProvider
    .when('/', {controller: ListCtrl, templateUrl: 'partials/list.html'})
    .otherwise({redirectTo: '/'})
})

CarApp.factory('Cars', function($resource) {
  return $resource('/api/cars/:id', {id: '@id'}, {update: {method: 'PUT'}})
})

function ListCtrl ($scope, Cars) {
  $scope.cars = Cars.query()
}