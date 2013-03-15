describe('filter', function(){
  var mileageFilter;

  beforeEach(module('CarApp'))

  beforeEach(inject(function (_mileageFilter_) {
    mileageFilter = _mileageFilter_
  }))


  it('should add commas if the length is greater than 3', function() {
    expect(mileageFilter('345')).toBe('345')
    expect(mileageFilter('1000')).toBe('1,000')
  });
});