(function() {
  'use strict';

  angular
    .module('app.classList')
    .controller('ClassEditController', ClassEditController);

  ClassEditController.$inject = ['classRoomService', 'user'];
  function ClassEditController(classRoomService, user) {
    var vm = this;
  }

})();