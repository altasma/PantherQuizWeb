(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('firebaseDataService', firebaseDataService);

  function firebaseDataService() {
    var root = firebase.database().ref();

    var service = {
      root: root,
      users: root.child('users'),
      teachers: root.child('teachers'),
      emails: root.child('emails'),
      textMessages: root.child('textMessages'),
    };
    return service;
  }

})();
