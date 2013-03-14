describe('ListCtrl', function(){
  var listCtrl = null
    , scope = null
    , httpBackend = null

  beforeEach(module('CarApp'))

  beforeEach(inject(function ($httpBackend) {
    $httpBackend.when('GET', '/api/cars').respond([{title: 'Cool car'}])
    httpBackend = $httpBackend
  }))

  beforeEach(inject(function($controller, $rootScope, $http, CarsService, $resource) {
    scope = $rootScope.$new();
    listCtrl = $controller(ListCtrl, {$scope: scope, CarsService: CarsService})
    httpBackend.flush()
  }))


  it('scope.cars should have a cool car', function() {
    //dump(scope)
    expect(scope.cars.length).toBe(1)
    expect(scope.cars[0].title).toBe('Cool car')
  });
});