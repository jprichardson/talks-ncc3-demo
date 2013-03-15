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


function CreateCtrl ($scope, $location, CarsService) {
  $scope.action = 'Add'
  $scope.save = function() {
    CarsService.save($scope.car, function() {
      $location.path('/')
    })
  }  
}

function ListCtrl ($scope, $http, CarsService) {
  var index = -1;

  //for pagination and searching
  $scope.limit = 25
  $scope.offset = 0 //this is the same as: (current page - 1)
  $scope.total = 0
  $scope.pageCount = 0

  $scope.cars = CarsService.query()

  $scope.index = index; //currently selected element
  $scope.selectedId = -1; //actual id of selected car

  $http.get('/api/cars/total').success(function(body) {
    $scope.total = body.total
    $scope.pageCount = Math.floor($scope.total / $scope.limit) 
    if ($scope.total % $scope.limit !== 0)
      $scope.pageCount += 1
  })


  $scope.select = function(i) {
    $scope.index = index
    index = i
    $scope.selectedId = $scope.cars[index].id
  }

  $scope.delete = function() {
    if (index >= 0) {
      CarsService.delete({id: $scope.cars[index].id})
      $scope.cars.splice(index, 1)
    }
  }

  $scope.loadPage = function (pg) {
    
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