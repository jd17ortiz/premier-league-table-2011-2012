(function(){
  let tableGamesController = function ($scope, games, teams, $timeout) {
    let self = this;
    this.dataCompleted = false;
    this.games = games;

    teams.getTeams().then( (teams) => {
      self.teams = teams.data;
      self.teams.forEach( (team) => {
          team.won = 0;
          team.lost = 0;
          team.drawn = 0;
          team.gamesPlayed = 0;
          team.goalsFor = 0;
          team.goalsAgainst = 0;
          team.goalsDifference = 0;
          team.points = 0;
      });
      // Create socket connection
      self.games.createSocket();
    }).catch( () => console.log('error message') );

    // Calculate table positions
      this.calculateTableInformation = (socketInfo) => {
        let homeGoals = parseInt(socketInfo[socketInfo.length - 1].homeGoals);
        let awayGoals = parseInt(socketInfo[socketInfo.length - 1].awayGoals);
        let homeTeam = _.find(this.teams, (n) => n.id === socketInfo[socketInfo.length - 1].homeTeamId );
        let awayTeam = _.find(this.teams, (n) => n.id === socketInfo[socketInfo.length - 1].awayTeamId );

        // Call update function
        this.updateInfo(homeTeam, homeGoals, awayGoals);
        this.updateInfo(awayTeam, awayGoals, homeGoals);
    }

    this.updateInfo = (team, goalsFor, goalsAgainst) => {
        if(goalsFor > goalsAgainst){
          team.won++;
        } else if(goalsFor < goalsAgainst){
          team.lost++;
        } else if (goalsFor === goalsAgainst){
          team.drawn++
        }
        team.gamesPlayed++;
        team.goalsFor += goalsFor;
        team.goalsAgainst += goalsAgainst;
        team.goalsDifference = team.goalsFor - team.goalsAgainst;
        team.points = (team.won * 3) + team.drawn;
    }

    $scope.$watchCollection( () => self.games.collection, ( newValue, oldValue ) => {
      if(typeof newValue !== 'undefined' && newValue.length > 0){
        self.calculateTableInformation(newValue);
        $timeout.cancel($scope.timerDataCompleted);

        $scope.timerDataCompleted = $timeout(() => {
          self.dataCompleted = true;
          console.log('close socket')
          self.games.closeSocket()
        }, 2000);
      }
    });

  }
  angular.module('premier').controller('tableGamesController', ["$scope", "games", "teams", "$timeout", tableGamesController]);
})();
