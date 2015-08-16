(function(){
  var gamesFactory = ($rootScope) => {

    let games = {};
    let gameSocket;

    games.createSocket = () => {
      const url = 'ws://127.0.0.1:8080/games';
      gameSocket = new WebSocket(url);
      games.collection = [];

      gameSocket.onmessage = function(message) {
        games.collection.push(JSON.parse(message.data));
        $rootScope.$apply();
      };
    }

    games.closeSocket = () => {
      if(gameSocket.readyState === 1){
          gameSocket.close();
      }
    }

    return games;
  }

  angular.module('premier').factory('games', ["$rootScope", gamesFactory]);

})();
