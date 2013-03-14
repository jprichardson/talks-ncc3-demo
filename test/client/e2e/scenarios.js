describe('my app', function() {
  beforeEach(function() {
    browser().navigateTo('/index.html');
  })

  it('should automatically load up index.html', function() {
    //pause()
    expect(browser().location().url()).toBe("/");
    expect(element('[ng-view] table:first').text()).toMatch(/Ferrari/);
  })
})