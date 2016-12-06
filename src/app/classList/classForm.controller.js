(function() {
  'use strict';

  angular
    .module('app.classList')
    .controller('ClassFormController', ClassFormController);

  ClassFormController.$inject = ['classRoomService', 'user'];

  function ClassFormController(classRoomService, user) {
    var vm = this;
    vm.rooms  = classRoomService.getClassRoomsByUser(user.uid);
  }

})();