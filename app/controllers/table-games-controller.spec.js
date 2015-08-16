'use strict';

/**
 * Karma unit tests.
 */
describe('TableGamesCtrl', function() {
  var $httpBackend, teams, games, ctrl, $scope;
  var data = readJSON('mockup/mockup.json');

  beforeEach(module('premier'));

  beforeEach(inject(function($injector) {
    var $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');
    $httpBackend = $injector.get('$httpBackend');
    $scope = $rootScope.$new();
    teams = $injector.get('teams');
    games = $injector.get('games');

    ctrl = $controller('tableGamesController', {
        $scope: $scope,
        teams : teams,
        games : games

    });
    $httpBackend.whenGET(/teams/).respond(200, data.teams);
    $httpBackend.expectGET(/teams/);
    $httpBackend.flush();
  }));

  it('should initialize controller with teams information', function() {
    expect(ctrl.teams.length).toBe(data.teams.length);
    expect(ctrl.teams.length).toBe(20);
  });

  it('should call calculateTableInformation when games are updated', function() {
    spyOn(ctrl, 'calculateTableInformation');
    ctrl.games.collection.push(data.games[0]);
    $scope.$apply();
    expect(ctrl.calculateTableInformation).toHaveBeenCalled();
  });

  it('should update info when home team wins for winner and loser teams', function() {
    ctrl.games.collection.push(data.games[8]);
    $scope.$apply();
    var homeTeam = _.find(ctrl.teams, function(n) { return n.id === data.games[8].homeTeamId });
    var awayTeam = _.find(ctrl.teams, function(n) { return n.id === data.games[8].awayTeamId });
    //Home team calculations
    expect(homeTeam.won).toBe(1);
    expect(homeTeam.lost).toBe(0);
    expect(homeTeam.drawn).toBe(0);
    expect(homeTeam.gamesPlayed).toBe(1);
    expect(homeTeam.goalsFor).toBe(parseInt(data.games[8].homeGoals));
    expect(homeTeam.goalsAgainst).toBe(parseInt(data.games[8].awayGoals));
    expect(homeTeam.goalsDifference).toBe(homeTeam.goalsFor - homeTeam.goalsAgainst);
    expect(homeTeam.points).toBe(3);
    //Away team calculations
    expect(awayTeam.won).toBe(0);
    expect(awayTeam.lost).toBe(1);
    expect(awayTeam.drawn).toBe(0);
    expect(awayTeam.gamesPlayed).toBe(1);
    expect(awayTeam.goalsFor).toBe(parseInt(data.games[8].awayGoals));
    expect(awayTeam.goalsAgainst).toBe(parseInt(data.games[8].homeGoals));
    expect(awayTeam.goalsDifference).toBe(awayTeam.goalsFor - awayTeam.goalsAgainst);
    expect(awayTeam.points).toBe(0);
  });

  it('should update info when away team wins for winner and loser teams', function() {
    ctrl.games.collection.push(data.games[0]);
    $scope.$apply();
    var homeTeam = _.find(ctrl.teams, function(n) { return n.id === data.games[0].homeTeamId });
    var awayTeam = _.find(ctrl.teams, function(n) { return n.id === data.games[0].awayTeamId });
    //Home team calculations
    expect(homeTeam.won).toBe(0);
    expect(homeTeam.lost).toBe(1);
    expect(homeTeam.drawn).toBe(0);
    expect(homeTeam.gamesPlayed).toBe(1);
    expect(homeTeam.goalsFor).toBe(parseInt(data.games[0].homeGoals));
    expect(homeTeam.goalsAgainst).toBe(parseInt(data.games[0].awayGoals));
    expect(homeTeam.goalsDifference).toBe(homeTeam.goalsFor - homeTeam.goalsAgainst);
    expect(homeTeam.points).toBe(0);
    //Away team calculations
    expect(awayTeam.won).toBe(1);
    expect(awayTeam.lost).toBe(0);
    expect(awayTeam.drawn).toBe(0);
    expect(awayTeam.gamesPlayed).toBe(1);
    expect(awayTeam.goalsFor).toBe(parseInt(data.games[0].awayGoals));
    expect(awayTeam.goalsAgainst).toBe(parseInt(data.games[0].homeGoals));
    expect(awayTeam.goalsDifference).toBe(awayTeam.goalsFor - awayTeam.goalsAgainst);
    expect(awayTeam.points).toBe(3);
  });


  it('should update info when the game is tie for both teams', function() {
    ctrl.games.collection.push(data.games[1]);
    $scope.$apply();
    var homeTeam = _.find(ctrl.teams, function(n) { return n.id === data.games[1].homeTeamId });
    var awayTeam = _.find(ctrl.teams, function(n) { return n.id === data.games[1].awayTeamId });
    //Home team calculations
    expect(homeTeam.won).toBe(0);
    expect(homeTeam.lost).toBe(0);
    expect(homeTeam.drawn).toBe(1);
    expect(homeTeam.gamesPlayed).toBe(1);
    expect(homeTeam.goalsFor).toBe(parseInt(data.games[1].homeGoals));
    expect(homeTeam.goalsAgainst).toBe(parseInt(data.games[1].awayGoals));
    expect(homeTeam.goalsDifference).toBe(homeTeam.goalsFor - homeTeam.goalsAgainst);
    expect(homeTeam.points).toBe(1);
    //Away team calculations
    expect(awayTeam.won).toBe(0);
    expect(awayTeam.lost).toBe(0);
    expect(awayTeam.drawn).toBe(1);
    expect(awayTeam.gamesPlayed).toBe(1);
    expect(awayTeam.goalsFor).toBe(parseInt(data.games[1].awayGoals));
    expect(awayTeam.goalsAgainst).toBe(parseInt(data.games[1].homeGoals));
    expect(awayTeam.goalsDifference).toBe(awayTeam.goalsFor - awayTeam.goalsAgainst);
    expect(awayTeam.points).toBe(1);
  });

});
