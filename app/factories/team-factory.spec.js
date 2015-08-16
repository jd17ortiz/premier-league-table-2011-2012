'use strict';

/**
 * Karma unit tests.
 */
describe('TeamFactory', function() {
  var factory,
      $httpBackend, allTeams;

  var data = readJSON('mockup/mockup.json');

  beforeEach(module('premier'));
  beforeEach(inject(function($injector) {
    factory = $injector.get('teams');
    $httpBackend = $injector.get('$httpBackend');
    factory.getTeams().then( function(teams)  {
      allTeams = teams.data;
    }).catch( function() {console.log('error message')} );
    $httpBackend.whenGET(/teams/).respond(200, data.teams);
    $httpBackend.expectGET(/teams/);
    $httpBackend.flush();
  }));

  it('should initialize premier module as mocks', function() {
    expect(allTeams.length).toBe(data.teams.length);
  });

  it('should initialize premier module with 20 teams', function() {
    expect(allTeams.length).toBe(20);
  });


});
