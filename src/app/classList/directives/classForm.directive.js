(function() {
  'use strict';

  angular
    .module('app.classList')
    .directive('gzClassForm', gzClassForm);

  function gzClassForm() {
    return {
      templateUrl: 'app/classList/directives/classForm.html',
      restrict: 'E',
      controller: ClassFormController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        rooms: '='

      }
    };
  }
     

  ClassFormController.$inject = ['classRoomService','$firebaseArray','$firebaseObject'];

  function ClassFormController(classRoomService, $firebaseArray,$firebaseObject) {
    var vm = this;

    vm.newClassRoom= new classRoomService.ClassRoom();
    vm.addClassRoom = addClassRoom;

    function addClassRoom() {
  
      var newClassName = vm.newClassRoom.name;
      
      vm.rooms.$add(vm.newClassRoom).then(
      function(response){
         var sucessMessage = "New class- " + newClassName + " created sucessfully.";
         classRoomService.showSimpleToast(sucessMessage);
         vm.newClassRoom = new classRoomService.ClassRoom();

       }, function(error){
         var errorMessage = error.message.indexOf("year"); //check if year is not properly defined
         if(errorMessage != -1){
          classRoomService.showSimpleToast("Year has to be in YYYY format, please try again.");
        }
        else{
        classRoomService.showSimpleToast("Error!, Please try again.");

        }

       });

    }
  }

})();