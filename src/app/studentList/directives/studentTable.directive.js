(function() {
  'use strict';

  angular
    .module('app.studentList')
    .directive('gzStudentTable', gzStudentTable);

  function gzStudentTable() {
    return {
      templateUrl: 'app/studentList/directives/studentTable.html',
      restrict: 'E',
      controller: StudentTableController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        students: '='
      }
    };
  }

  StudentTableController.$inject = ['$location', 'studentListService','classRoomService','$rootScope','firebaseDataService'];

  function StudentTableController($location, studentListService, classRoomService,$rootScope,firebaseDataService) {
    var vm = this;
    $rootScope.studs = vm.students;
       vm.classRoom = classRoomService.getCurrentClass();
       vm.student = studentListService.getCurrentStudent();
       vm.classId = vm.classRoom.$id;

        vm.removeStudent = removeStudent;   // removes from this class only
        vm.save = save;
        vm.quizList = quizList;  // may show the list of quizzes taken?
        vm.editStudent = editStudent;
        vm.currentStudentId = "";


    function removeStudent(student) {
      if(confirm("Are you sure you want to delete this student from this class?")){
         
         var emailInputSplit = student.email.split("@");
         emailInputSplit[1] =    emailInputSplit[1].replace(".","dot");
         var emailAfterSplit = emailInputSplit[0]+ "-"+emailInputSplit[1];
         var studsRef = firebaseDataService.root.child('studentsList').child(emailAfterSplit).child('classes');

         studsRef.once('value', function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
          var classIdSnapshot = childSnapshot.child('classId').val();
         
          if(vm.classId == classIdSnapshot){
           studsRef.child(childSnapshot.getKey()).set(null);
           // exists = true;
            return ;
          }

      });
     });

         vm.students.$remove(student);
         classRoomService.showSimpleToast("Deleted permanently.")      
      }
    }

 
 function save(student){  //to be modified with ..
  vm.favorite ='true';   //to be removed
  }
  

    function editStudent(student){
      studentListService.setCurrentStudent(student);

      $location.path('/studentedit');

     }


  function quizList(student) {
      //set the shared studentId/key variable before routing
      
       studentListService.setCurrentStudent(student);

       $location.path('/studentquizzes');    //to be changed to /studentQuizList
     }
   }

})();