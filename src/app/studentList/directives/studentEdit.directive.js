(function() {
  'use strict';

  angular
    .module('app.studentList')
    .directive('gzStudentEdit', gzStudentEdit);

  function gzStudentEdit() {
    return {
      templateUrl: 'app/studentList/directives/studentEdit.html',
      restrict: 'E',
      controller: StudentEditController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        // student: '=?bind'


      }
    };
  }


      

  StudentEditController.$inject = ['studentListService','$location','$rootScope','classRoomService'];

  function StudentEditController(studentListService, $location,$rootScope,classRoomService) {
    var vm = this;
    var studs = $rootScope.studs;
    vm.student = studentListService.getCurrentStudent();
    vm.updateStudent= updateStudent;
   
    function updateStudent() {
      classRoomService.showSimpleToast("Student Info Updated Successfully!");
      
      if(vm.student){
      studs.$save(vm.student);
    }

       $location.path('/studentlist'); 
 
    }
  }

})();