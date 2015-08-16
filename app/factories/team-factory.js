(function(){
  var teamsFactory = ($http, $q) => {
    const urlBase = 'http://127.0.0.1:8080/';

    let teams = {};

    teams.getTeams = () => $http.get(urlBase+'teams');

    return teams;

  }
  angular.module('premier').factory('teams', ["$http", "$q", teamsFactory]);
})();
