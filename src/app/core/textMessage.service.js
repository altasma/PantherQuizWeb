(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('textMessageService', textMessageService);

  textMessageService.$inject = ['firebaseDataService'];

  function textMessageService(firebaseDataService) {
    var service = {
      sendTextMessage: sendTextMessage
    };

    return service;


    function sendTextMessage(classRoom, classRooms) {
      var newTextMessage = {
        phoneNumber: classRoom.phone,
        size: classRoom.size,
        name: classRoom.name
      };
      firebaseDataService.textMessages.push(newTextMessage);
      classRoom.notified = true;
      classRooms.$save(classRoom);
    }
  }

})();