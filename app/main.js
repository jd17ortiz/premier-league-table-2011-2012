'use strict';
/*jshint esnext: true */

(function(){

  let premierLeagueModule = ($stateProvider, $urlRouterProvider) => {

    $urlRouterProvider.otherwise('/');
    $stateProvider.state('home', {
      url : '/',
      views : {
        'header' : {
          templateUrl : '../views/header.html'
        },
        'content' : {
          templateUrl : '../views/home.html',
          controller  : 'tableGamesController as tableGamesCtrl'
        },
        'footer' : {
          templateUrl : '../views/footer.html'
        }
      }
    });
  }


  angular.module('premier', ['ui.router', 'ngWebSocket']).config(['$stateProvider', '$urlRouterProvider', premierLeagueModule]);

})();
