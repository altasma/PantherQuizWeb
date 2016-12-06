(function() {
  'use strict';

  angular
    .module('app.classList')
    .directive('gzClassEdit', gzClassEdit);

  function gzClassEdit() {
    return {
      templateUrl: 'app/classList/directives/classEdit.html',
      restrict: 'E',
      controller: ClassEditController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        rooms: '='
      }
    };
  }   

  ClassEditController.$inject = ['classRoomService','$location'];

  function ClassEditController(classRoomService, $location) {
    var vm = this;
    vm.classRoom = classRoomService.getCurrentClass();
    vm.updateClassRoom = updateClassRoom;
        
    function updateClassRoom(classRoom) {
      classRoomService.showSimpleToast( classRoom.name + " info updated successfully!");

       $location.path('/classlist');
    
    }
  }

})();