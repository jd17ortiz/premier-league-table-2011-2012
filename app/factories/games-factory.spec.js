'use strict';

/**
 * Karma unit tests.
 */
describe('GamesFactory', function() {
  var factory, socketMock, windowMock;
  var data = readJSON('mockup/mockup.json');

  beforeEach(module('premier'));
  beforeEach(inject(function($injector) {

      factory = $injector.get('games');
      var WebSocket = spyOn(window, 'WebSocket');
      WebSocket.and.callFake(function (url) {
       socketMock = {
         url: url,
         readyState: WebSocket.CONNECTING,
         send: jasmine.createSpy(),
         close: jasmine.createSpy().and.callFake(function () {
           socketMock.readyState = WebSocket.CLOSING;
         }),

         // methods to mock the internal behaviour of the real WebSocket
         _open: function () {
           socketMock.readyState = WebSocket.OPEN;
           socketMock.onopen && socketMock.onopen();
         },
         _message: function (msg) {
           socketMock.onmessage && socketMock.onmessage({data: msg});
         },
         _error: function () {
           socketMock.readyState = WebSocket.CLOSED;
           socketMock.onerror && socketMock.onerror();
         },
         _close: function () {
           socketMock.readyState = WebSocket.CLOSED;
           socketMock.onclose && socketMock.onclose();
         }
       };
       return socketMock;
     });

     WebSocket.CONNECTING = 0;
     WebSocket.OPEN = 1;
     WebSocket.CLOSING = 2;
     WebSocket.CLOSED = 3;

     windowMock = {
       WebSocket: WebSocket
     };
  }));

  it('should initialize games with no games in collection', function() {
    factory.createSocket();
    expect(windowMock.WebSocket).toHaveBeenCalledWith('ws://127.0.0.1:8080/games');
    expect(factory.collection.length).toBe(0);
  });

  it('should initialize games and add new feed', function() {
    factory.createSocket();
    socketMock._message(JSON.stringify(data.games[0]));
    expect(factory.collection.length).toBe(1);
  });

  it('should initialize games and after adding a second feed keep the first one', function() {
    factory.createSocket();
    socketMock._message(JSON.stringify(data.games[0]));
    socketMock._message(JSON.stringify(data.games[1]));
    expect(factory.collection.length).toBe(2);
  });

});
