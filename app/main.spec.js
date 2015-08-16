'use strict';

/**
 * Karma unit tests.
 */
describe('PremierModule', function() {
  var $state,
      view;

  beforeEach(module('premier'));
  beforeEach(inject(function($injector) {
    $state = $injector.get('$state');
    view = $state.get('home');
  }));

  it('should initialize premier module', function() {
    expect(view).not.toBe(null);
  });
});
