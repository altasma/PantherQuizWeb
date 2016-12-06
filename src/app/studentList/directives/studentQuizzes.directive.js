(function() {
  'use strict';

  angular
    .module('app.studentList')
    .directive('gzStudentQuizzes', gzStudentQuizzes);

  function gzStudentQuizzes() {
    return {
      templateUrl: 'app/studentList/directives/studentQuizzes.html',
      restrict: 'E',
      controller: StudentQuizzesController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        // student: '=?bind'


      }
    };
  }


      

  StudentQuizzesController.$inject = ['studentListService','$location','$rootScope','classRoomService'];

  function StudentQuizzesController(studentListService, $location,$rootScope,classRoomService) {
    var vm = this;
    var studs = $rootScope.studs;
    vm.student = studentListService.getCurrentStudent();
    vm.updateStudent= updateStudent;

    vm.eEditable= -1; //-1 by default. It doesn't match any $index from ng-repeat(non editable)


    //Formatting an email replace @ with - and . with dot
    var studEmail = vm.student.email;
    var splitedEmailAt = studEmail.split("@");
    var split2AtDot = splitedEmailAt[1].split(".");
    var formattedEmail = splitedEmailAt[0]+ "-"+ split2AtDot[0]+ "dot"+ split2AtDot[1];
    
    vm.classRoom = classRoomService.getCurrentClass();
    vm.studQuizzes = studentListService.getStudQuizzesByClass(formattedEmail,vm.classRoom.$id);



    function updateStudent() {
      classRoomService.showSimpleToast("Student Info Updated Successfully!");
    
      if(vm.student){
      studs.$save(vm.student);
    }

       $location.path('/studentlist');  // 
 
    }
  }

})();